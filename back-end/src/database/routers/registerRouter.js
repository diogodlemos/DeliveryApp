const express = require("express");
const {
  registerUserController,
  getAllUsers,
} = require("../controllers/registerController");

const auth = require("../middlewares/auth");

const registerRouter = express.Router();

registerRouter.get("/", auth, getAllUsers);
registerRouter.post("/", registerUserController);

module.exports = registerRouter;
