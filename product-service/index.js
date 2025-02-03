// product-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3003;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Product schema
const productSchema = new mongoose.Schema({ name: String, price: Number, stock: Number });
const Product = mongoose.model('Product', productSchema);

app.use(express.json());

// Create a new product
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(port, () => console.log(`Product Service running on port ${port}`));
