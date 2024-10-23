import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const BidHistory = ({ bidHistory }) => {
  console.log(bidHistory, "bidHistory");
  return (
    <div>
      <Typography variant="h6" marginTop={4}>
        Bid History
      </Typography>
      <List>
        {bidHistory.map((bid, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Rs. ${bid.amount}`}
              secondary={`Bidder: ${
                bid.userId
                  ? `${bid.userId.firstName} ${bid.userId.lastName}`
                  : "Unknown"
              }, Time: ${new Date(bid.timestamp).toLocaleString()}`}
              //   secondary={`Bidder: ${bid.userId}, Time: ${new Date(bid.time).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BidHistory;
