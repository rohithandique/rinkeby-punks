import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "../abi/abi.json"
import {
    Button, Stack, Box
} from "@chakra-ui/react"
import { db } from '../firebase';
import { doc, updateDoc} from "firebase/firestore";

export default function MintPunk(props) {

    const { imageNo } = props;

    const contractAddr = "0xDb6B1feb735B832E85BdB4A8aa0C12Fc2B11F0DC";

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { ethereum } = window; //injected by metamask
            //connect to an ethereum node
            const provider = new ethers.providers.Web3Provider(ethereum); 
            //gets the account
            const signer = provider.getSigner(); 
            const _owner = await signer.getAddress()
            //connects with the contract
            const connectedContract = new ethers.Contract(contractAddr, abi.output.abi, signer);
            await connectedContract.mintNFT(imageNo);
            await updateDoc(doc(db, "punks", "minted"), {
                [imageNo] : {
                    owner: _owner
                }
            })
            console.log("SUCCESS");
            window.location.reload();
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
    
      return () => {
      };
    }, []);
    

    return <div>
        <Box>
            Mint Price: FREE!
        </Box>
        <Stack spacing="6">
            <form onSubmit={handleSubmit}>
                <Button mt="2" type="submit" size="lg">Mint</Button>
            </form>
        </Stack>
    </div>;
}
