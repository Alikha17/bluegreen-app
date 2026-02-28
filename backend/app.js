const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Simple API route
app.get('/', (req, res) => {
  res.send('BLUE VERSION BACKEND');
});

// Example: simple user schema and route
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
