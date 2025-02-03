// order-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3002;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/orderdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Order schema
const orderSchema = new mongoose.Schema({ userId: String, productId: String, status: String });
const Order = mongoose.model('Order', orderSchema);

app.use(express.json());

// Create a new order
app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// Get all orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(port, () => console.log(`Order Service running on port ${port}`));
