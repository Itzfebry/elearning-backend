const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load konfigurasi dari .env

const userRoutes = require("./routes/usersRoutes");
const mataPelajaransRoutes = require("./routes/matapelajaransRoutes");
const materiRoutes = require("./routes/materisRoutes");
const videoRoutes = require("./routes/videosRoutes");
const tugasGurusRoutes = require("./routes/tugas_gurusRoutes");
const tugasSiswasRoutes = require("./routes/tugas_siswasRoutes");
const kelasRoutes = require("./routes/kelasRoutes");
const diskusiRoutes = require("./routes/diskusisRoutes"); // Tambahkan routes diskusi
const kelasmatapelajaranRoutes = require("./routes/kelasmatapelajaransRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Pastikan env sudah terisi
if (!process.env.JWT_SECRET) {
  console.error("❌ Error: JWT_SECRET tidak ditemukan di .env!");
  process.exit(1);
}

// Koneksi MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {});
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

connectDB(); // Jalankan koneksi database

// Gunakan Routes
app.use("/users", userRoutes);
app.use('/auth', authRoutes);
app.use("/matapelajarans", mataPelajaransRoutes);
app.use("/materis", materiRoutes);
app.use("/videos", videoRoutes);
app.use("/tugas-gurus", tugasGurusRoutes);
app.use("/tugas-siswas", tugasSiswasRoutes);
app.use("/kelas", kelasRoutes);
app.use("/diskusi", diskusiRoutes); // Tambahkan route diskusi
app.use("/kelasmatapelajarans", kelasmatapelajaranRoutes);

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});