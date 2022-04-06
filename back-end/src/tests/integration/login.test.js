const frisby = require('frisby');
const chai = require('chai');
const shell = require('shelljs');
const chaiHttp = require('chai-http');
require('dotenv').config();

const url = `http://localhost:${process.env.PORT }`;
const should = chai.should();
chai.use(chaiHttp);

describe('Login - Sua aplicação deve ter o endpoint POST `/login`', () => {
  before(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível logar um usuário com sucesso', async () => {
    await frisby
    .post(`${url}/register`,
    {
      "name": "Alexsander Rodrigues",
      "email": "alexsander@gmail.com",
      "password": "senh@123"
    })

    await frisby
      .post(`${url}/login`,
      {
        email: "alexsander@gmail.com",
        password: "senh@123"
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const json = JSON.parse(body);
        json.id.should.be.eql(4);
        json.name.should.be.eql("Alexsander Rodrigues");
        json.email.should.be.eql("alexsander@gmail.com");
        json.role.should.be.eql("customer");
        json.should.have.property('token');
      });
  });
  it('Será validado que não é possível logar um usuário sem o campo email', async () => {
    await frisby
      .post(`${url}/login`,
      {
        password: "a4c86edecc5aee0senhaDoAlexsander6eff8fdeda69e0d04"
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const json = JSON.parse(body);
        json.message.should.be.eql('"email" is required');
      });
  });
  it('Será validado que não é possível logar um usuário sem o campo password', async () => {
    await frisby
      .post(`${url}/login`,
      {
        email: "alexsander@gmail.com"
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const json = JSON.parse(body);
        json.message.should.be.eql('"password" is required');
      });
  });
});