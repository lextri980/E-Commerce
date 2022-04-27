const Product = require("../models/Product");
// const Order = require("../models/Order");
const generateToken = require("../utils/generateToken");

//* desc   Get all products
//* route  GET /product
//* access Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Get product by id
//* route  GET /product/:id
//* access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Create product
//* route  POST /product
//* access Private/Admin
const createProduct = async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    reviewNumber,
    price,
    countInStock,
  } = req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !category ||
    !description ||
    !price ||
    !countInStock
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }

  try {
    const product = new Product({
      name,
      image,
      brand,
      category,
      description,
      reviewNumber: 0 || reviewNumber,
      price: 0 || price,
      countInStock: 0 || countInStock,
      user: req.user._id,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Create product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Update product
//* route  PUT /product/:id
//* access Private/Admin
const updateProduct = async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    reviewNumber,
    price,
    countInStock,
  } = req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !category ||
    !description ||
    !price ||
    !countInStock
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }

  try {
    let updatedProduct = {
      name,
      image,
      brand,
      category,
      description,
      reviewNumber: 0 || reviewNumber,
      price: 0 || price,
      countInStock: 0 || countInStock,
    };
    const updateCondition = { _id: req.params.id, user: req.user._id };
    updatedProduct = await Product.findOneAndUpdate(
      updateCondition,
      updatedProduct,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Update product successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Delete product
//* route  DELETE /product/:id
//* access Private/Admin
const deleteProduct = async (req, res) => {};

//* desc   Get all reviews
//* route  GET /:id/review
//* access Public
const getAllReviews = async (req, res) => {};

//* desc   Create review
//* route  POST /:id/review
//* access Private
const createReview = async (req, res) => {};

//* desc   Get top product
//* route  GET /product/top
//* access Public
const getTopProduct = async (req, res) => {};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllReviews,
  createReview,
  getTopProduct,
};
