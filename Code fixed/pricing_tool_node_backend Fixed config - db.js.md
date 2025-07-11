Repo link - https://github.com/localseoios/pricing_tool_node_backend/tree/test_branch

```js
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
    try {
        // Ensure the correct URI format
        const mongoURI = process.env.MONGO_URI; // No need to manually concatenate the database name

        // Connect to MongoDB without deprecated options
        const conn = await mongoose.connect(mongoURI, {
            dbName: process.env.MONGO_DB_NAME, // ✅ Correct way to specify the DB
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

```

### **Updated `server.js`**

```js
require("dotenv").config(); // Load environment variables first

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5000;
const errorHandler = require("./middlewares/ErrorMiddleware");

// Debugging: Ensure environment variables are loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("Database Name:", process.env.MONGO_DB_NAME);
console.log("Server running on port:", port);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS (Adjust origin if needed)
app.use(cors());

// API Routes
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/item', require('./routes/ItemRoutes'));
app.use('/api/shop', require('./routes/ShopRoutes'));
app.use('/api/category', require('./routes/CategoryRoutes'));
app.use('/api/product', require('./routes/ProductRoute'));

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => console.log(`🚀 Server running on PORT ${port}`));

```
