const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectedRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Admin resource, not authorized",
    });
  }
};

module.exports = { protectedRoute, isAdmin };
