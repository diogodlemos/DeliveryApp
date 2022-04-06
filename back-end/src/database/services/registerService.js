const { user } = require("../models");
const errorContructor = require("../utils/functions/errorContructor");
const { registerSchema } = require("../utils/schemas");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const JWT_SECRET = "secret_key";

const jwtConfig = {
  expiresIn: "7D",
  algorithm: "HS256",
};

const registerUserService = async (name, email, password, role = 'customer') => {
  const { error } = registerSchema.validate({
    name,
    email,
    password,
  });

  if (error) throw errorContructor(401, error.message);

  const nameExists = await user.findOne({ where: { name } });
  const emailExists = await user.findOne({ where: { email } });

  if (
    (emailExists && emailExists.dataValues.email === email) ||
    (nameExists && nameExists.dataValues.name === name)
  ) {
    throw errorContructor(409, "User already exists");
  }

  const newUser = await user.create({
    name,
    email,
    password: md5(password),
    role,
  });

  const { id: dbId, email: dbEmail, role: dbRole } = newUser.dataValues;

  const token = jwt.sign(
    { data: { email: dbEmail, role: dbRole } },
    JWT_SECRET,
    jwtConfig
  );

  return { id: dbId, name, email: dbEmail, role: dbRole, token };
};

const getAll = async () => {
  const users = await user.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
};

module.exports = {
  registerUserService,
  getAll,
};
