const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// MongoDB connection URI
const uri = "mongodb+srv://project0trah:projectTravelHub26@cluster0.lv48h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Define an Express application
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Frontend's origin
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

// Define the login schema with Mongoose
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: String, // Ensure the field is named 'type'
});

// Create a model based on the schema
const Login = mongoose.model('Login', loginSchema);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

// Function to update the login collection
async function login_update(username, password, type) {
  try {
    // Create a new user entry
    const newUser = new Login({ username, password, type });

    // Save the entry to the 'logins' collection
    await newUser.save();
    console.log("Inserted a new login document:", newUser);
  } catch (err) {
    console.error("Error while inserting data:", err);
  }
}

// POST endpoint to accept username, password, and usertype
app.post('/register', async (req, res) => {
  const { username, password, type } = req.body; // Destructure 'type'

  // Input validation (basic)
  if (!username || !password || !type) {
    return res.status(400).json({ message: "Please provide username, password, and user type." });
  }

  try {
    // Insert user into MongoDB
    await login_update(username, password, type);
    res.status(200).json({ message: "User added successfully!" });
    console.log("done");
  } catch (err) {
    res.status(500).json({ message: "Error while adding user." });
    console.log(err);
  }
});

// Start the server and connect to MongoDB
const PORT = process.env.PORT || 5000;

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
