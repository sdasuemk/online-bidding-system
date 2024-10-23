import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const createHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  const apiRequest = async ({ endpoint, method, data }) => {
    try {
      const headers = createHeaders();
  
      const response = await axiosInstance({
        method,
        url: endpoint,
        data,
        ...headers,
      });
  
      if (response.status >= 400) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response;
    } catch (error) {
      console.error("Error making API request:", error);
      throw error;
    }
  };

  export const postSignupForm = async (data) =>
  apiRequest({
    endpoint: "auth/signup",
    method: "POST",
    data,
  });
  export const postSignInForm = async (data) =>
  apiRequest({
    endpoint: "auth/signin",
    method: "POST",
    data,
  });
  export const doSignOut = async (data) =>
  apiRequest({
    endpoint: "auth/signout",
    method: "POST",
    data,
  });

export const createAuctionItem = async (data) =>
  apiRequest({
    endpoint: "/auction/create", 
    method: "POST",
    data,
  });

export const updateAuctionItem = async (id, data) =>
  apiRequest({
    endpoint: `/auction/update/${id}`, 
    method: "PUT",
    data,
  });


export const deleteAuctionItem = async (id) =>
  apiRequest({
    endpoint: `/auction/delete/${id}`, 
    method: "DELETE",
  });

export const getAllAuctionItems = async () =>
  apiRequest({
    endpoint: "/auction/fetch",  
    method: "GET",
  });

  export const getBidsForAuctionItem = async (auctionItemId) =>
    apiRequest({
      endpoint: `/auction/${auctionItemId}/bids`, 
      method: "GET",
    });
    
  export const createBid = async (auctionItemId, bidData) =>
    apiRequest({
      endpoint: `/auction/${auctionItemId}/bid`, 
      method: "POST",
      data: bidData,
    });

  export const allAuctionItem = async () =>
    apiRequest({
      endpoint: `/auction/listings`, 
      method: "GET"
    });



