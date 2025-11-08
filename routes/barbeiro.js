const express = require('express');
const barbeiroController = require('../controllers/barbeiroController');
const { authMiddleware } = require('../service/authService');

const router = express.Router();

router.post('/register', barbeiroController.register);
router.post('/login', barbeiroController.login);
router.get('/me', authMiddleware, barbeiroController.getProfile);

module.exports = router;
