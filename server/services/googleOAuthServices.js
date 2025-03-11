const jwt = require("jsonwebtoken");
// sends authorization_code to Resource Server/ Authorization Server 
// Used in controllers -> authController.js -> googleOAuthHandler

const qs = require("qs");
const axios = require("axios");
require("dotenv").config();

module.exports.getGoogleOAuthToken = async (code) => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENTID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

  

    return res.data;
    
  } catch (err) {
    console.log("failed to fetch google Oauth Token");
    throw new Error(err.message);
  }
};


// identify the issuer of jwt
// used in controllers -> authController.js -> googleOAuthHandler


module.exports.getJwtIssuer = function(jwtToken) {
  const payload = jwt.decode(jwtToken);
  const issuer = payload.iss;
  if (!payload.iss){
    throw new Error("Invalid JWT: Missing issuer claim ");
  }
  switch(issuer) {
    case "https://accounts.google.com":
      return "google";

    default:
      throw new Error("Unknown JWT issuer");
  }


}
