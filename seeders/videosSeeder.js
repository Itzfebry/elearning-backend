const mongoose = require("mongoose");
const Video = require("../models/videos");
const KelasMataPelajaran = require("../models/kelasmatapelajarans");

const seedVideos = async () => {
  try {
    const kelasMatematika = await KelasMataPelajaran.findOne().populate("mata_pelajaran_id").lean();
    const kelasBahasaIndonesia = await KelasMataPelajaran.findOne().populate("mata_pelajaran_id").lean();

    if (!kelasMatematika || !kelasBahasaIndonesia) {
      throw new Error("❌ Kelas Mata Pelajaran tidak ditemukan di database!");
    }

    const videosData = [
      {
        judul: "Pengenalan Angka dan Operasi Dasar",
        deskripsi: "Materi dasar matematika untuk memahami angka dan operasi dasar.",
        video_url: "https://example.com/matematika1.mp4",
        kelas_matapelajaran_id: kelasMatematika._id,
        is_published: true,
      },
      {
        judul: "Pengenalan Kata dan Kalimat",
        deskripsi: "Materi bahasa Indonesia tentang dasar pembentukan kata dan kalimat.",
        video_url: "https://example.com/bahasaindonesia1.mp4",
        kelas_matapelajaran_id: kelasBahasaIndonesia._id,
        is_published: true,
      },
    ];

    for (const video of videosData) {
      await Video.updateOne(
        { judul: video.judul },
        { $set: video },
        { upsert: true }
      );
    }

    console.log("✅ Seeder video berhasil!");
  } catch (error) {
    console.error("❌ Seeder video gagal:", error);
  }
};

module.exports = seedVideos;
