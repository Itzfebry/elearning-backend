const express = require('express');
const router = express.Router();
const tugasGuruController = require('../controllers/tugas_gurusControllers');

// Membuat tugas baru
router.post('/', tugasGuruController.createTugasGuru);

// Mendapatkan semua tugas
router.get('/', tugasGuruController.getAllTugas);

// Mendapatkan tugas berdasarkan ID
router.get('/:id', tugasGuruController.getTugasById);

// Mendapatkan tugas berdasarkan kelas/mata pelajaran
router.get('/kelas/:kelas_matapelajaran_id', tugasGuruController.getTugasByKelas);

// Memperbarui tugas berdasarkan ID
router.put('/:id', tugasGuruController.updateTugasGuru);

// Menghapus tugas berdasarkan ID
router.delete('/:id', tugasGuruController.deleteTugasGuru);

// Mendapatkan statistik tugas
router.get('/stats', tugasGuruController.getTugasStatistics);

module.exports = router;
