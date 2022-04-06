const saleRouter = require("express").Router();

const saleController = require("../controllers/saleController");

const auth = require("../middlewares/auth");

saleRouter.get("/:id", auth, saleController.getSaleById);
saleRouter.get("/user/:id", auth, saleController.getSaleByUserId);
saleRouter.post("/", auth, saleController.createSale);

module.exports = saleRouter;
