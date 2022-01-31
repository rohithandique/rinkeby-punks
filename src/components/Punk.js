import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { Box, Image, Badge, Center, useDisclosure, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
    ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext';
import abi from "../abi/abi.json"
import MintPunk from './MintPunk';
import SellPunk from "./SellPunk"
import BuyPunk from "./BuyPunk"

export default function Punk(props) {

    const { ownedPunks, mintedPunks, listedPunks, punkPrice } = useAuth();
    const {imageSrc, imageNo} = props;
    const { onOpen, isOpen, onClose  } = useDisclosure()
    const [ owner, setOwner ] = useState("")
    const contractAddr = "0xfb6B832Ff91664620E699B0dc615996A6E80Ec0C";
    useEffect(() => {
        let isConnected = true;
        const getOwner = async () => {
            try {
                const { ethereum } = window; //injected by metamask
                //connect to an ethereum node
                const provider = new ethers.providers.Web3Provider(ethereum); 
                //gets the account
                const signer = provider.getSigner(); 
                const connectedContract = new ethers.Contract(contractAddr, abi.output.abi, signer);
                if(mintedPunks.includes(imageNo.toString())) {
                    let _owner = await connectedContract.ownerOf( imageNo );
                    setOwner(_owner)
                }
                
            } catch(err) {
                console.log(err);
            }
        }
        
        if(isConnected) {
            getOwner()
          }
        return () => {
            isConnected = false;
        };
    }, [imageNo, mintedPunks]);
    return (
        <Center>
            
            <Box my={4} mx={4} maxW='base' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={imageSrc} />

            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                    #{imageNo}
                </Badge>
                <Badge borderRadius='full' px='2' mx='2' colorScheme='blue'>
                    {mintedPunks.includes(imageNo.toString()) ? 
                        listedPunks.includes(imageNo.toString()) ?
                    "Listed" : "Not Listed" : "Not Minted"}
                </Badge>
                <Box
                    color='gray.500'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='xs'
                    textTransform='uppercase'
                    ml='2'
                >
                </Box>
                </Box>

                <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
                >
                
                {owner===""?
                <Button onClick={onOpen} variant="solid">
                    Mint
                </Button>
                :
                <Button onClick={onOpen} variant="solid">
                    {ownedPunks.includes(parseInt(imageNo)) ?
                        listedPunks.includes(imageNo.toString()) ? 
                    "Edit" : "List" : "Buy"}
                </Button>
                }
                
                <Box as='span' color='gray.600' fontSize='sm'>
                    
                </Box>
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                    Price: {mintedPunks.includes(imageNo.toString()) ? 
                        listedPunks.includes(imageNo.toString()) ? 
                    punkPrice[imageNo]+
                    " ETH" : "Not Set" : "FREE!" } 
                </Box>

                Currently Owned by: 
                <p>{owner==="" ? "0x000000...." : owner.substring(0, 20)+"..."}</p>
            </Box>
            </Box>  
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>RinkebyPunk#{imageNo}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {mintedPunks.includes(imageNo.toString()) ? 
                    ownedPunks.includes(imageNo) ?
                    <SellPunk imageNo={imageNo}/>
                    :
                    <BuyPunk imageNo={imageNo} owner={owner}/>
                    :
                    <MintPunk imageNo={imageNo}/>
                    }
                </ModalBody>

                <ModalFooter>
                
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
        
    )
}
