const express = require('express');
const router = express.Router();
const kelasMataPelajaranController = require('../controllers/kelasmatapelajaransControllers');
const { verifyToken } = require('../middleware/authMiddleware');
// Mendapatkan semua data kelas-mata pelajaran


router.get('/kelas/:kelasId', kelasMataPelajaranController.getMataPelajaranByKelas);

router.get('/', verifyToken, kelasMataPelajaranController.getAllKelasMataPelajaran);

// Mendapatkan kelas-mata pelajaran berdasarkan ID
router.get('/:id', kelasMataPelajaranController.getKelasMataPelajaranById);

// Membuat kelas-mata pelajaran baru
router.post('/', kelasMataPelajaranController.createKelasMataPelajaran);

// Mengupdate kelas-mata pelajaran berdasarkan ID
router.put('/:id', kelasMataPelajaranController.updateKelasMataPelajaran);

// Menghapus kelas-mata pelajaran berdasarkan ID
router.delete('/:id', kelasMataPelajaranController.deleteKelasMataPelajaran);



module.exports = router;
