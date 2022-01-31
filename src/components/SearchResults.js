import React from 'react'
import NavBar from '../layouts/NavBar'
import Punk from "./Punk"
import { useSearchParams } from 'react-router-dom'
import { SimpleGrid, Center } from '@chakra-ui/react'
import SearchBar from "./SearchBar"
 
export default function SearchResults() {

    const [searchParams] = useSearchParams();
    const _imageNo = searchParams.get("number")

    return (
        <>
        <NavBar />
        <Center mt="6" mb="2" h='100px'>
            <SearchBar />
        </Center>
        <SimpleGrid columns={[1, null, 3]} >
        <Punk imageNo={_imageNo} imageSrc={
            "https://www.larvalabs.com/cryptopunks/cryptopunk"+_imageNo+".png"
        }/>
        </SimpleGrid>
        </>

    )
}
