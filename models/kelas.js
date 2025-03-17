const mongoose = require('mongoose');

const KelasSchema = new mongoose.Schema({
  nama: { type: String, required: true }, // Nama kelas, misalnya "7A"
  deskripsi: { type: String }, // Deskripsi opsional
  wali_kelas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Wali kelas
  tahun_ajaran: { type: String, required: true }, // Contoh: "2024/2025"
  is_active: { type: Boolean, default: true }, // Status kelas
}, { collection: 'kelas', timestamps: true });

module.exports = mongoose.model('Kelas', KelasSchema);
