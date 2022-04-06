const { user } = require("../models");

const getAllUsersController = async (_req, res, next) => {
  try {
    const users = await user.findAll({});
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await user.destroy({ where: { id } });
    return res.status(204).json(userDeleted);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  deleteUserController,
};
