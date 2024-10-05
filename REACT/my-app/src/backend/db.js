const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

// const uri = "mongodb+srv://project0trah:projectTravelHub26@cluster0.lv48h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017";

if (!uri) {
  console.error("Error: MONGODB_URI is not defined");
  process.exit(1);
}

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

const Login = mongoose.model('Login', loginSchema);

const transportSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  amount: { type: Number, default: 0 },
  status: { type: String, default: 'Pending' },
});

const Transport = mongoose.model('Transport', transportSchema);


const truckSchema = new mongoose.Schema({
  truckName: { type: String, required: true },
  driverName: { type: String, required: true },
  truckCapacity: { type: Number, required: true },
  truckType: { type: String },
  truckContact: { type: String },
  owner : { type: mongoose.Schema.Types.ObjectID, ref: 'Login' ,required : true},
});

const Truck = mongoose.model('Truck', truckSchema);

app.post('/trucks', async (req, res) => {
  const { truckName, driverName, truckCapacity, truckType, truckContact, ownerId } = req.body;

  // Basic validation
  if (!truckName || !driverName || !truckCapacity || !ownerId) {
    return res.status(400).json({ message: "Please provide all required fields, including ownerId." });
  }

  const newTruck = new Truck({
    truckName,
    driverName,
    truckCapacity,
    truckType,
    truckContact,
    owner: ownerId,
  });

  try {
    await newTruck.save();
    res.status(201).json({ message: "Truck added successfully!", truck: newTruck });
  } catch (err) {
    console.error("Error adding truck:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post('/transports', async (req, res) => {
  const { ownerId, truckId, fromLocation, toLocation, fromDate, toDate } = req.body;

  if (!ownerId || !truckId || !fromLocation || !toLocation || !fromDate || !toDate) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const newTransport = new Transport({
    owner: ownerId,
    truck: truckId,
    fromLocation,
    toLocation,
    fromDate,
    toDate,
    status: 'Pending',
  });

  try {
    await newTransport.save();
    res.status(201).json({ message: "Transport created successfully!", transport: newTransport });
  } catch (err) {
    console.error("Error creating transport:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get('/transports', async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({ message: "Owner ID is required." });
  }

  try {
    const transports = await Transport.find({ owner: ownerId }).populate('truck');
    res.status(200).json({ transports });
  } catch (err) {
    console.error("Error fetching transports:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});



app.get('/trucks', async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({ message: "Owner ID is required." });
  }

  try {
    const trucks = await Truck.find({ owner: ownerId });
    res.status(200).json({ trucks });
  } catch (err) {
    console.error("Error fetching trucks:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});



async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

async function login_update(username, password, type) {
  try {
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Login({ username, password: hashedPassword, type });
    await newUser.save();
    console.log("Inserted a new login document:", newUser);
  } catch (err) {
    throw err;
  }
}

app.get('/user-trucks', async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({ message: "Owner ID is required." });
  }

  try {
    const trucks = await Truck.find({ owner: ownerId });
    res.status(200).json({ trucks });
  } catch (err) {
    console.error("Error fetching user's trucks:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.post('/register', async (req, res) => {
  const { username, password, type } = req.body;

  if (!username || !password || !type) {
    return res.status(400).json({ message: "Please provide username, password, and user type." });
  }

  try {
    await login_update(username, password, type);
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        type: newUser.type,
      },
    });
  } catch (err) {
    if (err.message === "Username already exists.") {
      res.status(409).json({ message: "Username already exists. Please choose another one." });
    } else {
      res.status(201).json({
        message: "User registered successfully!",})
      // console.log(err);
      // res.status(500).json({ message: "Internal server error." });
    }
  }
});


app.post('/login', async (req, res) => {
  const { username, password, type } = req.body;

  if (!username || !password || !type) {
    return res.status(400).json({ message: "Please provide username, password, and user type." });
  }

  try {
    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    if (user.type[0] !== type[0]) {
      return res.status(401).json({ message: "User type mismatch." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        type: user.type,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});


const PORT = process.env.PORT || 5000;

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});