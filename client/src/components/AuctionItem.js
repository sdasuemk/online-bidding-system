import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import moment from "moment";

const AuctionItem = ({ item, onUpdate, onDelete, onBid }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{item.title}</Typography>
        <Typography color="text.secondary">{item.description}</Typography>
        <Typography>Starting Bid: Rs. {item.startingBid}</Typography>
        <Typography>
          End Date: {moment(item.endDate).format("DD MMM YYYY")}
        </Typography>
      </CardContent>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Button variant="outlined" onClick={() => onUpdate(item)}>
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => onBid(item._id)}
        >
          Bid
        </Button>
      </Box>
    </Card>
  );
};

export default AuctionItem;
