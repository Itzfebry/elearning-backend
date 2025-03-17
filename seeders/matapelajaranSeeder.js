const mongoose = require("mongoose");
const MataPelajaran = require("../models/matapelajarans");

const mataPelajaranData = [
  { name: "Matematika", semester: 1 },
  { name: "Bahasa Indonesia", semester: 1 },
  { name: "Ilmu Pengetahuan Alam", semester: 1 },
  { name: "Ilmu Pengetahuan Sosial", semester: 1 },
  { name: "Pendidikan Pancasila", semester: 1 },
  { name: "Seni Budaya", semester: 1 },
];

const seedMataPelajaran = async () => {
  try {
    for (const pelajaran of mataPelajaranData) {
      await MataPelajaran.updateOne({ name: pelajaran.name }, pelajaran, { upsert: true });
    }
    console.log("✅ Seeder mata pelajaran berhasil!");
  } catch (error) {
    console.error("❌ Seeder mata pelajaran gagal:", error);
  }
};

module.exports = seedMataPelajaran;
