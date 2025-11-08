const barbeiroModel = require('../model/barbeiroModel');

exports.register = (data) => barbeiroModel.register(data);
exports.login = (data) => {
	const barbeiro = barbeiroModel.findByEmail(data.email);
	if (!barbeiro || barbeiro.senha !== data.senha) {
		throw { status: 401, message: 'E-mail ou senha inválidos' };
	}
	return barbeiro;
};
exports.getProfile = (id) => barbeiroModel.findById(id);
