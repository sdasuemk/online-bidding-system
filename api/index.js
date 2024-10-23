const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db.js');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth.route.js');
const listingRouter = require('./routes/listing.route.js');

dotenv.config();

// db connection settings
connectDB();

//Create Application
const app = express();

app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's URL
    credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  })
);
app.use(cookieParser());

// Routers

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auction", listingRouter);

//Listen
app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT || 4000} :)`);
});

// Error handlers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});