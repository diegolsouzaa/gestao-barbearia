
require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const loginData = require('../../fixtures/login-barbeiros.json');
const registroData = require('../../fixtures/registro-barbeiros.json');

describe('JIRA-0002: Login de Barbeiros', function () {
  before(async function () {
    // Garante que o barbeiro existe
    await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroValido);
  });

  it('Tentar realizar login com credenciais válidas', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginValido);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('Tentar realizar login com e-mail ou senha incorretos', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginInvalido);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('Tentar realizar login após 5 tentativas inválidas consecutivas', async function () {
    for (let i = 0; i < 5; i++) {
      await request(baseURL)
        .post('/api/barbeiros/login')
        .send(loginData.loginBloqueio);
    }
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginBloqueio);
    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error');
  });

  it('Tentar realizar login durante o período de bloqueio', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/login')
      .send(loginData.loginBloqueio);
    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error');
  });
});

