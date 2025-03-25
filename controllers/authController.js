const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Sesuaikan dengan struktur proyek

exports.login = async (req, res) => {
  const { email, nis, password } = req.body;
  console.log("Request Login:", { email, nis, password }); // Debug input

  try {
    let query = {};
    
    // Buat query berdasarkan input yang diberikan
    if (email) {
      query.email = email;
    } else if (nis) {
      query.nis = nis;
    } else {
      return res.status(400).json({ message: 'Email atau NIS diperlukan' });
    }
    
    // Debug query
    console.log("Query:", query);
    
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    console.log("Data User dari DB:", user); // Debug data user dari database

    if (user.password !== password) {
      console.log("Password Salah: Input =", password, ", DB =", user.password);
      return res.status(400).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, nama: user.nama },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login berhasil',
      user: { id: user._id, role: user.role, nama: user.nama },
      token
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
exports.getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        res.json({
            id: req.user.id,
            role: req.user.role,
            nama: req.user.nama,
        });
    } catch (error) {
        console.error('getMe Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};
