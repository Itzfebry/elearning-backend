const express = require('express');
const router = express.Router();
const diskusiController = require('../controllers/diskusisControllers');

// Membuat diskusi baru
router.post('/', diskusiController.createDiskusi);

// Mendapatkan semua diskusi dalam suatu kelas mata pelajaran
router.get('/kelas/:kelas_matapelajaran_id', diskusiController.getDiskusiByKelasMataPelajaran);

// Mendapatkan detail diskusi berdasarkan ID
router.get('/:id', diskusiController.getDiskusiById);

// Mengupdate diskusi (hanya user yang membuat bisa mengedit)
router.put('/:id', diskusiController.updateDiskusi);

// Menghapus diskusi (hanya pemilik yang bisa menghapus)
router.delete('/:id', diskusiController.deleteDiskusi);

module.exports = router;
