const chai = require('chai');
const supertest = require('supertest');
const app = require('../index');

const expect = chai.expect;
const request = supertest(app);

describe('API de Autenticação', () => {
    let request;
  
    before(() => {
      request = supertest(app);
    });
  
    it('Deve criar um novo usuário ao fazer signup', async () => {
      const res = await request
        .post('/signup')
        .send({
          nome: 'Novo Usuário',
          email: 'novousuario@example.com',
          senha: 'senha123',
          telefone: [{ numero: '123456789', ddd: '11' }]
        });
  
      chai.expect(res.status).to.equal(201);
      chai.expect(res.body).to.have.property('id');
      chai.expect(res.body).to.have.property('data_criacao');
      chai.expect(res.body).to.have.property('data_atualizacao');
      chai.expect(res.body).to.have.property('ultimo_login');
      chai.expect(res.body).to.have.property('token');
    });
  
    it('Deve autenticar um usuário ao fazer signin', async () => {
      const res = await request
        .post('/signin')
        .send({
          email: 'novousuario@example.com',
          senha: 'senha123'
        });
  
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.have.property('id');
      chai.expect(res.body).to.have.property('data_criacao');
      chai.expect(res.body).to.have.property('data_atualizacao');
      chai.expect(res.body).to.have.property('ultimo_login');
      chai.expect(res.body).to.have.property('token');
    });
  
    it('Deve retornar erro ao tentar signup com e-mail existente', async () => {
      const res = await request
        .post('/signup')
        .send({
          nome: 'Novo Usuário',
          email: 'novousuario@example.com',
          senha: 'senha123',
          telefone: [{ numero: '123456789', ddd: '11' }]
        });
  
      chai.expect(res.status).to.equal(400);
      chai.expect(res.body).to.have.property('mensagem');
      chai.expect(res.body.mensagem).to.equal('E-mail já existente');
    });
  
    it('Deve retornar erro ao tentar signin com credenciais inválidas', async () => {
      const res = await request
        .post('/signin')
        .send({
          email: 'novousuario@example.com',
          senha: 'senha_errada'
        });
  
      chai.expect(res.status).to.equal(401);
      chai.expect(res.body).to.have.property('mensagem');
      chai.expect(res.body.mensagem).to.equal('Usuário e/ou senha inválidos');
    });
  });