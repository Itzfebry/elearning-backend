const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.generateToken = async (req, res) => {
    const { email, password } = req.body; // Harus dikirim dari body
    
    try {
        // Cek apakah user dengan email ada di database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Cek apakah password cocok
        if (user.password !== password) {
            return res.status(401).json({ message: "Password salah" });
        }

        // Buat payload token yang sesuai dengan user di MongoDB
        const payload = {
            id: user._id,
            name: user.nama, // Menggunakan 'nama' dari MongoDB
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Error saat generate token:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
