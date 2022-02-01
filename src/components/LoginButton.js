import React, { useEffect, useState } from 'react';
import { Button, VStack, HStack } from '@chakra-ui/react';
import LOGO from "../images/Unstoppable Domains-Sign-Mono-Dark.svg"
import UAuth from '@uauth/js';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function LoginButton(props) {

    const { screen } = props;
    const [error, setError] = useState()
    const { user, setUser } = useAuth();

    const uauth = new UAuth({
        clientID: 'PBIVskwQFi7nbY4pPzzeeQZIGSSAqAvzpfQyGaEFCEE=',
        clientSecret: 'rQC1qnpsP7Te+yAxzBFkMv5OBfOIHPFrtkDiZ4w8i4w=',
        redirectUri: 'https://rinkeby-punks-pearl.vercel.app/callback',
      
        // Must include both the openid and wallet scopes.
        scope: 'openid wallet email:optional',
    })
    let navigate = useNavigate();

    useEffect(() => {
      uauth
        .user()
        .then(setUser)
        .catch(() => {})
        .finally(() => console.log("Logged In"))
    }, [setUser]) // eslint-disable-line

    const handleLogin = () => {
        if(user) return;
        uauth
        .loginWithPopup()
        .then(() => {
            uauth.user().then(setUser)
            
        })
        .catch((err)=> {
            setError(err)
            console.log(error)
        })
        .finally(async() => {
            try {
                const { ethereum } = window;

                if (!ethereum) {
                    alert("Get MetaMask!");
                    return;
                }
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const chainId = await ethereum.request({ method: 'eth_chainId' });
                console.log(accounts)
                console.log(chainId)
                navigate("/callback", { replace: false });

            } catch (error) {
                console.log(error)
            }
        })
    }
  
    const handleLogout = () => {
        uauth
        .logout()
        .then(() => setUser(undefined))
        .catch((err)=> {
            setError(err)
            console.log(error)
        })
        .finally(() => console.log("Logged Out"))
    }

    return <div>
        <HStack>
        <VStack>
            <Button as={Button} color={'white'} leftIcon={<img style={{height: "20px"}} src={LOGO} alt='UD Logo'/>}
            backgroundColor={'#4b47ee'}
            _hover={{
                bg: '#0b24b3'
            }}
            _active={{
                bg: '#5361c7'
            }}
            onClick={handleLogin}
            >
                { user ? user.sub : "Login with Unstoppable"}
            </Button >
            {user && screen==="sm" ? 
            <Button onClick={handleLogout} ml="2">
                Log Out
            </Button>
            : <></>}
        </VStack>
        {user && screen==="lg" ? 
        <Button display={{ base: "none", md: "inline-flex" }} onClick={handleLogout} ml="2">
            Log Out
        </Button>
        : <></>}

        </HStack >
        
    </div>;
}
