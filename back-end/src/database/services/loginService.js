const errorContructor = require('../utils/functions/errorContructor');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { findByEmail } = require('../utils/functions/emailUtils');
const { loginSchema } = require('../utils/schemas');
const JWT_SECRET = 'secret_key';

const jwtConfig = {
  expiresIn: '7D',
  algorithm: 'HS256',
};

const authLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw errorContructor(400, error.message);
  
  const user = await findByEmail(email);
  if (md5(password) !== user.password) throw errorContructor(400, "Invalid password");

  const { role, name, id  } = user;
  const token = jwt.sign({ data: { email, role } }, JWT_SECRET, jwtConfig);

  return {
    id,
    name,
    email,
    role,
    token,
  };
};

module.exports = {
  authLogin,
}