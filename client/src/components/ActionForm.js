import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import moment from "moment";

const AuctionForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    endDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        startingBid: initialData.startingBid || "",
        // endDate: initialData.endDate || ''
        endDate: initialData.endDate
          ? moment(initialData.endDate).format("YYYY-MM-DD")
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        startingBid: "",
        endDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ title: "", description: "", startingBid: "", endDate: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Starting Bid"
        name="startingBid"
        type="number"
        value={formData.startingBid}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.endDate}
        onChange={handleChange}
        fullWidth
        required
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {initialData ? "Update Auction" : "Create Auction"}
        </Button>
        {initialData && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AuctionForm;
