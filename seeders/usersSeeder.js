const mongoose = require("mongoose");
const User = require("../models/users");
const Kelas = require("../models/kelas");

const userData = async () => {
  const kelas6A = await Kelas.findOne({ nama: "6A" });
  const kelas6B = await Kelas.findOne({ nama: "6B" });
  const kelas5A = await Kelas.findOne({ nama: "5A" });

  return [
    { nama: "Admin Sekolah", email: "admin@sekolah.com", password: "admin123", role: "admin", nomor_telepon: "08123456789" },
    { nama: "Budi Santoso", email: "budi@guru.com", password: "guru123", role: "guru", nomor_telepon: "08123456780" },
    { nama: "Siti Aminah", email: "siti@guru.com", password: "guru123", role: "guru", nomor_telepon: "08123456781" },
    { nama: "Mokon", email: "mokon@guru.com", password: "guru123", role: "guru", nomor_telepon: "08123456781" },
    { nama: "Joko Prasetyo", email: "joko@siswa.com", password: "siswa123", role: "siswa", kelas_id: kelas6B?._id, nomor_telepon: "08123456783" },
    { nama: "Dewi Lestari", email: "dewi@siswa.com", password: "siswa123", role: "siswa", kelas_id: kelas5A?._id, nomor_telepon: "08123456784" },
  ];
};

const seedUsers = async () => {
  try {
    const users = await userData();
    for (const user of users) {
      await User.updateOne({ email: user.email }, user, { upsert: true });
    }
    console.log("✅ Seeder users berhasil!");
  } catch (error) {
    console.error("❌ Seeder users gagal:", error);
  }
};

module.exports = seedUsers;
