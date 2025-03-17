const User = require('../models/users');

// Mendapatkan semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('kelas_id', 'nama');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mendapatkan user berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('kelas_id', 'nama');
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Membuat user baru tanpa hashing password
exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role, kelas_id, nomor_telepon } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });
    
    const user = new User({ nama, email, password, role, kelas_id, nomor_telepon });
    await user.save();
    res.status(201).json({ message: 'User berhasil dibuat', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mengupdate user
exports.updateUser = async (req, res) => {
  try {
    const { nama, email, role, kelas_id, nomor_telepon, status, profil_gambar } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    
    user.nama = nama || user.nama;
    user.email = email || user.email;
    user.role = role || user.role;
    user.kelas_id = kelas_id || user.kelas_id;
    user.nomor_telepon = nomor_telepon || user.nomor_telepon;
    user.status = status || user.status;
    user.profil_gambar = profil_gambar || user.profil_gambar;
    
    await user.save();
    res.status(200).json({ message: 'User berhasil diperbarui', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Menghapus user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
