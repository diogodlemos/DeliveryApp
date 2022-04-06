const { Op } = require("sequelize");
const { sale } = require("../models");
const { saleSchema } = require("../utils/schemas");
const errorContructor = require("../utils/functions/errorContructor");

const create = async (saleInfo) => {
  const { error } = saleSchema.validate(saleInfo);

  if (error) throw errorContructor(400, error.message);

  const newSale = await sale.create(saleInfo);

  return newSale;
};

const getById = async (id) => {
  const saleItem = await sale.findByPk(id);

  if (!saleItem) throw errorContructor(404, "Sale not found!");

  return saleItem;
};

const getAllSales = async (id) => {
  const sales = await sale.findAll({
    where: { [Op.or]: [{ sellerId: id }, { userId: id }] },
  });

  if (!sales) throw errorContructor(404, "Sales not found!");

  return sales;
};

const updateStatus = async (checkStatus, status, id, role) => {
  if (role === 'seller' && checkStatus) {
    await sale.update({ status }, { where: { id } });
  }

  if (role === 'customer' && status === 'Entregue') {
    await sale.update({ status }, { where: { id } });
  }

  const order = await sale.findByPk(id);

  return order;
};

module.exports = {
  create,
  getById,
  getAllSales,
  updateStatus
};
