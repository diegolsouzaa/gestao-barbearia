const express = require('express');
const barbeiroRoutes = require('./barbeiro');
const agendamentoRoutes = require('./agendamento');

const router = express.Router();

router.use('/barbeiros', barbeiroRoutes);
router.use('/agendamentos', agendamentoRoutes);

module.exports = router;
