const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  image: String,
  brand: String,
  freshnessScore: Number,
  weight: String,
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  type: { type: String, enum: ['grocery', 'dish'] },
});

module.exports = mongoose.model('Product', productSchema);