const mongoose = require("mongoose");
const KelasMataPelajaran = require("../models/kelasmatapelajarans");
const Kelas = require("../models/kelas");
const MataPelajaran = require("../models/matapelajarans");
const User = require("../models/users");

const seedKelasMataPelajaran = async () => {
  try {
    // Tunggu data kelas tersedia
    const kelas6A = await Kelas.findOne({ nama: "6A" }).lean();
    const kelas6B = await Kelas.findOne({ nama: "6B" }).lean();
    const kelas5A = await Kelas.findOne({ nama: "5A" }).lean();

    if (!kelas6A || !kelas6B || !kelas5A) {
      throw new Error("❌ Kelas tidak ditemukan di database!");
    }

    // Tunggu data guru tersedia
    const guru1 = await User.findOne({ nama: "Budi Santoso", role: "guru" }).lean();
    const guru2 = await User.findOne({ nama: "Siti Aminah", role: "guru" }).lean();

    if (!guru1 || !guru2) {
      throw new Error("❌ Guru tidak ditemukan di database!");
    }

    // Tunggu data mata pelajaran tersedia
    const mapel = await MataPelajaran.find().lean();
    if (mapel.length === 0) {
      throw new Error("❌ Mata Pelajaran tidak ditemukan di database!");
    }

    const kelasMataPelajaranData = [
      { kelas_id: kelas6A._id, mata_pelajaran_id: mapel[0]._id, guru_id: guru1._id },
      { kelas_id: kelas6A._id, mata_pelajaran_id: mapel[1]._id, guru_id: guru1._id },
      { kelas_id: kelas6B._id, mata_pelajaran_id: mapel[2]._id, guru_id: guru2._id },
      { kelas_id: kelas5A._id, mata_pelajaran_id: mapel[3]._id, guru_id: guru2._id },
    ];

    for (const data of kelasMataPelajaranData) {
      await KelasMataPelajaran.updateOne(
        { kelas_id: data.kelas_id, mata_pelajaran_id: data.mata_pelajaran_id }, 
        data, 
        { upsert: true }
      );
    }

    console.log("✅ Seeder kelas mata pelajaran berhasil!");
  } catch (error) {
    console.error("❌ Seeder kelas mata pelajaran gagal:", error);
  }
};

module.exports = seedKelasMataPelajaran;
