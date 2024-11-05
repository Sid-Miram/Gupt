const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    minlength: [3, "Username should be at least 3 characters long."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a Password"],
    minlength: [6, "Password should be at least 6 characters long."],
  },
}, { timestamps: true });

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if (user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw new Error("incorrect email or password");
  }

  }



userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
