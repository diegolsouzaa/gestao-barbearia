require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const loginData = require('../../fixtures/login-barbeiros.json');
const baseURL = process.env.BASE_URL;

let token;

describe('Login de Barbeiros', function () {
  before(async function () {
    // Garante que o barbeiro existe
    await request(baseURL)
      .post('/api/barbeiros/register')
      .send({
        nome: 'Diego Souza',
        cpf: '12345678901',
        email: 'diego@email.com',
        senha: '12345678',
        telefone: '11999999999'
      });
  });

  it('Deve realizar login com credenciais válidas', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginValido);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('Não deve logar com senha inválida', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginInvalido);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('Deve bloquear após 5 tentativas inválidas', async function () {
    for (let i = 0; i < 5; i++) {
      await request(baseURL)
        .post('/api/barbeiros/login')
        .send(loginData.loginInvalido);
    }
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginInvalido);
    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error');
  });
});
