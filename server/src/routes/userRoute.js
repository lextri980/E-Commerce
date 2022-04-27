const express = require("express");
const router = express.Router();
const { protectedRoute, isAdmin } = require("../middlewares/authMiddleware");
const { getUser, getUserProfile, updateUserProfile } = require("../controllers/user");

router.get("/", protectedRoute, isAdmin, getUser);
router.get('/profile',protectedRoute, getUserProfile)
router.put('/profile', protectedRoute, updateUserProfile)

module.exports = router;
