const ListingItem = require('../models/listingItem.model');
const User = require('../models/user.model');

const createListingItem = async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    const { title, description, startingBid, endDate } = req.body;
    console.log(req.body)

    const listingItem = new ListingItem({
      title,
      description,
      startingBid,
      endDate,
      createdBy: req.user.id,
    });

    await listingItem.save();

    res.status(201).json({
      message: 'Listing item created successfully',
      data: listingItem,
    });
  } catch (error) {
    console.error('Error creating listing item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllListingItems = async (req, res) => {
  try {
    const listingItems = await ListingItem.find().populate('createdBy', 'username email');

    res.status(200).json({
      message: 'Listing items fetched successfully',
      data: listingItems,
    });
  } catch (error) {
    console.error('Error fetching listing items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateListingItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startingBid, endDate } = req.body;

    const listingItem = await ListingItem.findByIdAndUpdate(
      id,
      { title, description, startingBid, endDate },
      { new: true }
    );

    if (!listingItem) {
      return res.status(404).json({ error: 'Listing item not found' });
    }

    res.status(200).json({
      message: 'Listing item updated successfully',
      data: listingItem,
    });
  } catch (error) {
    console.error('Error updating listing item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteListingItem = async (req, res) => {
  try {
    const { id } = req.params;

    const listingItem = await ListingItem.findByIdAndDelete(id);

    if (!listingItem) {
      return res.status(404).json({ error: 'Listing item not found' });
    }

    res.status(200).json({
      message: 'Listing item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting listing item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBids = async (req, res) => {
  const { id } = req.params; 

  try {
    
    const auctionItem = await ListingItem.findById(id)
      .populate('createdBy')
      .populate('bids.userId')
      .exec();

    if (!auctionItem) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    const highestBid = auctionItem.bids.length > 0 ? Math.max(...auctionItem.bids.map(bid => bid.amount)) : 0;
    const bidHistory = auctionItem.bids;

    res.status(200).json({
      title: auctionItem.title,
      description: auctionItem.description,
      highestBid,
      bidHistory,
    });
  } catch (error) {
    console.error('Error fetching auction details:', error);
    res.status(500).json({ message: 'Error fetching auction details' });
  }
};

const createBid = async (req, res) => {
  const { id } = req.params; 
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const auctionItem = await ListingItem.findById(id);
    
    if (!auctionItem) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    const currentHighestBid = auctionItem.bids.length > 0 ? Math.max(...auctionItem.bids.map(bid => bid.amount)) : auctionItem.startingBid;

    if (amount <= currentHighestBid) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current highest bid' });
    }

    auctionItem.bids.push({ userId, amount });
    
    await auctionItem.save();

    const updatedHighestBid = Math.max(...auctionItem.bids.map(bid => bid.amount));
    const bidHistory = auctionItem.bids;

    res.status(200).json({
      highestBid: updatedHighestBid,
      bidHistory,
    });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid' });
  }
};

const getAllAuctionItems = async (req, res) => {
  try {
      const items = await ListingItem.find().populate('createdBy', 'username');

      if (!items || items.length === 0) {
          return res.status(404).json({ message: 'No auction items found' });
      }

      
      const formattedItems = items.map(item => ({
        id: item._id, 
        title: item.title,
        description: item.description,
        startingBid: item.startingBid,
        endDate: item.endDate,
        createdBy: item.createdBy.username,
        bids: item.bids,
        currentBid: item.bids.length > 0 ? Math.max(...item.bids.map(bid => bid.amount)) : item.startingBid, 
        timeRemaining: item.endDate > new Date() ? Math.ceil((item.endDate - new Date()) / (1000 * 60 * 60)) + ' hours' : 'Auction ended', 
    }));

      return res.status(200).json(formattedItems); 
  } catch (error) {
      console.error('Error fetching auction items:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createListingItem,
  updateListingItem,
  deleteListingItem,
  getAllListingItems,
  getBids, 
  createBid,
  getAllAuctionItems
};
