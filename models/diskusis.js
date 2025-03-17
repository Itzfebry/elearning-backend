const mongoose = require('mongoose');

const DiskusiSchema = new mongoose.Schema({
    kelas_matapelajaran_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'KelasMataPelajaran', 
        required: true 
    }, // Mengacu ke kelas tertentu dalam mata pelajaran
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Relasi ke User (Siswa/Guru)
    pesan: { type: String, required: true }, // Isi pesan
    parent_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Diskusi', 
        default: null 
    }, // Jika merupakan balasan dari diskusi lain
}, { collection: 'diskusis', timestamps: true });

module.exports = mongoose.model('Diskusi', DiskusiSchema);
