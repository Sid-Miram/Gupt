const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { getGoogleOAuthToken, getJwtIssuer } = require("../services/googleOAuthServices.js");
const axios = require("axios");
require("dotenv").config();

// importing variables from .env
const serverUrl = process.env.SERVER_BASE_URL; 
const frontendUrl = process.env.FRONTEND_URL;

function handleError(err) {
  let errors = { email: "", password: "" };

  // incorrect email or password
  if (err.message.includes("incorrect email or password")) {
    errors["email"] = "incorrect email or password";
    return errors;
  }
  // duplication errors
  if (err.code === 11000) {
    errors["email"] = "This email is already registered.";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.properties.message;
    });
  }

  return errors;
}

// token Creator

const maxAge = 4 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id }, "why i'm like this", {
    expiresIn: maxAge,
  });
};

// controllers

module.exports.signup_get = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.login_get = (req, res) => {
  res.send("Continue Life");
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password, provider } = req.body;
  try {
    const user = await User.create({ username, email, password , provider});
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

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

    user.password = password; // This will trigger the 'pre' hook to hash it
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.jwt_clear = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.checkAuth = (req, res) => {
  res.status(200).json({ message: "Authenticated" });
};

module.exports.upsertUserWithOAuth = async (req, res) => {

  try {
    const {email, username, provider} = req.body;

    const user = await User.findOneAndUpdate({email}, {username, email, provider}, {new:true, upsert:true} );
    const token = createToken(user._id);


    res.status(201).json({token});


  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({errors});
  }


}






module.exports.googleOAuthHandler = async (req, res) => {

  try {
    console.log("Inside OAuth handler")
    // get authorization code
    const authorization_code = req.query.code; // temporary code
    console.log("gettoken starts")
    const {id_token} =  await getGoogleOAuthToken(authorization_code);
    console.log("ends")

    // get user with id_token/ jwt token
    console.log("getting jwt issuer")
    const issuer = getJwtIssuer(id_token);
    const decoded = jwt.decode(id_token)
    console.log(issuer);
    const userData = {
      email : decoded.email,
      username: decoded.name,
      provider: issuer,
    }
    console.log("posting data")
    const response = await axios.post(`http://localhost:4000/api/auth/upsert`, userData, {
      headers: {"Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const token = response.data.token ;
    console.log(token);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
    })

    res.redirect("http://localhost:5173");

  } catch(err) {
    throw new Error(err);
    res.status(400).json(err);
  }

};

// `module` is an object provided by Node.js that represents the current file (module).
// It contains metadata and functionality related to the file.

// Key properties of the `module` object:
// - `module.exports`: The object that defines what this module exports.
//   By default, it is an empty object `{}`.
// - `module.id`: A unique identifier for the module (usually the absolute file path).
// - `module.filename`: The full file path of the current module.
// - `module.loaded`: A boolean indicating whether the module has been fully loaded.
// - `module.parent`: The module that imported (required) this module.

// `module.exports` vs. `exports`:
// - `module.exports` is the actual object that gets exported when this module is imported.
// - `exports` is a shorthand for `module.exports`.
// - Initially, `exports` and `module.exports` refer to the same object:
//console.log(module.exports === exports); // true

// Adding properties to `exports` modifies `module.exports`:
//exports.foo = "bar";
//console.log(module.exports); // { foo: "bar" }

// BUT if you reassign `module.exports`, it breaks the link between `exports` and `module.exports`:
//module.exports = { baz: "qux" }; // Works, exports `baz` object
//exports = { quux: "corge" };     // Does NOT work (exports is now a separate object)

// Always use `module.exports` when exporting a function, class, or replacing the default export.

// Example of `module` object in action:
//console.log(module);
/* Output (simplified):
{
  id: '.',
  exports: {},
  filename: '/absolute/path/to/currentFile.js',
  loaded: false,
  parent: null,
  children: [],
  paths: [ ... ]
}
*/

// Summary:
// - Use `module.exports` to define what your module exports.
// - Use `exports` only for adding properties to the export object (not for reassigning).
