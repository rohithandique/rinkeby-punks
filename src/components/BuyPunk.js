import React from 'react'
import { Button } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useAuth } from '../contexts/AuthContext'
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import abi from "../abi/abi.json";

export default function BuyTiger(props) {

    const { imageNo } = props;
    const { currentAccount, tigerInfo } = useAuth()
    const contractAddr = "0xfb6B832Ff91664620E699B0dc615996A6E80Ec0C";

    const handleSubmit = async () => {
        const { ethereum } = window; //injected by metamask
        //connect to an ethereum node
        const provider = new ethers.providers.Web3Provider(ethereum); 
        //gets the account
        const signer = provider.getSigner(); 

        const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider)
        //const walletSigner = wallet.connect(provider);

        //connects with the contract
        const connectedContract = new ethers.Contract(contract_address, abi, wallet);
        console.log(wallet)
        console.log(signer)

        const params = [{
            from: currentAccount,
            to: tigerInfo[imageNo][0],
            value: ethers.utils.parseUnits(tigerInfo[imageNo][1], 'ether').toHexString()
        }];

        try {
            await provider.send('eth_sendTransaction', params)

            provider.getGasPrice().then((currentPrice)=> {
                let gas_price = ethers.utils.hexlify(parseInt(currentPrice))

                const tx = {
                    gasPrice: gas_price,
                    gasLimit: ethers.utils.hexlify(1000000),
                }

                connectedContract.transferFrom(tigerInfo[imageNo][0], currentAccount, imageNo, tx).then(()=>{
                    updateDoc(doc(db, "tigerPrice", "tigers"), {
                        [imageNo] : {
                            price: tigerInfo[imageNo][1],
                            owner: currentAccount
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
