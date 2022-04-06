const ProductService = require("../services/productService");

const createProduct = async (req, res, next) => {
  try {
    const product = await ProductService.createProduct(req.body);
    return res.status(201).json({ product });
  } catch (error) {
    console.error(`POST CREATE_PRODUCT -> ${error.message}`);
    return next(error);
  }
};

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(`GET ALL_PRODUCTS -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
