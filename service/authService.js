const jwt = require('jsonwebtoken');
const barbeiroModel = require('../model/barbeiroModel');

const SECRET = 'barbearia_secret';
const BLOCK_TIME = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};

exports.register = (data) => barbeiroModel.register(data);

exports.login = (data) => {
  const barbeiro = barbeiroModel.findByEmail(data.email);
  if (!barbeiro) throw { status: 401, message: 'E-mail ou senha inválidos' };
  if (barbeiro.blockedUntil && Date.now() < barbeiro.blockedUntil) {
    throw { status: 403, message: 'Conta bloqueada. Tente novamente mais tarde.' };
  }
  if (barbeiro.senha !== data.senha) {
    barbeiro.attempts = (barbeiro.attempts || 0) + 1;
    if (barbeiro.attempts >= MAX_ATTEMPTS) {
      barbeiro.blockedUntil = Date.now() + BLOCK_TIME;
      barbeiro.attempts = 0;
      throw { status: 403, message: 'Conta bloqueada por 15 minutos.' };
    }
    throw { status: 401, message: 'E-mail ou senha inválidos' };
  }
  barbeiro.attempts = 0;
  const token = jwt.sign({ id: barbeiro.id }, SECRET, { expiresIn: '2h' });
  return { token };
};

exports.getProfile = (id) => {
  const barbeiro = barbeiroModel.findById(id);
  if (!barbeiro) throw { status: 404, message: 'Barbeiro não encontrado' };
  return barbeiro;
};
