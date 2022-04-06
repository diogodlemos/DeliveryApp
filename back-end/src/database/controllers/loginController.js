const {
  authLogin,
} = require('../services/loginService');

const getLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await authLogin(email, password);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  getLoginController,
};