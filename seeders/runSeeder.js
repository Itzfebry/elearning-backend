const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const seedUsers = require("./usersSeeder");
const seedKelas = require("./kelasSeeder");
const seedMataPelajaran = require("./matapelajaranSeeder");
const seedKelasMataPelajaran = require("./kelasmatapelajaranSeeder");
const seedMateri = require("./materisSeeder");
const seedVideos = require("./videosSeeder");
const seedTugasGuru = require("./tugas_gurusSeeder");
const seedTugasSiswa = require("./tugas_siswasSeeder");
const seedDiskusi = require("./diskusisSeeder");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {

    });
    console.log("✅ MongoDB Connected");

    // Pastikan urutan seeding yang benar
    await seedUsers();
    await seedKelas();
    await seedMataPelajaran();
    await seedKelasMataPelajaran();
    await seedMateri();
    await seedVideos();
    await seedTugasGuru();  
    await seedTugasSiswa();
    await seedDiskusi();

    console.log("✅ Semua Seeder Berhasil!");
  } catch (error) {
    console.error("❌ Seeder Gagal:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Koneksi MongoDB Ditutup");
    process.exit();
    }
  }


connectDB();