const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const { authorization } = require("../middleware/authorization");
router.post("/", authorization, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authorization, updateProduct);
router.delete("/:id", authorization, deleteProduct);

module.exports = router;
