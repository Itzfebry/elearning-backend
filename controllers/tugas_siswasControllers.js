const TugasSiswa = require('../models/tugas_siswas');

// Mengumpulkan tugas siswa
exports.submitTugasSiswa = async (req, res) => {
  try {
    const tugasSiswa = new TugasSiswa({
      ...req.body,
      status: 'dikirim',
      submitted_at: new Date()
    });

    await tugasSiswa.save();
    res.status(201).json({ message: 'Tugas berhasil dikumpulkan', tugasSiswa });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan semua tugas siswa
exports.getAllTugasSiswa = async (req, res) => {
  try {
    const tugas = await TugasSiswa.find()
      .populate('tugas_guru_id', 'judul')
      .populate('siswa_id', 'nama');

    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan tugas siswa berdasarkan ID
exports.getTugasSiswaById = async (req, res) => {
  try {
    const tugas = await TugasSiswa.findById(req.params.id)
      .populate('tugas_guru_id', 'judul')
      .populate('siswa_id', 'nama');

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Filter tugas siswa berdasarkan status (menunggu, dikirim, dinilai)
exports.getTugasSiswaByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!['menunggu', 'dikirim', 'dinilai'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const tugas = await TugasSiswa.find({ status })
      .populate('tugas_guru_id', 'judul')
      .populate('siswa_id', 'nama');

    res.status(200).json(tugas);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menilai tugas siswa
exports.gradeTugasSiswa = async (req, res) => {
  try {
    const { nilai, feedback } = req.body;
    const tugas = await TugasSiswa.findByIdAndUpdate(
      req.params.id,
      { nilai, feedback, status: 'dinilai', graded_at: new Date() },
      { new: true }
    );

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json({ message: 'Tugas berhasil dinilai', tugas });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Hapus tugas siswa
exports.deleteTugasSiswa = async (req, res) => {
  try {
    const tugas = await TugasSiswa.findByIdAndDelete(req.params.id);

    if (!tugas) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    res.status(200).json({ message: 'Tugas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menampilkan statistik tugas siswa
exports.getTugasSiswaStatistics = async (req, res) => {
  try {
    const totalTugas = await TugasSiswa.countDocuments();
    const tugasMenunggu = await TugasSiswa.countDocuments({ status: 'menunggu' });
    const tugasDikirim = await TugasSiswa.countDocuments({ status: 'dikirim' });
    const tugasDinilai = await TugasSiswa.countDocuments({ status: 'dinilai' });

    res.status(200).json({
      total_tugas_siswa: totalTugas,
      tugas_menunggu: tugasMenunggu,
      tugas_dikirim: tugasDikirim,
      tugas_dinilai: tugasDinilai
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
