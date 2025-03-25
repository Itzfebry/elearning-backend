const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'guru', 'siswa'], required: true },
  nis: { 
    type: String, 
    unique: true,
    sparse: true, 
    required: function () { return this.role === 'siswa'; } // Wajib untuk siswa
  },
  kelas_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Kelas', 
    required: function () { return this.role === 'siswa'; } // Wajib untuk siswa
  },
  tanggal_bergabung: { type: Date, default: Date.now },
  status: { type: String, enum: ['aktif', 'nonaktif'], default: 'aktif' },
  profil_gambar: { type: String, default: null },
  nomor_telepon: { type: String, required: true }
}, { timestamps: true });

// Middleware untuk validasi sebelum save
userSchema.pre('save', function(next) {
  if (this.role === 'siswa' && (!this.nis || !this.kelas_id)) {
    return next(new Error('NIS dan Kelas wajib diisi untuk siswa'));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
