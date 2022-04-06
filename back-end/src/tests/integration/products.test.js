const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

const server = require("../../api/app");

chai.use(chaiHttp);

describe("POST PRODUCTS", () => {
  describe("when it is possible to register a product after login with valid token", () => {
   
    before(async () => {
      await chai.request(server).post("/register").send({
        "name": "Amós Rodrigues",
        "email": "amos@amos.com",
        "password": "senh@123"
      });

      const token = await chai.request(server).post('/login').send({
        "email": "amos@amos.com",
        "password": "senh@123"
      }).then((res) => res.body.token);

      response = await chai
        .request(server)
        .post("/products")
        .send({
          name: 'Skol Lata 250ml',
          price: 2.2,
          urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        })
        .set("authorization", token);
    });

    it("returns status code 201", () => {
      expect(response).to.have.status(201);
    });

    it("returns an object", () => {
      expect(response).to.be.a("object");
    });

    it('the object has the property "product"', () => {
      expect(response.body).to.have.property("product");
    });

    it(`the property "price" returned is equal to 2.2`, async () => {
      expect(response.body.product.price).to.be.equal(2.2);
    });
  });

  describe("when it is not possible to register a product without a valid token", () => {

    before(async () => {

      const token = '';

      response = await chai
        .request(server)
        .post("/products")
        .send({
          name: 'Skol Lata 250ml',
          price: 2.2,
          urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        })
        .set("authorization", token);
    });

    it("returns status code 401", () => {
      expect(response).to.have.status(401);
    });

    it("returns an object", () => {
      expect(response).to.be.a("object");
    });

    it('the object has the property "message"', () => {
      expect(response.body).to.have.property("message");
    });

    it(`the "message" property has the text "Token not found"`, async () => {
      expect(response.body.message).to.be.equal('Token not found');
    });
  });

  describe('when it is not possible to register a product without one of the mandatory fields', () => {

    before(async () => {

      await chai.request(server).post("/register").send({
        name: "Delivery App Admin Teste",
        email: "adm@deliveryappTest02.com",
        password: "123456",
      });

      const token = await chai.request(server).post('/login').send({
        email: "adm@deliveryappTest02.com",
        password: "123456",
      }).then((res) => res.body.token);

      response = await chai
        .request(server)
        .post("/products")
        .send({
          price: 2.2,
          urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        })
        .set("authorization", token);

    });

    it('returns status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('returns an object', () => {
      expect(response).to.be.a('object');
    });

    it('object has the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('the "message" property has the text "name is required""', () => {
      expect(response.body.message).to.be.equal(
        '"name" is required',
      );
    });
  });
});

describe('GET /products', () => {
  describe('when it is possible to consult a list of products', () => {

    before(async () => {
      response = await chai.request(server).get('/products');
    });

    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an array', () => {
      expect(response.body.products).to.be.an('array');
    });

    it('such items have the attributes "id", "name", "price", "url_image", "createdAt" and "updatedAt".', async () => {
      const [item] = response.body.products;

      expect(item).to.include.all.keys(['id', 'name', 'price', 'url_image', 'createdAt', 'updatedAt']);
    });
  });
});