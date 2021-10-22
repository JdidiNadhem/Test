const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.isAuthUser = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];
    // if the token is undefined 
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized1" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // search the User
    const user = await User.findById(decoded.id).select("-password");
    // send not authorisation IF NOT User
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized2" }] });
    }

    // if User exist
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Unauthorized3" }] });
  }
};