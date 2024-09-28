
const express = require("express");

const authRoutes = require("./routes/authRoutes.js");

const app = express();



// routes 
app.use(authRoutes);

app.listen(3000, () => console.log("Life is Connected"))
