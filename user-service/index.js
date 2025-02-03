// user-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const userSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', userSchema);

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(port, () => console.log(`User Service running on port ${port}`));
