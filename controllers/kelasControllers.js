const Kelas = require('../models/kelas');

// Mendapatkan semua kelas
exports.getAllKelas = async (req, res) => {
  try {
    const kelas = await Kelas.find().populate('wali_kelas_id', 'nama email');
    res.status(200).json(kelas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mendapatkan kelas berdasarkan ID
exports.getKelasById = async (req, res) => {
  try {
    const kelas = await Kelas.findById(req.params.id).populate('wali_kelas_id', 'nama email');
    if (!kelas) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    res.status(200).json(kelas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Menambahkan kelas baru
exports.createKelas = async (req, res) => {
  try {
    const { nama, deskripsi, wali_kelas_id, tahun_ajaran, is_active } = req.body;
    const kelas = new Kelas({ nama, deskripsi, wali_kelas_id, tahun_ajaran, is_active });
    await kelas.save();
    res.status(201).json({ message: 'Kelas berhasil dibuat', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mengupdate data kelas
exports.updateKelas = async (req, res) => {
  try {
    const { nama, deskripsi, wali_kelas_id, tahun_ajaran, is_active } = req.body;
    const kelas = await Kelas.findById(req.params.id);
    if (!kelas) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    
    kelas.nama = nama || kelas.nama;
    kelas.deskripsi = deskripsi || kelas.deskripsi;
    kelas.wali_kelas_id = wali_kelas_id || kelas.wali_kelas_id;
    kelas.tahun_ajaran = tahun_ajaran || kelas.tahun_ajaran;
    kelas.is_active = is_active !== undefined ? is_active : kelas.is_active;
    
    await kelas.save();
    res.status(200).json({ message: 'Kelas berhasil diperbarui', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Menghapus kelas berdasarkan ID
exports.deleteKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findByIdAndDelete(req.params.id);
    if (!kelas) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    res.status(200).json({ message: 'Kelas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};