const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

// MongoDB connection URI
const uri = "mongodb+srv://project0trah:projectTravelHub26@cluster0.lv48h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect and work with the database using Mongoose
async function runWithMongoose() {
    // Define a schema with Mongoose
    const login = new mongoose.Schema({
        username: String,
        password: String,
        type: String,
    });
    
    // Create a model based on the schema
    const Login = mongoose.model('Login', login);


    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB with Mongoose!");

        // Create a new entry
        const newUser = new Login({
            username: "abdul",
            password: "12345678",
            type: "23"
        });

        // Save the entry to the 'travels' collection
        await newUser.save();
        console.log("Inserted a new travel document:", newUser);

        // Retrieve entries
        const login_details = await Login.find({});
        console.log("Retrieved login documents:", login_details);

  } catch (err) {
    console.error("Error working with MongoDB:", err);
  } finally {
    // Close the Mongoose connection
    await mongoose.connection.close();
    console.log("Closed the Mongoose connection.");
  }
}

runWithMongoose();
