const mongoose = require("mongoose");
const TugasGuru = require("../models/tugas_gurus");
const KelasMataPelajaran = require("../models/kelasmatapelajarans");
const Materi = require("../models/materis");

const seedTugasGuru = async () => {
  try {
    // Ambil semua kelas-mata pelajaran
    const kelasMapelList = await KelasMataPelajaran.find().lean();
    if (kelasMapelList.length === 0) throw new Error("❌ Tidak ada kelas-mata pelajaran ditemukan!");

    // Ambil semua materi yang sudah ada
    const materiList = await Materi.find().lean();
    if (materiList.length === 0) throw new Error("❌ Tidak ada materi ditemukan!");

    let tugasGuruData = [];
    for (const kelasMapel of kelasMapelList) {
      // Cari materi yang sesuai dengan kelas-mata pelajaran
      const materi = materiList.find(m => m.kelas_matapelajaran_id.toString() === kelasMapel._id.toString());

      if (!materi) {
        console.warn(`⚠️ Tidak ada materi yang cocok untuk kelas-mata pelajaran ${kelasMapel._id}`);
        continue;
      }

      tugasGuruData.push({
        kelas_matapelajaran_id: kelasMapel._id,
        materi_id: materi._id,
        judul: `Tugas ${materi.judul} untuk kelas`,
        deskripsi: `Kerjakan tugas ini sesuai dengan petunjuk yang diberikan.`,
        bobot_nilai: Math.floor(Math.random() * 100) + 1, // Nilai acak antara 1-100
        attachment_url: null, // Tidak ada file awalnya
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Tenggat 7 hari dari sekarang
        max_file_size: 5, // Maksimal 5MB
        allowed_file_types: ["pdf", "doc", "ppt"], // Format file yang diperbolehkan
        is_published: true,
      });
    }

    if (tugasGuruData.length === 0) {
      throw new Error("❌ Tidak ada tugas yang bisa di-seed! Pastikan ada kelas-mata pelajaran dan materi yang cocok.");
    }

    await TugasGuru.insertMany(tugasGuruData);
    console.log("✅ Seeder tugas guru berhasil!");
  } catch (error) {
    console.error("❌ Seeder tugas guru gagal:", error);
  }
};

module.exports = seedTugasGuru;
