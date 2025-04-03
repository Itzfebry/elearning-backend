const mongoose = require('mongoose');
const KelasMataPelajaran = require('../models/kelasmatapelajarans');
const Materi = require('../models/materis');
const Video = require('../models/videos');

// Mendapatkan semua data kelas-mata pelajaran dengan jumlah materi & video
exports.getAllKelasMataPelajaran = async (req, res) => {
  try {
    const data = await KelasMataPelajaran.aggregate([
      {
        $lookup: {
          from: "kelas", 
          localField: "kelas_id",
          foreignField: "_id",
          as: "kelas"
        }
      },
      { $unwind: "$kelas" },
      {
        $lookup: {
          from: "matapelajarans", 
          localField: "mata_pelajaran_id",
          foreignField: "_id",
          as: "mataPelajaran"
        }
      },
      { $unwind: "$mataPelajaran" },
      {
        $lookup: {
          from: "users",
          localField: "guru_id",
          foreignField: "_id",
          as: "guru"
        }
      },
      { $unwind: "$guru" },
      {
        $lookup: {
          from: "materis",
          localField: "_id",
          foreignField: "kelas_matapelajaran_id",
          as: "materiList"
        }
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "kelas_matapelajaran_id",
          as: "videoList"
        }
      },
      {
        $project: {
          _id: 1,
          kelas: "$kelas.nama",
          tahunAjaran: "$kelas.tahun_ajaran",
          mataPelajaran: "$mataPelajaran.name",
          semester: "$mataPelajaran.semester",
          guru: "$guru.nama",
          materiCount: { $size: "$materiList" },
          videoCount: { $size: "$videoList" }
        }
      }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// Mendapatkan kelas-mata pelajaran berdasarkan ID
exports.getKelasMataPelajaranById = async (req, res) => {
  try {
    const data = await KelasMataPelajaran.findById(req.params.id)
      .populate('kelas_id', 'nama tahun_ajaran')
      .populate('mata_pelajaran_id', 'name semester')
      .populate('guru_id', 'nama email');

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

    const data = await KelasMataPelajaran.findByIdAndUpdate(
      req.params.id,
      { kelas_id, mata_pelajaran_id, guru_id },
      { new: true } // Mengembalikan data yang sudah diperbarui
    );

    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

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

// Mendapatkan mata pelajaran berdasarkan kelas tertentu
exports.getMataPelajaranByKelas = async (req, res) => {
  try {
    const kelasId = req.params.kelasId.trim();
    
    if (!mongoose.Types.ObjectId.isValid(kelasId)) {
      return res.status(400).json({ message: 'kelasId tidak valid' });
    }

    const data = await KelasMataPelajaran.find({ kelas_id: kelasId })
      .populate('kelas_id', 'nama tahun_ajaran')
      .populate('mata_pelajaran_id', 'name semester')
      .populate('guru_id', 'nama email');

    if (!data.length) {
      return res.status(404).json({ message: 'Mata pelajaran tidak ditemukan untuk kelas ini' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};


// 🛡️ Middleware untuk menangani validasi user & role secara aman
exports.getKelasMataPelajaran = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    let data;
    if (user.role === 'siswa') {
      data = await getKelasMataPelajaranForSiswa(user.kelas_id);
    } else if (user.role === 'guru') {
      data = await getKelasMataPelajaranForGuru(userId);
    } else if (user.role === 'admin') {
      data = await getAllKelasMataPelajaranForAdmin();
    } else {
      return res.status(403).json({ message: 'Role tidak valid' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }
};

// 🏫 Get Mata Pelajaran untuk SISWA
const getKelasMataPelajaranForSiswa = async (kelasId) => {
  return await KelasMataPelajaran.aggregate([
    { $match: { kelas_id: new mongoose.Types.ObjectId(kelasId) } },
    { $lookup: { from: 'materis', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'materis' } },
    { $lookup: { from: 'videos', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'videos' } },
    { $project: { _id: 1, mataPelajaran: "$mata_pelajaran_id", jumlahMateri: { $size: "$materis" }, jumlahVideo: { $size: "$videos" } } }
  ]);
};

// 👨‍🏫 Get Mata Pelajaran untuk GURU
const getKelasMataPelajaranForGuru = async (guruId) => {
  return await KelasMataPelajaran.aggregate([
    { $match: { guru_id: new mongoose.Types.ObjectId(guruId) } },
    { $lookup: { from: 'materis', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'materis' } },
    { $lookup: { from: 'videos', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'videos' } },
    { $project: { _id: 1, mataPelajaran: "$mata_pelajaran_id", jumlahMateri: { $size: "$materis" }, jumlahVideo: { $size: "$videos" } } }
  ]);
};

// 🛠️ Get Semua Mata Pelajaran untuk ADMIN
const getAllKelasMataPelajaranForAdmin = async () => {
  return await KelasMataPelajaran.aggregate([
    {
      $lookup: { from: 'kelas', localField: 'kelas_id', foreignField: '_id', as: 'kelas' }
    },
    { $unwind: "$kelas" },
    {
      $lookup: { from: 'users', localField: 'guru_id', foreignField: '_id', as: 'guru' }
    },
    { $unwind: "$guru" },
    {
      $lookup: { from: 'materis', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'materis' }
    },
    {
      $lookup: { from: 'videos', localField: '_id', foreignField: 'kelas_matapelajaran_id', as: 'videos' }
    },
    {
      $project: {
        _id: 1,
        kelas: "$kelas.nama",
        guru: "$guru.nama",
        jumlahMateri: { $size: "$materis" },
        jumlahVideo: { $size: "$videos" }
      }
    }
  ]);
};