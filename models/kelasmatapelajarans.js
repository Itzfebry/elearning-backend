const mongoose = require('mongoose');

const kelasMataPelajaranSchema = new mongoose.Schema({
  kelas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kelas', required: true }, 
  mata_pelajaran_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MataPelajaran', required: true }, 
  guru_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { collection: 'kelas_matapelajarans', timestamps: true });

// Virtual field untuk menghitung jumlah materi terkait
kelasMataPelajaranSchema.virtual('materiCount', {
  ref: 'Materi',
  localField: '_id',
  foreignField: 'kelas_matapelajaran_id',
  count: true
});

// Virtual field untuk menghitung jumlah video terkait
kelasMataPelajaranSchema.virtual('videoCount', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'kelas_matapelajaran_id',
  count: true
});

module.exports = mongoose.model('KelasMataPelajaran', kelasMataPelajaranSchema);
