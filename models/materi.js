const mongoose = require('mongoose');

const MateriSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'MataPelajaran', required: true }, // Referensi ke mata pelajaran
}, { timestamps: true }); // Otomatis menambahkan createdAt & updatedAt

module.exports = mongoose.model('Materi', MateriSchema);
