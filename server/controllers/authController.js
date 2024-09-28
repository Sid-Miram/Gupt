const User = require("../models/User.js");



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



// controllers 

module.exports.signup_get = (req, res) => {
  res.send("Start Life");
}

module.exports.login_get = (req, res) => {
  res.send("Continue Life");
}

module.exports.signup_post = async (req,res) => {
  try{
    res.send("Info sent succesfully");
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
  
}

module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.send("Checking the Breath");
}



