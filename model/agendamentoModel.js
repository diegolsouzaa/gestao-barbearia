const { v4: uuidv4 } = require('uuid');
const agendamentos = [];

function validateAgendamento(barbeiroId, data) {
  if (!data.nomeCliente || !data.cpfCliente || !data.servico || !data.data || !data.horario) {
    throw { status: 400, message: 'Campos obrigatórios não preenchidos' };
  }
  // Verifica conflito de horário para barbeiro
  if (agendamentos.find(a => a.barbeiroId === barbeiroId && a.data === data.data && a.horario === data.horario)) {
    throw { status: 409, message: 'Horário já ocupado para este barbeiro' };
  }
  // Verifica conflito de horário para cliente
  if (agendamentos.find(a => a.cpfCliente === data.cpfCliente && a.data === data.data && a.horario === data.horario)) {
    throw { status: 409, message: 'Cliente já possui serviço neste horário' };
  }
}

exports.create = (barbeiroId, data) => {
  validateAgendamento(barbeiroId, data);
  const agendamento = { ...data, id: uuidv4(), barbeiroId };
  agendamentos.push(agendamento);
  return agendamento;
};

exports.list = (barbeiroId, data) => {
  let result = agendamentos.filter(a => a.barbeiroId === barbeiroId);
  if (data) {
    result = result.filter(a => a.data === data);
  }
  return result.map(a => ({
    nomeCliente: a.nomeCliente,
    cpfCliente: a.cpfCliente,
    servico: a.servico,
    horario: a.horario,
    data: a.data
  }));
};
