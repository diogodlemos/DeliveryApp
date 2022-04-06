const errorContructor = require('../utils/functions/errorContructor');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = 'secret_key';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw errorContructor(401, 'Token not found');
  };
  try {
    const { data } = jwt.verify(token, JWT_SECRET);
    req.user = data;
    return next();
  } catch (error) {
    console.log(error.message);
    error.message = 'Expired or invalid token';
    error.status = 401;
    return next(error);
  }
};