const express = require("express");
const router = express.Router();
const { protectedRoute, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getTopProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protectedRoute, isAdmin, createProduct);
router.put("/:id", protectedRoute, isAdmin, updateProduct);
router.delete("/:id", protectedRoute, isAdmin, deleteProduct);
router.get("/:id/review", getAllReviews);
router.post("/:id/review", protectedRoute, createReview);
router.put('/:id/review/:id', protectedRoute, updateReview);
router.put('/:id/review/:id', protectedRoute, deleteReview);
router.get("/rating/top-product", getTopProduct);

module.exports = router;
