const User = require("../models/User");
const generateToken = require("../utils/generateToken");

//* desc   Get users
//* route  GET /user
//* access Private/Admin
const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Get user profile
//* route  GET /user/profile
//* access Private
const getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user._id);
    return res.status(200).json({
      success: false,
      user: userProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Update user profile
//* route  PUT /user/profile
//* access Private
const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }
  try {
    let updatedUserProfile = {
      name,
      email,
      password,
    };
    const updateCondition = { _id: req.user._id };
    updatedUserProfile = await User.findOneAndUpdate(
      updateCondition,
      updatedUserProfile,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Update profile successfully",
      user: updatedUserProfile,
      token: generateToken(updatedUserProfile._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getUser, getUserProfile, updateUserProfile };
