const mongoose = require('mongoose');
const tugasSiswaSchema = new mongoose.Schema({
  tugas_guru_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TugasGuru', 
    required: true 
  }, // Tugas dari guru
  siswa_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Siswa yang mengumpulkan tugas
  file_url: { type: String }, // File opsional
  komentar: { type: String },
  status: { 
    type: String, 
    enum: ['menunggu', 'dikirim', 'dinilai'], 
    default: 'menunggu' 
  }, // Status tugas
  nilai: { type: Number, min: 0, max: 100 }, // Nilai tugas
  feedback: { type: String }, // Umpan balik dari guru
  submitted_at: { type: Date }, // Waktu pengumpulan
  graded_at: { type: Date } // Waktu dinilai
}, { collection: 'tugas_siswas', timestamps: true });



module.exports = mongoose.model('TugasSiswa', tugasSiswaSchema);
