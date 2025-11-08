const { v4: uuidv4 } = require('uuid');
const barbeiros = [];

function validateBarbeiro(data) {
  if (!data.nome || !data.cpf || !data.email || !data.senha || !data.telefone) {
    throw { status: 400, message: 'Campos obrigatórios não preenchidos' };
  }
  if (data.senha.length < 8) {
    throw { status: 400, message: 'Senha deve ter no mínimo 8 caracteres' };
  }
  if (barbeiros.find(b => b.email === data.email)) {
    throw { status: 409, message: 'E-mail já cadastrado' };
  }
  if (barbeiros.find(b => b.cpf === data.cpf)) {
    throw { status: 409, message: 'CPF já cadastrado' };
  }
}

exports.register = (data) => {
  validateBarbeiro(data);
  const barbeiro = { ...data, id: uuidv4(), attempts: 0 };
  barbeiros.push(barbeiro);
  return barbeiro;
};

exports.findByEmail = (email) => barbeiros.find(b => b.email === email);
exports.findById = (id) => barbeiros.find(b => b.id === id);
