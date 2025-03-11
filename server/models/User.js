const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
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
    required: [ function (){ return this.provider === "local"}, "Please enter a Password"],
    minlength: [6, "Password should be at least 6 characters long."],
  },
  provider: {
    type: String,
    required: true,
    enum: ["google", "github", "local" ],
  },
}, { timestamps: true });


// do not use login function for Oauth users. 
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if (user){
   if (user.provider === "local"){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user;
      }
      throw new Error("incorrect email or password");
    }

    throw new Error("This account is associated with a third-party login. Please use the appropriate method to sign in.")
    }

    throw new Error("Invalid credentials");
  }

userSchema.pre('save', async function (next) {
  if (this.provider === "local"){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
