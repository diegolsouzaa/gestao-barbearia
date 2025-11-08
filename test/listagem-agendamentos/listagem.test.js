require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const listagemData = require('../../fixtures/listagem-agendamentos.json');
const baseURL = process.env.BASE_URL;

let token;

describe('Listagem de Agendamentos', function () {
  before(async function () {
    // Registra e loga barbeiro
    await request(baseURL)
      .post('/api/barbeiros/register')
      .send({
        nome: 'Barbeiro Listagem',
        cpf: '33344455566',
        email: 'listagem@teste.com',
        senha: '12345678',
        telefone: '11977776666'
      });
    const resLogin = await request(baseURL)
      .post('/api/barbeiros/login')
      .send({ email: 'listagem@teste.com', senha: '12345678' });
    token = resLogin.body.token;
    // Cria agendamento
    await request(baseURL)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nomeCliente: 'Cliente Listagem',
        cpfCliente: '99988877766',
        servico: 'Corte',
        data: listagemData.filtroData,
        horario: '09:00'
      });
  });

  it('Deve consultar lista de agendamentos do barbeiro sem filtros', async function () {
    const res = await request(baseURL)
      .get('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('nomeCliente');
    expect(res.body[0]).to.have.property('cpfCliente');
    expect(res.body[0]).to.have.property('servico');
    expect(res.body[0]).to.have.property('horario');
  });

  it('Deve filtrar agendamentos por data', async function () {
    const res = await request(baseURL)
      .get(`/api/agendamentos?data=${listagemData.filtroData}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].data).to.equal(listagemData.filtroData);
  });

  it('Não deve listar agendamentos sem autenticação', async function () {
    const res = await request(baseURL)
      .get('/api/agendamentos');
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('Não deve visualizar agendamentos de outro barbeiro', async function () {
    // Registra outro barbeiro e tenta acessar agendamentos do barbeiro anterior
    await request(baseURL)
      .post('/api/barbeiros/register')
      .send({
        nome: 'Outro Barbeiro',
        cpf: '44455566677',
        email: 'outro@teste.com',
        senha: '12345678',
        telefone: '11966665555'
      });
    const resLogin = await request(baseURL)
      .post('/api/barbeiros/login')
      .send({ email: 'outro@teste.com', senha: '12345678' });
    const outroToken = resLogin.body.token;
    const res = await request(baseURL)
      .get(`/api/agendamentos?data=${listagemData.filtroData}`)
      .set('Authorization', `Bearer ${outroToken}`);
    // Não deve retornar agendamentos do barbeiro anterior
    expect(res.body.every(a => a.nomeCliente !== 'Cliente Listagem')).to.be.true;
  });
});
