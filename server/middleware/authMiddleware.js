const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, "why i'm like this", (err, decoded) => {
      if(err){
        console.log(err.message);
        res.status(401).json({message: "Unauthorized"});
      } else{
        console.log(decoded);
        req.user = decoded;
        next();
      }
    })
  } else{
    res.status(401).json({message: "No Token"});
  }
}

module.exports = requireAuth;
