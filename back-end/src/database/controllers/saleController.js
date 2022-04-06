const saleService = require("../services/saleService");
const registerService = require("../services/registerService");
const productService = require("../services/productService");
const saleProductService = require("../services/saleProductService");

const createSale = async (req, res, next) => {
  const { sale, products } = req.body;

  try {
    const newSale = await saleService.create(sale);

    await Promise.all(
      products.map(async (product) => {
        const newSaleProduct = await saleProductService.create({
          productId: product.id,
          quantity: product.quantity,
          saleId: newSale.id,
        });
        console.log(newSaleProduct);
      })
    );

    return res.status(201).json({ sale: newSale });
  } catch (error) {
    console.error(`POST CREATE_SALE -> ${error.message}`);
    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getById(id);

    const itens = await saleProductService.getItensBySaleId(id);

    const products = await Promise.all(
      itens.map(async (item) => {
        const product = await productService.getById(item.productId);
        product.dataValues.quantity = item.dataValues.quantity;
        return product;
      })
    );

    const users = await registerService.getAll();
    sale.userId = users.find((user) => sale.userId === user.id);
    sale.sellerId = users.find((user) => sale.sellerId === user.id);

    return res.status(200).json({ sale, products });
  } catch (error) {
    console.error(`GET SALE_BY_ID -> ${error.message}`);
    return next(error);
  }
};

const getSaleByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await saleService.getAllSales(id);

    await Promise.all(
      sales.map(async (sale) => {
        const users = await registerService.getAll();
        sale.userId = users.find((user) => sale.userId === user.id);
        sale.sellerId = users.find((user) => sale.sellerId === user.id);
        return sale;
      })
    );

    return res.status(200).json({ sales });
  } catch (error) {
    console.error(`GET ALL_SALES -> ${error.message}`);
  }
  return next(error);
};

module.exports = {
  createSale,
  getSaleById,
  getSaleByUserId,
};
