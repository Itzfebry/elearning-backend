const User = require('../models/users');
const Kelas = require('../models/kelas'); 

// Mendapatkan semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('kelas_id', 'nama');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mendapatkan user berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('kelas_id', 'nama');

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Membuat user baru
exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role, kelas_id, nomor_telepon, status, profil_gambar, nis } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    // Validasi khusus untuk role siswa
    if (role === 'siswa') {
      // Validasi NIS
      if (!nis) {
        return res.status(400).json({ message: 'NIS wajib diisi untuk role siswa' });
      }
      
      // Cek apakah NIS sudah terdaftar
      const existingNis = await User.findOne({ nis });
      if (existingNis) return res.status(400).json({ message: 'NIS sudah terdaftar' });
      
      // Validasi kelas_id
      if (!kelas_id) {
        return res.status(400).json({ message: 'Kelas wajib diisi untuk role siswa' });
      }
      
      // Cek apakah kelas_id ada di database
      const kelasExists = await Kelas.findById(kelas_id);
      if (!kelasExists) {
        return res.status(400).json({ message: 'Kelas yang dipilih tidak tersedia di database' });
      }
    }

    // Membuat user baru
    const user = new User({
      nama,
      email,
      password,
      role,
      nis: role === 'siswa' ? nis : undefined,
      kelas_id: role === 'siswa' ? kelas_id : (kelas_id || null),
      nomor_telepon,
      status: status || 'aktif',
      profil_gambar: profil_gambar || null
    });

    await user.save();
    res.status(201).json({ message: 'User berhasil dibuat', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Mengupdate user
exports.updateUser = async (req, res) => {
  try {
    const { nama, email, role, kelas_id, nomor_telepon, status, profil_gambar, nis } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Validasi perubahan role, NIS, dan kelas_id
    const newRole = role || user.role;
    
    if (newRole === 'siswa') {
      // Jika rolenya siswa (baru atau tetap), pastikan NIS ada
      if (!nis && !user.nis) {
        return res.status(400).json({ message: 'NIS wajib diisi untuk role siswa' });
      }
      
      // Cek NIS sudah ada jika nilai NIS diubah
      if (nis && nis !== user.nis) {
        const existingNis = await User.findOne({ nis });
        if (existingNis) return res.status(400).json({ message: 'NIS sudah terdaftar' });
      }
      
      // Validasi kelas_id
      const newKelasId = kelas_id || user.kelas_id;
      if (!newKelasId) {
        return res.status(400).json({ message: 'Kelas wajib diisi untuk role siswa' });
      }
      
      // Jika kelas_id diubah, cek apakah kelas baru ada di database
      if (kelas_id && String(kelas_id) !== String(user.kelas_id)) {
        const kelasExists = await Kelas.findById(kelas_id);
        if (!kelasExists) {
          return res.status(400).json({ message: 'Kelas yang dipilih tidak tersedia di database' });
        }
      }
    }

    // Update data user jika ada perubahan
    user.nama = nama || user.nama;
    user.email = email || user.email;
    user.role = newRole;
    
    // Update NIS dan kelas_id berdasarkan role
    if (newRole === 'siswa') {
      user.nis = nis || user.nis;
      user.kelas_id = kelas_id || user.kelas_id;
    } else {
      user.nis = undefined; // Hapus NIS jika role bukan siswa
      // Untuk non-siswa, kelas_id bisa opsional
      user.kelas_id = kelas_id !== undefined ? kelas_id : user.kelas_id;
    }
    
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