const express = require("express");
const {
  getAllUsersController,
  deleteUserController,
} = require("../controllers/adminController");

const { registerUserController } = require("../controllers/registerController");

const adminRouter = express.Router();

const auth = require("../middlewares/auth");

adminRouter.post("/", auth, registerUserController);
adminRouter.get("/", getAllUsersController);
adminRouter.delete("/:id", auth, deleteUserController);

module.exports = adminRouter;
