import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import coinPicture from "../asset/coinPicture.jpg"

const AuctionItemCard = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        alt={item.name}
        height="140"
        image={item.image || coinPicture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Bid: Rs. {item.currentBid}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time Remaining: {item.timeRemaining}
        </Typography>
        <Button variant="contained" color="primary" href={`/biding/${item.id}`}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuctionItemCard;
