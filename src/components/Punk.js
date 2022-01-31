import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { Box, Image, Badge, Center, useDisclosure, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
    ModalBody, ModalCloseButton } from '@chakra-ui/react'

import { useAuth } from '../contexts/AuthContext';

export default function Punk(props) {

    const {imageSrc, imageNo} = props;
    const { onOpen, isOpen, onClose  } = useDisclosure()
    const isListed = true;

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
                    {isListed ? "Listed" : "Not Listed"}
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
                
                <Button onClick={onOpen} variant="solid">
                    Hello
                </Button>
                
                <Box as='span' color='gray.600' fontSize='sm'>
                    
                </Box>
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                    Price: {isListed ? " ETH"  : "Not Set"} 
                </Box>

                Currently Owned by: {isListed ? "a" : "b"}
            </Box>
            </Box>  
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>xDaiTiger #{imageNo}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                Hello2
                </ModalBody>

                <ModalFooter>
                
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
        
    )
}
