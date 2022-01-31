import React, { useState } from 'react';
import NavBar from '../layouts/NavBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Punk from "./Punk"
import { SimpleGrid, Button, Center } from '@chakra-ui/react'
import SearchBar from "./SearchBar"

export default function Gallery() {

  const [hasMore, setHasMore] = useState(true);

  const [listItems, setListItems] = useState(
    Array.from({length: 9}, (_, i) => i).map((number, index)=>
    <Punk key={index} imageNo={number}
    imageSrc={"https://www.larvalabs.com/cryptopunks/cryptopunk"+number+".png"}/>
    )
  )

  const fetchData = () => {
    const len = listItems.length;
    console.log(listItems)
    if(len>=9999) {
      setHasMore(false);
      return;
    }
    
    if(len+9>9999) {
      setListItems(listItems.concat(Array.from({length: 9999-len}, (_, i) => i + len).map((number, index)=>
      <Punk key={index+len} imageNo={number}
      imageSrc={"https://www.larvalabs.com/cryptopunks/cryptopunk"+number+".png"}/>
      )))
    } else {
      setListItems(listItems.concat(Array.from({length: 9}, (_, i) => i + len).map((number, index)=>
      <Punk key={index+len} imageNo={number}
      imageSrc={"https://www.larvalabs.com/cryptopunks/cryptopunk"+number+".png"}/>
      )))
    }
    
  }

  return <>
    <NavBar />
    <Center mt="6" mb="2" h='100px'>
      <SearchBar />
    </Center>

    
    <InfiniteScroll
      dataLength={listItems.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Button isLoading colorScheme='teal' variant='outline' ></Button>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <SimpleGrid columns={[1, null, 3]} >
            {listItems}
      </SimpleGrid>
    </InfiniteScroll>
  </>;
}
