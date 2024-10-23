import React, { useState, useEffect } from 'react';

import AuctionItemCard from '../components/AuctionItemCard';
import { Container, Grid } from '@mui/material';
import {allAuctionItem} from '../services/services';

const HomePage = () => {
    const [auctionItems, setAuctionItems] = useState([])
    const fetchAllActions = async () => {
        try {
            const { data } = await allAuctionItem();
            setAuctionItems(data)
        } catch (error) {
            console.error("Error fetching actions:", error);
            
        }
    }
    useEffect(() => {
        fetchAllActions()
    }, []);

  return (
    <Container>
      
      <Grid container spacing={2}>
        {auctionItems?.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <AuctionItemCard item={item} />
          </Grid>
        ))}
      </Grid>
     
    </Container>
  );
};

export default HomePage;
