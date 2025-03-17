const mongoose = require('mongoose');

const tugasGuruSchema = new mongoose.Schema({
  kelas_matapelajaran_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'KelasMataPelajaran', 
    required: true 
  }, // Tugas untuk kelas tertentu
  materi_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Materi', 
    required: true 
  },
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  bobot_nilai: { type: Number, required: true, min: 0, max: 100 }, // Nilai 0-100
  attachment_url: { type: String }, // File opsional
  deadline: { type: Date, required: true },
  max_file_size: { type: Number, required: true }, // Maksimal ukuran file
  allowed_file_types: { 
    type: [String], 
    enum: ['pdf', 'doc', 'ppt', 'zip', 'image', 'video'], 
    required: true 
  }, // Jenis file yang diperbolehkan
  is_published: { type: Boolean, default: false } // Status publikasi tugas
}, { collection: 'tugas_gurus', timestamps: true });

module.exports = mongoose.model('TugasGuru', tugasGuruSchema);
