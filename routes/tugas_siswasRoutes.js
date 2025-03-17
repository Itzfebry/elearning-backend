const express = require('express');
const router = express.Router();
const tugasSiswaController = require('../controllers/tugas_siswasControllers');

// Mengumpulkan tugas siswa
router.post('/', tugasSiswaController.submitTugasSiswa);

// Mendapatkan semua tugas siswa
router.get('/', tugasSiswaController.getAllTugasSiswa);

// Mendapatkan tugas siswa berdasarkan ID
router.get('/:id', tugasSiswaController.getTugasSiswaById);

// Mendapatkan tugas siswa berdasarkan status (menunggu, dikirim, dinilai)
router.get('/status/:status', tugasSiswaController.getTugasSiswaByStatus);

// Menilai tugas siswa
router.put('/grade/:id', tugasSiswaController.gradeTugasSiswa);

// Menghapus tugas siswa berdasarkan ID
router.delete('/:id', tugasSiswaController.deleteTugasSiswa);

// Mendapatkan statistik tugas siswa
router.get('/stats', tugasSiswaController.getTugasSiswaStatistics);

module.exports = router;
