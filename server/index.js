const express = require("express");
const mongoose  = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();

//variables
const DB = process.env.dbURI;
const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL

//middleware 
app.set("trust proxy", 1);

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: frontendUrl,
  credentials: true, // This allows the server to accept cookies from the client
}));





// database Connection 

async function dbConnect(URI){
  try{
    await mongoose.connect(URI);
    await User.init();
    app.listen(port, () => console.log("Life is connected"));
  } catch (err) {
    console.log(`Life is not connected: ${err}`);
  }
}

dbConnect(DB);


// routes 
app.use(authRoutes);

