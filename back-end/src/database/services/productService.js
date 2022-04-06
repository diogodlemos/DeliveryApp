const { productSchema } = require("../utils/schemas");
const errorConstructor = require("../utils/functions/errorContructor");

const { product } = require("../models");

const createProduct = async (payload) => {
  const { error } = productSchema.validate(payload);

  if (error) throw errorConstructor(400, error.message);

  const newProduct = await product.create(payload);

  return newProduct;
};

const getAllProducts = async () => {
  const products = await product.findAll({});

  if (!products) throw errorConstructor(404, "Products not found");

  return products;
};

const getById = async (id) => {
  const productItem = await product.findByPk(id);

  if (!productItem) throw errorConstructor(404, "Product not found");

  return productItem;
};

module.exports = {
  createProduct,
  getAllProducts,
  getById,
};
