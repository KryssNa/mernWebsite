const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers("authorization");
    const jwtToken = token.replace("Bearer ", "").trim();

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = User.findOne({ email: isVerified.email }).select({
      isAdmin: 1,
    });
    req.isAdmin=userData.isAdmin;

    next()
  } catch (error) {
    res.status(401).json("Access denied!");
  }
};

module.exports=adminMiddleware;
