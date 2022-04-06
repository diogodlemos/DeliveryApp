const { saleProduct } = require("../models");
const { saleProductSchema } = require("../utils/schemas");
const errorContructor = require("../utils/functions/errorContructor");

const create = async (saleItens) => {
  const { error } = saleProductSchema.validate(saleItens);

  if (error) throw errorContructor(400, error.message);

  const newSaleProduct = await saleProduct.create(saleItens);

  return newSaleProduct;
};

const getItensBySaleId = async (id) => {
  const itens = await saleProduct.findAll({ where: { saleId: id } });

  if (!itens) throw errorContructor(404, "Itens not found!");

  return itens;
};

module.exports = {
  create,
  getItensBySaleId,
};
