const express = require('express');
const router = express.Router();
const mataPelajaranController = require('../controllers/matapelajaransControllers');

// Mendapatkan semua mata pelajaran
router.get('/', mataPelajaranController.getAllMataPelajaran);

// Mendapatkan mata pelajaran berdasarkan ID
router.get('/:id', mataPelajaranController.getMataPelajaranById);

// Membuat mata pelajaran baru
router.post('/', mataPelajaranController.createMataPelajaran);

// Mengupdate mata pelajaran
router.put('/:id', mataPelajaranController.updateMataPelajaran);

// Menghapus mata pelajaran berdasarkan ID
router.delete('/:id', mataPelajaranController.deleteMataPelajaran);

module.exports = router;
