const mongoose = require("mongoose");
const TugasSiswa = require("../models/tugas_siswas");
const TugasGuru = require("../models/tugas_gurus");
const User = require("../models/users");

const seedTugasSiswa = async () => {
  try {
    // Cari semua tugas yang diberikan oleh guru
    const tugasGuruList = await TugasGuru.find().lean();
    console.log(`📌 Jumlah tugas guru ditemukan: ${tugasGuruList.length}`);

    if (tugasGuruList.length === 0) {
      throw new Error("❌ Tidak ada tugas dari guru! Pastikan tugas guru sudah di-seed.");
    }

    // Cari semua siswa yang akan menerima tugas
    const siswaList = await User.find({ role: "siswa" }).lean();
    console.log(`📌 Jumlah siswa ditemukan: ${siswaList.length}`);

    if (siswaList.length === 0) {
      throw new Error("❌ Tidak ada siswa ditemukan! Pastikan user siswa sudah di-seed.");
    }

    let tugasSiswaData = [];

    for (const tugasGuru of tugasGuruList) {
      for (const siswa of siswaList) {
        tugasSiswaData.push({
          tugas_guru_id: tugasGuru._id,
          siswa_id: siswa._id,
          status: "menunggu",
          nilai: null,
          jawaban: "",
        });
      }
    }

    if (tugasSiswaData.length === 0) {
      throw new Error("❌ Tidak ada tugas siswa yang bisa dimasukkan!");
    }

    // Menggunakan insertMany agar lebih efisien
    await TugasSiswa.insertMany(tugasSiswaData);

    console.log("✅ Seeder tugas siswa berhasil! Data telah ditambahkan ke database.");
  } catch (error) {
    console.error("❌ Seeder tugas siswa gagal:", error);
  }
};

module.exports = seedTugasSiswa;
