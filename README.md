# online-bidding-system

## Description
The **Online Bidding System** is a platform that allows users to create and participate in auctions. Users can place bids on items.

## Features
- User authentication and authorization
- Create, view, and participate in auctions
- Updates for bidding
- Bid history and auction management
- Integrated with Redux Toolkit for state management in the frontend
- Secure backend with JWT authentication, bcrypt for password hashing

## Tech Stack

### Frontend:
- **React**: Frontend library
- **React Router DOM**: Client-side routing
- **Redux Toolkit**: State management
- **MUI**: Material UI for UI components
- **Axios**: For making HTTP requests
- **Moment.js**: Date handling
- **React Hot Toast**: Notifications

### Backend:
- **Node.js**: Runtime environment
- **Express.js**: Backend framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Token for authentication
- **bcryptjs**: Password encryption
- **dotenv**: Environment variables
- **cors**: Cross-Origin Resource Sharing
- **cookie-parser**: To handle cookies

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB instance running

### Backend Installation
1. Navigate to the `api` directory

   cd api

### Install backend dependencies
- npm install

### Create a .env file in the api directory with the following environment variables
MONGO=<Your MongoDB URI>
PORT=<API port>
JWT_SECRET=<Your JWT Secret>

### Start the backend server
- npm run dev:backend

### Navigate to the client directory, install & start
- cd client
- npm install
- npm start

### Running the Whole Application
**Can run both the backend and frontend concurrently using the following command**
- npm run dev

