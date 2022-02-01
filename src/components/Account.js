import React, { useEffect, useState } from 'react';
import NavBar from "../layouts/NavBar"
import { useAuth } from '../contexts/AuthContext';
import { Box, useColorModeValue, Button, SimpleGrid } from '@chakra-ui/react';
import Punk from './Punk';

export default function Account() {

  const { user, ownedPunks } = useAuth();
  const [listItems, setListItems] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    let isConnected = true;
    setIsLoading(true)
    const getWalletOfOwner = async() => {
      try {
        if(listItems<ownedPunks.length) {
          setListItems(listItems.concat(Array.from({length: ownedPunks.length}, (_, i) => i).map((number, index)=>
          <Punk key={index} imageNo={ownedPunks[index]}
            imageSrc={"https://www.larvalabs.com/cryptopunks/cryptopunk"+ownedPunks[index]+".png"}
          />
          )))
      }
        setIsLoading(false)
      } catch(err) {
        console.log(err)
      }
      
    }
    if(isConnected) {
      getWalletOfOwner();
    }
  
    return () => {
      isConnected = false;
    };
  }, [listItems, user, ownedPunks]);
  


  return <div>
    <NavBar />
    <Box backgroundColor={useColorModeValue("gray.100", "gray.600")} m={4} borderRadius={10}>
        <Box ml={2}>
            Owned NFTs:
        </Box>
    </Box>
    {isLoading 
    ? <Button isLoading colorScheme='teal' variant='outline' ></Button> 
    : <SimpleGrid columns={[1, null, 3]} >
        {listItems}
    </SimpleGrid>}
  </div>;
}
