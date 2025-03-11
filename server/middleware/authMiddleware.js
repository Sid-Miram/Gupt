const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }

  jwt.verify(token, "why i'm like this", (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // If you want to access decoded data later, attach it to `req`
    req.user = decoded; 
    console.log(decoded);
    
    // Move to the next middleware or route handler
    next();
  });
};

module.exports = requireAuth;
