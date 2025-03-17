const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    url: { 
        type: String, 
        required: true, 
        trim: true, 
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?[\w-./?%&=]*)$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'MataPelajaran', required: true }, // Referensi ke mata pelajaran
}, { timestamps: true }); // Otomatis menambahkan createdAt & updatedAt

module.exports = mongoose.model('Video', VideoSchema);
