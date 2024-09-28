const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type : String,
    required : [true, "Please enter an email"],
    unique : true,
    lowercase : true,
    trim: true,
    validate : [isEmail, "Please enter a valid email"]
  },
  password : {
    type : String,
    required : [true, "Please enter a Password"],
    minlength : [6, "Password should be atleast 6 characters long."]
  }

}, {
  timestamps : true
  
});

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
