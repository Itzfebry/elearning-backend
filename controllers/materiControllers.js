const mongoose = require('mongoose');

const MateriSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'MataPelajaran', required: true }, // Referensi ke mata pelajaran
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Materi', MateriSchema);
