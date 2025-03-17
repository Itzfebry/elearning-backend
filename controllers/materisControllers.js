const Materi = require('../models/materis');

// Mendapatkan semua materi
exports.getAllMateri = async (req, res) => {
  try {
    const materi = await Materi.find().populate('kelas_matapelajaran_id', 'nama');
    res.status(200).json(materi);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan materi berdasarkan ID
exports.getMateriById = async (req, res) => {
  try {
    const materi = await Materi.findById(req.params.id).populate('kelas_matapelajaran_id', 'nama');
    if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });
    
    res.status(200).json(materi);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Membuat materi baru
exports.createMateri = async (req, res) => {
  try {
    const { judul, deskripsi, file_url, file_type, file_size, kelas_matapelajaran_id, is_published } = req.body;

    const materi = new Materi({ judul, deskripsi, file_url, file_type, file_size, kelas_matapelajaran_id, is_published });
    await materi.save();

    res.status(201).json({ message: 'Materi berhasil dibuat', materi });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Memperbarui materi
exports.updateMateri = async (req, res) => {
  try {
    const { judul, deskripsi, file_url, file_type, file_size, kelas_matapelajaran_id, is_published } = req.body;

    const materi = await Materi.findById(req.params.id);
    if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });

    materi.judul = judul || materi.judul;
    materi.deskripsi = deskripsi || materi.deskripsi;
    materi.file_url = file_url || materi.file_url;
    materi.file_type = file_type || materi.file_type;
    materi.file_size = file_size || materi.file_size;
    materi.kelas_matapelajaran_id = kelas_matapelajaran_id || materi.kelas_matapelajaran_id;
    materi.is_published = is_published !== undefined ? is_published : materi.is_published;

    await materi.save();

    res.status(200).json({ message: 'Materi berhasil diperbarui', materi });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menghapus materi
exports.deleteMateri = async (req, res) => {
  try {
    const materi = await Materi.findByIdAndDelete(req.params.id);
    if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });

    res.status(200).json({ message: 'Materi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
