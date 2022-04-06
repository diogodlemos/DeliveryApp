const express = require('express');
const {
  getLoginController,
} = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', getLoginController);

module.exports = loginRouter;