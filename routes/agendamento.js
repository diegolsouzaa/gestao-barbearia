const express = require('express');
const agendamentoController = require('../controllers/agendamentoController');
const { authMiddleware } = require('../service/authService');

const router = express.Router();

router.post('/', authMiddleware, agendamentoController.create);
router.get('/', authMiddleware, agendamentoController.list);

module.exports = router;
