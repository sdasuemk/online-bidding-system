import React from "react";
import { Typography } from "@mui/material";

const OutbidNotification = ({ notification }) => {
  return (
    notification && (
      <Typography color="error" marginTop={2}>
        {notification}
      </Typography>
    )
  );
};

export default OutbidNotification;
