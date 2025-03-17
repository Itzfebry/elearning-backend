const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

// Mendapatkan semua user
router.get('/', usersController.getAllUsers);

// Mendapatkan user berdasarkan ID
router.get('/:id', usersController.getUserById);

// Membuat user baru
router.post('/', usersController.createUser);

// Mengupdate user
router.put('/:id', usersController.updateUser);

// Menghapus user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
