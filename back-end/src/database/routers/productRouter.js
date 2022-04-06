const productRouter = require("express").Router();

const productController = require("../controllers/productController");

const auth = require("../middlewares/auth");

productRouter.post("/", auth, productController.createProduct);
productRouter.get("/", productController.getAllProducts);

module.exports = productRouter;
