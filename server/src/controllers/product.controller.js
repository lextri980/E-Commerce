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
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is not found",
      });
    }
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

    if (!updatedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Update product successfully",
      product: updatedProduct,
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
const deleteProduct = async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.user._id };
    const product = await Product.findOneAndDelete(deleteCondition);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete product successfully",
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

//* desc   Get all reviews
//* route  GET /product/:id/review
//* access Public
const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is not found",
      });
    }

    const reviews = product.reviews;

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//* desc   Create review
//* route  POST /product/:id/review
//* access Private
const createReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({
      success: false,
      message: "Missing infomation",
    });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is not found",
      });
    }

    const review = product.reviews;

    const alreadyReviewed = product.reviews.find(
      (i) => i.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "User have already reviewed this product",
      });
    }

    const newReview = {
      name: req.user.name,
      rating: 0 || Number(rating),
      comment,
      user: req.user._id,
    };

    review.push(newReview);
    product.reviewNumber = review.length;
    product.rating =
      review.reduce((acc, item) => item.rating + acc, 0) / review.length;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Create review successfully",
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

//* desc   Update review
//* route  /product/:id/review/:id
//* access Private
const updateReview = (req, res) => {}

//* desc   Delete review 
//* route  /product/:id/review/:id
//* access Private
const deleteReview = (req, res) => {}

//* desc   Get top product
//* route  GET /rating/top-product
//* access Public
const getTopProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
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

module.exports = {
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
};
