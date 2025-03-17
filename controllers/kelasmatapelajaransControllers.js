const KelasMataPelajaran = require('../models/kelasmatapelajarans');

// Mendapatkan semua data kelas-mata pelajaran
exports.getAllKelasMataPelajaran = async (req, res) => {
  try {
    const data = await KelasMataPelajaran.find()
      .populate('kelas_id', 'nama tahun_ajaran')
      .populate('mata_pelajaran_id', 'name semester')
      .populate('guru_id', 'nama email')
      .populate('materiCount') // Hitung jumlah materi
      .populate('videoCount'); // Hitung jumlah video

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan kelas-mata pelajaran berdasarkan ID
exports.getKelasMataPelajaranById = async (req, res) => {
  try {
    const data = await KelasMataPelajaran.findById(req.params.id)
      .populate('kelas_id', 'nama tahun_ajaran')
      .populate('mata_pelajaran_id', 'name semester')
      .populate('guru_id', 'nama email')
      .populate('materiCount')
      .populate('videoCount');

    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Membuat kelas-mata pelajaran baru
exports.createKelasMataPelajaran = async (req, res) => {
  try {
    const { kelas_id, mata_pelajaran_id, guru_id } = req.body;

    const data = new KelasMataPelajaran({ kelas_id, mata_pelajaran_id, guru_id });
    await data.save();

    res.status(201).json({ message: 'Data berhasil dibuat', data });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Memperbarui kelas-mata pelajaran
exports.updateKelasMataPelajaran = async (req, res) => {
  try {
    const { kelas_id, mata_pelajaran_id, guru_id } = req.body;

    const data = await KelasMataPelajaran.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

    data.kelas_id = kelas_id || data.kelas_id;
    data.mata_pelajaran_id = mata_pelajaran_id || data.mata_pelajaran_id;
    data.guru_id = guru_id || data.guru_id;

    await data.save();

    res.status(200).json({ message: 'Data berhasil diperbarui', data });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menghapus kelas-mata pelajaran
exports.deleteKelasMataPelajaran = async (req, res) => {
  try {
    const data = await KelasMataPelajaran.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
