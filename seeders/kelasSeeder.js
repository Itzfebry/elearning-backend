const mongoose = require("mongoose");
const Kelas = require("../models/kelas");
const User = require("../models/users");

const seedKelas = async () => {
  try {
    // Cari wali kelas berdasarkan nama
    const waliKelas6A = await User.findOne({ nama: "Budi Santoso", role: "guru" }).lean();
    const waliKelas6B = await User.findOne({ nama: "Siti Aminah", role: "guru" }).lean();
    const waliKelas5A = await User.findOne({ nama: "Mokon", role: "guru" }).lean();

    // Pastikan wali kelas ditemukan
    if (!waliKelas6A || !waliKelas6B || !waliKelas5A) {
      throw new Error("❌ Wali kelas tidak ditemukan! Pastikan ada user guru dengan nama yang sesuai.");
    }

    // Data kelas yang akan di-seed
    const kelasData = [
      { nama: "6A", deskripsi: "Kelas 6A Tahun Ajaran 2024/2025", wali_kelas_id: waliKelas6A._id, tahun_ajaran: "2024/2025", is_active: true },
      { nama: "6B", deskripsi: "Kelas 6B Tahun Ajaran 2024/2025", wali_kelas_id: waliKelas6B._id, tahun_ajaran: "2024/2025", is_active: true },
      { nama: "5A", deskripsi: "Kelas 5A Tahun Ajaran 2024/2025", wali_kelas_id: waliKelas5A._id, tahun_ajaran: "2024/2025", is_active: true },
    ];

    for (const kelas of kelasData) {
      await Kelas.updateOne({ nama: kelas.nama }, kelas, { upsert: true });
    }

    console.log("✅ Seeder kelas berhasil!");
  } catch (error) {
    console.error("❌ Seeder kelas gagal:", error);
  }
};

module.exports = seedKelas;
