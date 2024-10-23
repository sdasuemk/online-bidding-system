import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AuctionForm from '../components/ActionForm';
import AuctionList from '../components/AuctionList';
import { Container, Typography, Box } from '@mui/material';
import {createAuctionItem, updateAuctionItem, deleteAuctionItem, getAllAuctionItems } from '../services/services'

const CreateListing = () => {
    const [auctionItems, setAuctionItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [refreshList, setRefreshList] = useState(false);
    const nevigate = useNavigate();

    const fetchAuctionItems = async () => {
        try{
            const {data} = await getAllAuctionItems();
            setAuctionItems(data)
        }catch(err){
            // Error 
        }
    };
    useEffect(() => {
      fetchAuctionItems();
    }, [refreshList]);

    const handleAddOrUpdateItem = async (item) => {
        if (editingItem) {
          
          try {
            const response = await updateAuctionItem(editingItem._id, item);
          
            setEditingItem(null);
            console.log('Item updated successfully:', response.data);
          } catch (error) {
            console.error('Failed to update item:', error);
          }
          finally{
            setRefreshList(v => !v);
          }
        } else {
         
          try {
            const response = await createAuctionItem(item);
            setAuctionItems([...auctionItems, response.data]);
            console.log('Item created successfully:', response.data);
          } catch (error) {
            console.error('Failed to create item:', error);
          }
          finally {
            setRefreshList(v => !v);
          }
        }
      };

    const handleDeleteItem = async (itemId) => {
      console.log('Item updated successfully', itemId);
    try {
        await deleteAuctionItem(itemId);
        setRefreshList(v => !v);
    } catch (error) {
        console.error('Failed to delete item:', error);
    }
    };
    const handleUpdateItem = (item) => {
        setEditingItem(item);
        console.log('Item updated successfully', item);
    };

    const handleCancelEdit = () => {
      setEditingItem(null);
    };

    const onBiding = (itemId) => {
      nevigate(`/biding/${itemId}`);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 4 }}>Auction Management</Typography>
            <Box sx={{ mb: 4 }}>
                <AuctionForm onSubmit={handleAddOrUpdateItem} initialData={editingItem} onCancel={handleCancelEdit} />
            </Box>
            <AuctionList items={auctionItems} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} onBid={onBiding} />
        </Container>
    );
};

export default CreateListing;
