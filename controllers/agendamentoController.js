const agendamentoService = require('../service/agendamentoService');

exports.create = (req, res) => {
  try {
    const agendamento = agendamentoService.create(req.userId, req.body);
    res.status(201).json(agendamento);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  try {
    const agendamentos = agendamentoService.list(req.userId, req.query.data);
    res.status(200).json(agendamentos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
