const mongoose = require('mongoose');

const kelasMataPelajaranSchema = new mongoose.Schema({
  kelas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kelas', required: true }, 
  mata_pelajaran_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MataPelajaran', required: true }, 
  guru_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { collection: 'kelas_matapelajarans', timestamps: true });

kelasMataPelajaranSchema.virtual('materiCount', {
  ref: 'Materi',
  localField: '_id',
  foreignField: 'kelas_matapelajaran_id',
  count: true,
  default: 0,  // Ensure it never returns null
});

kelasMataPelajaranSchema.virtual('videoCount', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'kelas_matapelajaran_id',
  count: true,
  default: 0,  // Ensure it never returns null
});

module.exports = mongoose.model('KelasMataPelajaran', kelasMataPelajaranSchema);
