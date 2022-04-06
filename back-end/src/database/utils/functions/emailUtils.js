const { user } = require('../../models');
const erroContructor = require('./errorContructor');

const findByEmail = async (email) => {
  const findUser = await user.findOne({ where: { email } });
  if (!findUser) throw erroContructor(404, "user not found");

  return findUser.dataValues;
};

module.exports = {
  findByEmail
};