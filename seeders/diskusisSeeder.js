const mongoose = require("mongoose");
const Diskusi = require("../models/diskusis");
const User = require("../models/users");
const KelasMataPelajaran = require("../models/kelasmatapelajarans");

const seedDiskusi = async () => {
  try {
    console.log("🔄 Menjalankan seeder diskusi...");

    // Ambil semua kelas mata pelajaran
    const kelasMataPelajaranList = await KelasMataPelajaran.find().lean();
    if (kelasMataPelajaranList.length === 0) {
      throw new Error("❌ Tidak ada kelas mata pelajaran! Pastikan sudah di-seed.");
    }

    // Ambil semua pengguna (guru dan siswa)
    const users = await User.find({ role: { $in: ["guru", "siswa"] } }).lean();
    if (users.length === 0) {
      throw new Error("❌ Tidak ada pengguna ditemukan! Pastikan user guru & siswa sudah di-seed.");
    }

    let diskusiData = [];

    // Buat beberapa diskusi utama
    kelasMataPelajaranList.forEach((kelas) => {
      const guru = users.find((user) => user._id.toString() === kelas.guru_id.toString());
      if (!guru) return;

      // Guru memulai diskusi
      diskusiData.push({
        kelas_matapelajaran_id: kelas._id,
        user_id: guru._id,
        pesan: `Selamat datang di forum diskusi kelas ${kelas._id}, silakan bertanya!`,
        parent_id: null,
      });

      // Siswa membalas diskusi guru
      const siswaList = users.filter((user) => user.role === "siswa");
      siswaList.forEach((siswa, index) => {
        if (index < 3) {
          diskusiData.push({
            kelas_matapelajaran_id: kelas._id,
            user_id: siswa._id,
            pesan: `Halo Pak/Bu, saya ingin bertanya tentang materi minggu ini.`,
            parent_id: null,
          });
        }
      });
    });

    // Masukkan ke database dengan `upsert`
    for (const diskusi of diskusiData) {
      await Diskusi.updateOne(
        { kelas_matapelajaran_id: diskusi.kelas_matapelajaran_id, user_id: diskusi.user_id, pesan: diskusi.pesan },
        diskusi,
        { upsert: true }
      );
    }

    console.log("✅ Seeder diskusi berhasil!");
  } catch (error) {
    console.error("❌ Seeder diskusi gagal:", error);
  }
};

module.exports = seedDiskusi;
