const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
chai.use(require('sinon-chai'));

const userModel = require('../../database/models/user');
const saleModel = require('../../database/models/sales');
const productModel = require('../../database/models/products');
// const salesProductModel = require('../../database/models/salesproduct');

describe('Test user model', () => {
  const Model = userModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)('user');

  context('properties', () => {
    ;['id', 'name', 'email', 'password', 'role'].forEach(checkPropertyExists(instance));
  });
});

describe('Test sale model', () => {
  const Model = saleModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)('sale');

  context('properties', () => {
    ;['totalPrice', 'deliveryAdress', 'deliveryNumber', 'status'].forEach(checkPropertyExists(instance));
  });

  // context('check associations', () => {
  //   const OtherModel = productModel(sequelize, dataTypes);
  //   before(() => {
  //     Model.associate({ OtherModel });
  //   });
  //   it('defined a hasMany association with product model', () => {
  //     expect(Model.hasMany).to.have.been.calledWith(OtherModel);
  //   });
  // });
});

describe('Test product model', () => {
  const Model = productModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)('product');

  context('properties', () => {
    ;['name', 'price', 'url_image'].forEach(checkPropertyExists(instance));
  });

  // context('check associations', () => {
  //   const OtherModel = saleModel(sequelize, dataTypes);
  //   before(() => {
  //     Model.associate({ OtherModel })
  //   });
  //   it('defined a hasMany association with product model', () => {
  //     expect(Model.hasMany).to.have.been.calledWith(OtherModel);
  //   })
  // })
});

