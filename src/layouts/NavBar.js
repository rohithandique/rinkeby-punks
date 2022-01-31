import React from "react";
import {
  chakra, Box, Flex, useColorModeValue, VisuallyHidden, HStack, Button, useDisclosure,
  VStack, IconButton, CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom"
import LoginButton from "../components/LoginButton";

export default function NavBar() {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();

    return (
        <>
        <chakra.header
            bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md" mb={2}
            style={{
                position: "sticky",
                top: "0",
                opacity: "1",
                zIndex: "99"}}
        >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
                <chakra.a
                href="/"
                title="Choc Home Page"
                display="flex"
                alignItems="center"
                >
                
                <VisuallyHidden>Choc</VisuallyHidden>
                </chakra.a>
                <Link as={RouterLink} to="/" style={{textDecoration: 'none'}}>
                    <Button variant="ghost" style={{ backgroundColor: 'transparent' }}>
                        <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                            Rinkeby Punks
                        </chakra.h1>
                    </Button>
                </Link>
                
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
                <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{ base: "none", md: "inline-flex" }}
                >
                    <Link as={RouterLink} to="/marketplace" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">MarketPlace</Button>
                    </Link>
                    <Link as={RouterLink} to="/gallery" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">Gallery</Button>
                    </Link>
                    <Link as={RouterLink} to="/account" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">Account</Button>
                    </Link>
                </HStack>
                <LoginButton screen="lg"/>
                <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    aria-label="Open menu"
                    fontSize="20px"
                    color={useColorModeValue("gray.800", "inherit")}
                    variant="ghost"
                    icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                />

                <VStack
                    pos="absolute"
                    top={0}
                    left={0}
                    right={0}
                    display={mobileNav.isOpen ? "flex" : "none"}
                    flexDirection="column"
                    p={2}
                    pb={4}
                    m={2}
                    bg={bg}
                    spacing={3}
                    rounded="sm"
                    shadow="sm"
                >
                    <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                    />

                    <Link as={RouterLink} to="/marketplace" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">MarketPlace</Button>
                    </Link>
                    <Link as={RouterLink} to="/gallery" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">Gallery</Button>
                    </Link>
                    <Link as={RouterLink} to="/account" style={{textDecoration: 'none'}}>
                        <Button variant="ghost">Account</Button>
                    </Link>
                    <LoginButton screen="sm"/>
                </VStack>
                </Box>
            </HStack>
            </Flex>
        </chakra.header>
        </>
    );
}