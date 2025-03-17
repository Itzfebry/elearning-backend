const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelasControllers');

// Mendapatkan semua kelas
router.get('/', kelasController.getAllKelas);

// Mendapatkan kelas berdasarkan ID
router.get('/:id', kelasController.getKelasById);

// Menambahkan kelas baru
router.post('/', kelasController.createKelas);

// Mengupdate data kelas
router.put('/:id', kelasController.updateKelas);

// Menghapus kelas berdasarkan ID
router.delete('/:id', kelasController.deleteKelas);

module.exports = router;
