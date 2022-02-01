import React from 'react';
import NavBar from '../layouts/NavBar';
import { useAuth } from '../contexts/AuthContext';
import Punk from './Punk';
import { SimpleGrid } from '@chakra-ui/react';

export default function Marketplace() {

  const { listedPunks, ownedPunks } = useAuth();
  console.log(ownedPunks)

  const listItems = listedPunks.map((number, index)=>
    <Punk key={index} imageNo={number}
      imageSrc={"https://www.larvalabs.com/cryptopunks/cryptopunk"+number+".png"}
    />
  )
  return <div>
    <NavBar />
    <SimpleGrid columns={[1, null, 3]}>
        {listItems}
    </SimpleGrid>
  </div>;
}
