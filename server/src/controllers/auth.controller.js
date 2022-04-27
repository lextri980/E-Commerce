const generateToken = require("../utils/generateToken");
const User = require("../models/User");

//* desc   Login
//* route  POST /auth/login
//* access Public
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }
  try {
    const user = await User.findOne({ email, password }).select("-password");
    if (!user || !password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect information",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Register
//* route  POST /auth/register
//* access Public
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already existed",
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Register successfully",
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { login, register };
