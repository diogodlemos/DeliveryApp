
const { registerUserService, getAll } = require("../services/registerService");

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await registerUserService(name, email, password, role);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await getAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  registerUserController,
  getAllUsers,
};
