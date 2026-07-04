const mongoose = require('mongoose');
const Product = require('./models/Product.cjs');
require('dotenv').config();

const groceryItems = [
  {
    name: 'Organic Bananas', category: 'Fruits', price: 40,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
    brand: "Nature's Best", freshnessScore: 95, weight: '6 pcs',
    nutrition: { calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  },
  {
    name: 'Fresh Spinach', category: 'Vegetables', price: 30,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    brand: 'Green Farms', freshnessScore: 90, weight: '250g',
    nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  },
  {
    name: 'Whole Wheat Bread', category: 'Bakery', price: 45,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    brand: 'Healthy Bites', freshnessScore: 88, weight: '400g',
    nutrition: { calories: 247, protein: 13, carbs: 41, fat: 3.4 },
  },
  {
    name: 'Almond Milk', category: 'Dairy & Alternatives', price: 120,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    brand: 'So Good', freshnessScore: 92, weight: '1L',
    nutrition: { calories: 60, protein: 1, carbs: 8, fat: 2.5 },
  },
  {
    name: 'Chicken Breast', category: 'Meat & Seafood', price: 220,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
    brand: 'FreshCo', freshnessScore: 97, weight: '500g',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  },
  {
    name: 'Brown Eggs', category: 'Dairy & Alternatives', price: 70,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    brand: 'Farm Fresh', freshnessScore: 94, weight: '6 pcs',
    nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  },
  {
    name: 'Organic Carrots', category: 'Vegetables', price: 35,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    brand: 'Roots & Co', freshnessScore: 93, weight: '500g',
    nutrition: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  },
  {
    name: 'Greek Yogurt', category: 'Dairy & Alternatives', price: 55,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    brand: 'Creamy Delight', freshnessScore: 89, weight: '200g',
    nutrition: { calories: 59, protein: 10, carbs: 3.6, fat: 0.7 },
  },
  {
    name: 'Avocados', category: 'Fruits', price: 150,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    brand: "Nature's Best", freshnessScore: 91, weight: '3 pcs',
    nutrition: { calories: 160, protein: 2, carbs: 9, fat: 15 },
  },
  {
    name: 'Salmon Fillet', category: 'Meat & Seafood', price: 350,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400',
    brand: 'Ocean Catch', freshnessScore: 98, weight: '250g',
    nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13 },
  },
  {
    name: 'Basmati Rice', category: 'Grains', price: 150,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    brand: 'India Gate', freshnessScore: 99, weight: '1kg',
    nutrition: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  },
  {
    name: 'Tomato Ketchup', category: 'Condiments', price: 85,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    brand: 'Heinz', freshnessScore: 80, weight: '500g',
    nutrition: { calories: 112, protein: 0.4, carbs: 25, fat: 0.1 },
  },
];

const dishes = [
  {
    name: 'Margherita Pizza',
    description: 'Classic delight with fresh mozzarella & basil',
    price: 199,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    popular: true,
    chefRecommendation: false,
    preparationTime: 20,
    nutrition: { calories: 266, protein: 11, carbs: 33, fat: 10 },
  },
  {
    name: 'Chicken Tikka',
    description: 'Tender char-grilled chicken with Indian spices',
    price: 249,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    popular: true,
    chefRecommendation: true,
    preparationTime: 25,
    nutrition: { calories: 220, protein: 28, carbs: 5, fat: 9 },
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons & classic dressing',
    price: 179,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',
    popular: false,
    chefRecommendation: false,
    preparationTime: 10,
    nutrition: { calories: 180, protein: 8, carbs: 12, fat: 12 },
  },
  {
    name: 'Sushi Platter',
    description: 'Assorted fresh nigiri & maki rolls',
    price: 349,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    popular: true,
    chefRecommendation: true,
    preparationTime: 30,
    nutrition: { calories: 350, protein: 15, carbs: 45, fat: 8 },
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    console.log('Deleting old products...');
    await Product.deleteMany({});
    
    console.log('Inserting grocery items...');
    const groceryProducts = groceryItems.map(item => ({ ...item, type: 'grocery' }));
    await Product.insertMany(groceryProducts);
    console.log(`Inserted ${groceryProducts.length} grocery items`);
    
    console.log('Inserting dishes...');
    const dishProducts = dishes.map(item => ({ ...item, type: 'dish' }));
    await Product.insertMany(dishProducts);
    console.log(`Inserted ${dishProducts.length} dishes`);
    
    const total = await Product.countDocuments();
    console.log(`Total documents: ${total}`);
    console.log('Database seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });