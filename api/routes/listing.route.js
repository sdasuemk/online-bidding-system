const express = require("express");
const verifyToken = require("../utils/verifyUser.js");
const {
  createListingItem,
  updateListingItem,
  deleteListingItem,
  getAllListingItems,
  getBids, 
  createBid,
  getAllAuctionItems
} = require("../controllers/listing.controller.js");

const router = express.Router();

console.log({ createListingItem, updateListingItem, deleteListingItem, getAllListingItems, getBids, createBid, getAllAuctionItems });


router.post("/create", verifyToken, createListingItem);
router.put("/update/:id", verifyToken, updateListingItem);
router.delete("/delete/:id", verifyToken, deleteListingItem);
router.get("/fetch", verifyToken, getAllListingItems);
router.get("/:id/bids", verifyToken, getBids);
router.post("/:id/bid", verifyToken, createBid);
router.get("/listings", verifyToken, getAllAuctionItems);

module.exports = router;
