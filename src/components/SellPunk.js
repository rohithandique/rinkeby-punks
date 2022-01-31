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

export default function SellTiger(props) {

    const { currentAccount } = useAuth()
    const { imageNo } = props;
    const priceRef = useRef();
    const contractAddr = "0xfb6B832Ff91664620E699B0dc615996A6E80Ec0C";

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { ethereum } = window; //injected by metamask
        //connect to an ethereum node
        const provider = new ethers.providers.Web3Provider(ethereum); 
        //gets the account
        const signer = provider.getSigner(); 
        //connects with the contract
        const connectedContract = new ethers.Contract(contract_address, abi, signer);
        try {

            const isApproved = await connectedContract.getApproved(imageNo);
            console.log("out")

            if(isApproved!=="0x08CEA67f22bb8766A22363f210162f193888f2c9") {
                console.log("in")
                await connectedContract.approve("0x08CEA67f22bb8766A22363f210162f193888f2c9", imageNo);
            }

            await updateDoc(doc(db, "tigerPrice", "tigers"), {
                [imageNo] : {
                    price: priceRef.current.value,
                    owner: currentAccount
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
