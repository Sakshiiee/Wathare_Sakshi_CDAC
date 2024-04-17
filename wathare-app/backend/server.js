
const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');

// Create Express app
const app = express();

// allowing the cross origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sakshidb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema
const wathareSchema = new mongoose.Schema({
  ts: String,
  machine_status: Number,
  vibration: Number
});

// Define MongoDB model
const Wathare = mongoose.model('wathare', wathareSchema, 'wathare');

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define route to fetch all data from "wathare" collection
app.get('/wathare', async (req, res) => {
  try {
    const data = await Wathare.find();
    return res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from database');
  }
});

//Define route for required range of records only
app.get('/wathare/rangedData/:startTime/:endTime', async (req, res) => {
  try {
    const startTime = new Date(req.params.startTime);
    const endTime = new Date(req.params.endTime);

    // Query database for records within the specified range
    const data = await Wathare.find({ ts: { $gte: startTime, $lte: endTime } });

    return res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from database');
  }
});

// Listening the port
const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});