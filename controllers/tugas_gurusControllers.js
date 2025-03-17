const TugasGuru = require('../models/tugas_gurus');

// Membuat tugas baru
exports.createTugasGuru = async (req, res) => {
  try {
    const tugas = new TugasGuru(req.body);
    await tugas.save();
    res.status(201).json({ message: 'Tugas berhasil dibuat', tugas });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan semua tugas
exports.getAllTugas = async (req, res) => {
  try {
    const tugas = await TugasGuru.find()
      .populate('kelas_matapelajaran_id', 'kelas_id mata_pelajaran_id')
      .populate('materi_id', 'judul');
    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan tugas berdasarkan ID
exports.getTugasById = async (req, res) => {
  try {
    const tugas = await TugasGuru.findById(req.params.id)
      .populate('kelas_matapelajaran_id', 'kelas_id mata_pelajaran_id')
      .populate('materi_id', 'judul');

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Filter tugas berdasarkan kelas/mata pelajaran
exports.getTugasByKelas = async (req, res) => {
  try {
    const { kelas_matapelajaran_id } = req.params;
    const tugas = await TugasGuru.find({ kelas_matapelajaran_id })
      .populate('kelas_matapelajaran_id', 'kelas_id mata_pelajaran_id')
      .populate('materi_id', 'judul');

    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Update tugas yang sudah dibuat oleh guru
exports.updateTugasGuru = async (req, res) => {
  try {
    const tugas = await TugasGuru.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json({ message: 'Tugas berhasil diperbarui', tugas });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Hapus tugas
exports.deleteTugasGuru = async (req, res) => {
  try {
    const tugas = await TugasGuru.findByIdAndDelete(req.params.id);

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json({ message: 'Tugas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menampilkan statistik tugas
exports.getTugasStatistics = async (req, res) => {
  try {
    const totalTugas = await TugasGuru.countDocuments();
    const tugasPublished = await TugasGuru.countDocuments({ is_published: true });
    const tugasUnpublished = await TugasGuru.countDocuments({ is_published: false });

    res.status(200).json({
      total_tugas: totalTugas,
      tugas_dipublikasikan: tugasPublished,
      tugas_tidak_dipublikasikan: tugasUnpublished
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
