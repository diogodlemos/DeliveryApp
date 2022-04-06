const express = require("express");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const productRouter = require("./productRouter");
const adminRouter = require("./adminRouter");
const saleRouter = require("./saleRouter");

const routers = express.Router();

routers.use("/login", loginRouter);
routers.use("/register", registerRouter);
routers.use("/products", productRouter);
routers.use("/admin", adminRouter);
routers.use("/sale", saleRouter);

module.exports = routers;
