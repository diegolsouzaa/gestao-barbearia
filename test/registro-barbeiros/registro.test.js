
require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const registroData = require('../../fixtures/registro-barbeiros.json');

describe('JIRA-0001: Registro de Barbeiros', function () {
  it('Tentar registrar um barbeiro informando todos os campos obrigatórios', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroValido);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.email).to.equal(registroData.barbeiroValido.email);
  });

  it('Tentar registrar um barbeiro sem preencher todos os campos obrigatórios', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroCamposIncompletos);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('Tentar registrar um barbeiro com e-mail já existente', async function () {
    await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroValido);
    const res = await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroEmailDuplicado);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('Tentar registrar um barbeiro com CPF já existente', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroCpfDuplicado);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('Tentar registrar uma senha com menos de 8 caracteres', async function () {
    const res = await request(baseURL)
      .post('/api/barbeiros/register')
      .send(registroData.barbeiroSenhaInvalida);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});

