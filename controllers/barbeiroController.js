const barbeiroService = require('../service/barbeiroService');

exports.register = (req, res) => {
  try {
    const barbeiro = barbeiroService.register(req.body);
    res.status(201).json(barbeiro);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const authService = require('../service/authService');

exports.login = (req, res) => {
  try {
    const result = authService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 401).json({ error: err.message });
  }
};

exports.getProfile = (req, res) => {
  try {
    const barbeiro = barbeiroService.getProfile(req.userId);
    res.status(200).json(barbeiro);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
