const mongoose = require('mongoose');

const MateriSchema = new mongoose.Schema({
    judul: { type: String, required: true }, // Konsisten dengan Video
    deskripsi: { type: String },
    file_url: { type: String, required: true }, // Link file (PDF/DOC)
    file_type: { 
        type: String, 
        enum: ['pdf', 'doc', 'ppt', 'zip', 'image', 'video', 'other'], 
        required: true 
    }, // Jenis file lebih fleksibel
    file_size: { type: Number, required: true }, // Ukuran file dalam KB atau MB
    kelas_matapelajaran_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'KelasMataPelajaran', 
        required: true 
    }, // Relasi ke kelas-mata pelajaran
    is_published: { type: Boolean, default: false } // Status publikasi materi
}, { collection: 'materis', timestamps: true });

module.exports = mongoose.model('Materi', MateriSchema);
