require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const agendamentoData = require('../../fixtures/agendamento-servicos.json');
const baseURL = process.env.BASE_URL;

let token;
let barbeiroId;

describe('Agendamento de Serviços', function () {
  before(async function () {
    // Registra e loga barbeiro
    const resReg = await request(baseURL)
      .post('/api/barbeiros/register')
      .send({
        nome: 'Barbeiro Teste',
        cpf: '22233344455',
        email: 'barbeiro@teste.com',
        senha: '12345678',
        telefone: '11988887777'
      });
    barbeiroId = resReg.body.id;
    const resLogin = await request(baseURL)
      .post('/api/barbeiros/login')
      .send({ email: 'barbeiro@teste.com', senha: '12345678' });
    token = resLogin.body.token;
  });

  it('Deve cadastrar agendamento com horário disponível e todos os campos obrigatórios', async function () {
    const res = await request(baseURL)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send(agendamentoData.agendamentoValido);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it.only('Não deve cadastrar agendamento sem todos os campos obrigatórios', async function () {
    const res = await request(baseURL)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send(agendamentoData.agendamentoCamposIncompletos);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('Não deve cadastrar agendamento em horário já ocupado pelo barbeiro', async function () {
    const res = await request(baseURL)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send(agendamentoData.agendamentoConflitoBarbeiro);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('Não deve cadastrar serviço para cliente que já possui agendamento no mesmo horário', async function () {
    const res = await request(baseURL)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send(agendamentoData.agendamentoConflitoCliente);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });
});
