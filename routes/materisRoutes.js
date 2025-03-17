const express = require('express');
const router = express.Router();
const materiController = require('../controllers/materisControllers');

// Mendapatkan semua materi
router.get('/', materiController.getAllMateri);

// Mendapatkan materi berdasarkan ID
router.get('/:id', materiController.getMateriById);

// Membuat materi baru
router.post('/', materiController.createMateri);

// Mengupdate materi berdasarkan ID
router.put('/:id', materiController.updateMateri);

// Menghapus materi berdasarkan ID
router.delete('/:id', materiController.deleteMateri);

module.exports = router;
