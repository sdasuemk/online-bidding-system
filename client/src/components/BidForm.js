import React from "react";
import { TextField, Button } from "@mui/material";

const BidForm = ({ bidAmount, onBidChange, onBidSubmit }) => {
    console.log(bidAmount, 'bidAmount')
  return (
    <div>
      <TextField
        label="Enter Your Bid"
        variant="outlined"
        fullWidth
        value={bidAmount}
        onChange={onBidChange}
        type="number"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={onBidSubmit}>
        Place Bid
      </Button>
    </div>
  );
};

export default BidForm;
