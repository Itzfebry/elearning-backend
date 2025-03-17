const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    judul: { type: String, required: true }, // Konsisten dengan model lain
    deskripsi: { type: String },
    video_url: { 
        type: String, 
        required: true,
    }, 
    kelas_matapelajaran_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'KelasMataPelajaran', 
        required: true 
    }, // Relasi ke kelas-mata pelajaran
    is_published: { type: Boolean, default: false } // Status publikasi video
}, { collection: 'videos', timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
