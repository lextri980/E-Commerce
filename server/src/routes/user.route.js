const express = require("express");
const router = express.Router();
const { protectedRoute, isAdmin } = require("../middlewares/authMiddleware");
const {
  getUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", protectedRoute, isAdmin, getUser);
router.get("/profile", protectedRoute, getUserProfile);
router.put("/profile", protectedRoute, updateUserProfile);
router.get("/:id", protectedRoute, isAdmin, getUserById);
router.put("/:id", protectedRoute, isAdmin, updateUser);
router.delete("/:id", protectedRoute, isAdmin, deleteUser);

module.exports = router;
