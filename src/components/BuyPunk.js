import React from 'react'
import { Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useAuth } from '../contexts/AuthContext'
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import abi from "../abi/abi.json";

export default function BuyPunl(props) {

    const { imageNo, owner } = props;
    const { user, punkPrice } = useAuth()
    const contractAddr = "0xDb6B1feb735B832E85BdB4A8aa0C12Fc2B11F0DC";

    const handleSubmit = async () => {
        if(punkPrice[imageNo]===undefined) {
            return;
        }
        const { ethereum } = window; //injected by metamask
        //connect to an ethereum node
        const provider = new ethers.providers.Web3Provider(ethereum); 
        //gets the account
        const signer = provider.getSigner(); 

        try {
            const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)

            //connects with the contract
            const connectedContract = new ethers.Contract(contractAddr, abi.output.abi, wallet);

            const params = [{
                from: user.wallet_address,
                to: owner,
                value: ethers.utils.parseUnits(punkPrice[imageNo].toString(), 'ether').toHexString()
            }];
            await provider.send('eth_sendTransaction', params)

            provider.getGasPrice().then((currentPrice)=> {
                let gas_price = ethers.utils.hexlify(parseInt(currentPrice))

                const tx = {
                    gasPrice: gas_price,
                    gasLimit: ethers.utils.hexlify(1000000),
                }

                connectedContract.transferFrom(owner, user.wallet_address, imageNo, tx).then(()=>{
                    updateDoc(doc(db, "punks", "minted"), {
                        [imageNo] : {
                            owner: user.wallet_address
                        }
                    }).then(()=>{
                        window.location.reload()
                    })
                }).catch((e)=>console.log(e))
            })
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Button onClick={()=>handleSubmit()} type="submit">
            Buy
        </Button>
    )
}
