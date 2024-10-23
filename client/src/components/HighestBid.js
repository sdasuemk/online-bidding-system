import React from "react";
import { Typography } from "@mui/material";

const HighestBid = ({ highestBid }) => {
  return (
    <Typography variant="h6">Current Highest Bid: Rs. {highestBid}</Typography>
  );
};

export default HighestBid;
