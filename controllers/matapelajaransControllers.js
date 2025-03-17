const MataPelajaran = require('../models/matapelajarans');

// Mendapatkan semua mata pelajaran
exports.getAllMataPelajaran = async (req, res) => {
  try {
    const mataPelajaran = await MataPelajaran.find();
    res.status(200).json(mataPelajaran);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan mata pelajaran berdasarkan ID
exports.getMataPelajaranById = async (req, res) => {
  try {
    const mataPelajaran = await MataPelajaran.findById(req.params.id);
    if (!mataPelajaran) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
    res.status(200).json(mataPelajaran);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Membuat mata pelajaran baru
exports.createMataPelajaran = async (req, res) => {
  try {
    const { name, semester } = req.body;
    const mataPelajaran = new MataPelajaran({ name, semester });
    await mataPelajaran.save();
    res.status(201).json({ message: 'Mata pelajaran berhasil dibuat', mataPelajaran });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mengupdate mata pelajaran
exports.updateMataPelajaran = async (req, res) => {
  try {
    const { name, semester } = req.body;
    const mataPelajaran = await MataPelajaran.findById(req.params.id);
    if (!mataPelajaran) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });

    mataPelajaran.name = name || mataPelajaran.name;
    mataPelajaran.semester = semester || mataPelajaran.semester;

    await mataPelajaran.save();
    res.status(200).json({ message: 'Mata pelajaran berhasil diperbarui', mataPelajaran });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menghapus mata pelajaran
exports.deleteMataPelajaran = async (req, res) => {
  try {
    const mataPelajaran = await MataPelajaran.findByIdAndDelete(req.params.id);
    if (!mataPelajaran) return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan' });
    res.status(200).json({ message: 'Mata pelajaran berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
