import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { Box, Image, Badge, Center, useDisclosure, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
    ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext';
import abi from "../abi/abi.json"
import MintPunk from './MintPunk';


export default function Punk(props) {

    const { user, ownedPunks, mintedTigers } = useAuth();
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
                if(mintedTigers.includes(imageNo.toString())) {
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
    }, [imageNo, mintedTigers]);
    

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
                    {mintedTigers.includes(imageNo.toString()) ? "Minted" : "Not Minted"}
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
                    {ownedPunks.includes(parseInt(imageNo)) ? "List" : "Buy"}
                </Button>
                }
                
                <Box as='span' color='gray.600' fontSize='sm'>
                    
                </Box>
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                    Price: {mintedTigers.includes(imageNo.toString()) ? " ETH"  : "Not Set"} 
                </Box>

                Currently Owned by: 
                <p>{owner==="" ? "0x000000...." : user ? user.sub : ""}</p>
            </Box>
            </Box>  
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>RinkebyPunk#{imageNo}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {mintedTigers.includes(imageNo.toString()) ?
                    "Buy"
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
