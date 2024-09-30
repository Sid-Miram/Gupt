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


// token creator 
const maxAge = 4 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, 'your_secret_key', {
    expiresIn: maxAge
  })
}

// controllers 

module.exports.signup_get = (req, res) => {
  res.send("Start Life");
}

module.exports.login_get = (req, res) => {
  res.send("Continue Life");
}

module.exports.signup_post = async (req,res) => {
  const {email, password} = req.body;
  try{
    const user = await User.create({email, password});
    const token = createToken(user._id);
    console.log(token)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000, SameSite:None} ) // secure on https implemnetation should be done later and same for sameSite.
    console.log("Cookie Set")
    res.status(201).json({user: user._id});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
  
}

module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.send("Checking the Breath");
}


