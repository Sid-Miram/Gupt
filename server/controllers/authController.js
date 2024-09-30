const User = require("../models/User.js");
const jwt = require("jsonwebtoken");


function handleError(err){
  
  let errors = {email: "", password : ""}
  // duplication errors 
  if (err.code === 11000){
    errors["email"] = "This email is already registered.";
    return errors;
  }

  // validation errors 
  if (err.message.includes("User validation failed")){
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.properties.message;
    });
  }
  
  return errors;

}

// token Creator 

const maxAge = 4 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({_id},"why i'm like this", {
    expiresIn: maxAge
  });
} 


// controllers 

module.exports.signup_get = async (req, res) => {
  try{
    const data = await User.find({})
    res.json(data);
  } catch(error){
    console.log(error);
  }
}

module.exports.login_get = (req, res) => {
  res.send("Continue Life");
}   

module.exports.signup_post = async (req,res) => {
  const {email, password} = req.body;
  try{
    const user = await User.create({email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000, sameSite: 'None'});
    res.status(201).json({user:user._id});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
  
}




module.exports.delete_user = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting user" });
  }
};


module.exports.update_password = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = password;  // This will trigger the 'pre' hook to hash it
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};


module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.send("Checking the Breath");
}



