/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import {useParams} from "react-router-dom"
import BidForm from '../components/BidForm';
import HighestBid from '../components/HighestBid';
import BidHistory from '../components/BidHistory';
import OutbidNotification from '../components/OutbidNotification';
import {
    createBid,
    getBidsForAuctionItem,
  } from '../services/services';

const BidPage = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [bidItem, setBidItem] = useState('');
  const [bidItemDescription, setBidItemDescription] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const [bidHistory, setBidHistory] = useState([]);
  const [outbidNotification, setOutbidNotification] = useState('');
  const { id } = useParams();

  const fetchAuctionDetails = async () => {
    try {
      const {data} =  await getBidsForAuctionItem(id);
      const { highestBid, bidHistory, title, description } = data;
      setHighestBid(highestBid);
      setBidHistory(bidHistory);
      setBidItem(title);
      setBidItemDescription(description);
    } catch (error) {
      console.error('Error fetching auction details', error);
    }
  };

  const handleBidSubmit = async () => {
    try {
      const response =  await createBid(id, { amount: bidAmount });
      setHighestBid(response.data.highestBid);
      setBidHistory(response.data.bidHistory);
      setBidAmount('');
      setOutbidNotification("Bid successfully submitted");
    } catch (error) {
      console.error('Error placing bid', error);
      setOutbidNotification(error.response.data.message);
    }
  };

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Auction Item: {bidItem}
      </Typography>
      <Typography color="text.secondary">{bidItemDescription}</Typography>

      <HighestBid highestBid={highestBid} />

      <BidForm
        bidAmount={bidAmount}
        onBidChange={handleBidChange}
        onBidSubmit={handleBidSubmit}
      />

       <OutbidNotification notification={outbidNotification} />

      <BidHistory bidHistory={bidHistory} />
    </Container>
  );
};

export default BidPage;
