const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController'); 

router.post('/login', authController.login);

// Pastikan verifyToken sudah terdefinisi sebelum digunakan
router.get('/me', verifyToken, authController.getMe);

module.exports = router;
