import React, { useRef } from 'react'
import {
    FormControl, FormLabel,
    Input, Button, Stack
} from "@chakra-ui/react"
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore"; 
import { useAuth } from '../contexts/AuthContext';

import { ethers } from "ethers";
import abi from "../abi/abi.json";

export default function SellPunk(props) {

    const { user } = useAuth()
    const { imageNo } = props;
    const priceRef = useRef();
    const contractAddr = "0xDb6B1feb735B832E85BdB4A8aa0C12Fc2B11F0DC";

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { ethereum } = window; //injected by metamask
        //connect to an ethereum node
        const provider = new ethers.providers.Web3Provider(ethereum); 
        //gets the account
        const signer = provider.getSigner(); 
        //connects with the contract
        const connectedContract = new ethers.Contract(contractAddr, abi.output.abi, signer);
        try {

            const isApproved = await connectedContract.getApproved(imageNo);
            console.log("out")

            if(isApproved!=="0x1A81FCbe4a7b9d43B831Ed47A1100262D47eB8cD") {
                console.log("in")
                await connectedContract.approve("0x1A81FCbe4a7b9d43B831Ed47A1100262D47eB8cD", imageNo);
            }

            await updateDoc(doc(db, "punks", "minted"), {
                [imageNo] : {
                    price: priceRef.current.value,
                    owner: user.wallet_address
                }
            })
            window.location.reload()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <Stack spacing="6">
            <form onSubmit={handleSubmit}>
                <FormControl id="price" isRequired>
                    <FormLabel>Set Price</FormLabel>
                    <Input type="number" ref={priceRef} min="0" max="10000" step="any"/>
                </FormControl>
                <Button mt="2" type="submit" size="lg">List</Button>
            </form>
        </Stack>
    )
}
