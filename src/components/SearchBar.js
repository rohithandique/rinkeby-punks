import React, { useRef } from 'react'
import {
    FormControl, FormLabel, Input, FormHelperText, Box,
    HStack, Button
  } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, createSearchParams } from 'react-router-dom'

export default function SearchBar() {

    const numberRef = useRef()

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate({
            pathname: "../search",
            search: `?${createSearchParams({
                number: numberRef.current.value
            })}`
        })
    }

    return (
            <form onSubmit={handleSubmit}>
                <HStack mx="4">
                <Box>
                    <FormControl>
                    <FormLabel htmlFor='search'>Search for any minted Punk</FormLabel>
                    <Input id='search' type="number" min="0" max="9999"
                        step="1" ref={numberRef} placeholder='1590'/>
                    <FormHelperText>Range: 0 to 9999</FormHelperText>
                    </FormControl>
                </Box>
                <Box>
                    <Button type="submit">Search</Button>
                </Box>
                </HStack>
            </form>        
    )
}
