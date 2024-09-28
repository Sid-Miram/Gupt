
// controllers 

module.exports.signup_get = (req, res) => {
  res.send("Start Life");
}

module.exports.login_get = (req, res) => {
  res.send("Continue Life");
}

module.exports.signup_post = async (req,res) => {
  res.send("Life Created")
  }

module.exports.login_post = (req, res) => {
    res.send("Checking the Breath");
}



