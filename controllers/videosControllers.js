const Video = require('../models/videos');

// Mendapatkan semua video
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('kelas_matapelajaran_id', 'kelas_id mata_pelajaran_id guru_id');

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan video berdasarkan ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('kelas_matapelajaran_id', 'kelas_id mata_pelajaran_id guru_id');

    if (!video) return res.status(404).json({ message: 'Video tidak ditemukan' });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Membuat video baru
exports.createVideo = async (req, res) => {
  try {
    const { judul, deskripsi, video_url, kelas_matapelajaran_id, is_published } = req.body;

    const video = new Video({ judul, deskripsi, video_url, kelas_matapelajaran_id, is_published });
    await video.save();

    res.status(201).json({ message: 'Video berhasil dibuat', video });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Memperbarui video
exports.updateVideo = async (req, res) => {
  try {
    const { judul, deskripsi, video_url, kelas_matapelajaran_id, is_published } = req.body;

    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video tidak ditemukan' });

    video.judul = judul || video.judul;
    video.deskripsi = deskripsi || video.deskripsi;
    video.video_url = video_url || video.video_url;
    video.kelas_matapelajaran_id = kelas_matapelajaran_id || video.kelas_matapelajaran_id;
    video.is_published = is_published !== undefined ? is_published : video.is_published;

    await video.save();

    res.status(200).json({ message: 'Video berhasil diperbarui', video });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menghapus video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video tidak ditemukan' });

    res.status(200).json({ message: 'Video berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
