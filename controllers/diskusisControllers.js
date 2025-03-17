const Diskusi = require('../models/diskusis');

// Membuat diskusi baru
exports.createDiskusi = async (req, res) => {
  try {
    const { kelas_matapelajaran_id, user_id, pesan, parent_id } = req.body;

    const diskusi = new Diskusi({ kelas_matapelajaran_id, user_id, pesan, parent_id });
    await diskusi.save();

    res.status(201).json({ message: 'Diskusi berhasil dibuat', diskusi });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan semua diskusi dalam suatu kelas mata pelajaran
exports.getDiskusiByKelasMataPelajaran = async (req, res) => {
  try {
    const { kelas_matapelajaran_id } = req.params;

    const diskusi = await Diskusi.find({ kelas_matapelajaran_id })
      .populate('user_id', 'nama')
      .populate('parent_id', 'pesan');

    res.status(200).json(diskusi);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mendapatkan detail diskusi berdasarkan ID
exports.getDiskusiById = async (req, res) => {
  try {
    const diskusi = await Diskusi.findById(req.params.id)
      .populate('user_id', 'nama')
      .populate('parent_id', 'pesan');

    if (!diskusi) return res.status(404).json({ message: 'Diskusi tidak ditemukan' });

    res.status(200).json(diskusi);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Mengupdate diskusi (hanya user yang membuat bisa mengedit)
exports.updateDiskusi = async (req, res) => {
  try {
    const { pesan } = req.body;

    const diskusi = await Diskusi.findById(req.params.id);
    if (!diskusi) return res.status(404).json({ message: 'Diskusi tidak ditemukan' });

    // Pastikan hanya pemilik diskusi yang bisa mengedit
    if (diskusi.user_id.toString() !== req.body.user_id) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengedit diskusi ini' });
    }

    diskusi.pesan = pesan || diskusi.pesan;
    await diskusi.save();

    res.status(200).json({ message: 'Diskusi berhasil diperbarui', diskusi });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// Menghapus diskusi (hanya pemilik yang bisa menghapus)
exports.deleteDiskusi = async (req, res) => {
  try {
    const diskusi = await Diskusi.findById(req.params.id);
    if (!diskusi) return res.status(404).json({ message: 'Diskusi tidak ditemukan' });

    // Pastikan hanya pemilik yang bisa menghapus
    if (diskusi.user_id.toString() !== req.body.user_id) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus diskusi ini' });
    }

    await diskusi.deleteOne();
    res.status(200).json({ message: 'Diskusi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};
