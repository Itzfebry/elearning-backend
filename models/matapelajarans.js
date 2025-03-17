const mongoose = require('mongoose');

const MataPelajaranSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    teacher: { type: String, trim: true },
    materiCount: { type: Number, default: 0 },
    videoCount: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Middleware untuk update otomatis lastUpdated saat save
MataPelajaranSchema.pre('save', function (next) {
    this.lastUpdated = new Date();
    next();
});

// Middleware untuk update lastUpdated saat findByIdAndUpdate
MataPelajaranSchema.pre('findOneAndUpdate', function (next) {
    this.set({ lastUpdated: new Date() });
    next();
});

MataPelajaranSchema.pre('findOneAndDelete', async function (next) {
    const mataPelajaran = this.getQuery();
    await Materi.deleteMany({ subject: mataPelajaran._id });
    await Video.deleteMany({ subject: mataPelajaran._id });
    next();
});

module.exports = mongoose.model('MataPelajaran', MataPelajaranSchema);
