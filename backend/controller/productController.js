const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
// @desc    add product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }
  const product = await Product.create({
    user: req.user._id,
    name,
    description,
  });
  res.status(201).json({
    message: "Product added successfully",
    product,
  });
});

// @desc    get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    products,
  });
});

// @desc    get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  res.status(200).json({
    product,
  });
});

// @desc    update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name && !description) {
    res.status(400);
    throw new Error("Please add at least one field");
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {user: req.user._id, name, description },
    { new: true }
  );
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

// @desc    delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
