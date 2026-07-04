const mongoose = require('mongoose');
require('dotenv').config();

console.log('Connecting...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    process.exit();
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });