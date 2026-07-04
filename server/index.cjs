require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products.cjs');
const authRoutes = require('./routes/auth.cjs');
const cartRoutes = require('./routes/cart.cjs');   // ← new

const app = express();

app.use(cors());
app.use(express.json());

// Wait for MongoDB, THEN start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.use('/api/products', productRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/cart', cartRoutes);               // ← new

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });