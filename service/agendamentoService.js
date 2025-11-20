const agendamentoModel = require('../model/agendamentoModel');
const barbeiroModel = require('../model/barbeiroModel');

exports.create = (barbeiroId, data) => agendamentoModel.create(barbeiroId, data);
exports.list = (barbeiroId, data) => agendamentoModel.list(barbeiroId, data);
