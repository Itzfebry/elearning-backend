const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videosControllers');

// Mendapatkan semua video
router.get('/', videoController.getAllVideos);

// Mendapatkan video berdasarkan ID
router.get('/:id', videoController.getVideoById);

// Membuat video baru
router.post('/', videoController.createVideo);

// Memperbarui video berdasarkan ID
router.put('/:id', videoController.updateVideo);

// Menghapus video berdasarkan ID
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
