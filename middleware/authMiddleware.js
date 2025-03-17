const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.protect = async (req, res, next) => {
  let token;

  // Cek apakah ada token dalam header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Ambil token tanpa "Bearer"

      // Pastikan JWT_SECRET tersedia
      if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET tidak ditemukan di .env");
        return res.status(500).json({ message: "Server error: JWT_SECRET tidak ditemukan" });
      }

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token terverifikasi:", decoded);

      // Ambil user dari database tanpa password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User tidak ditemukan" });
      }

      next();
    } catch (error) {
      console.error("❌ Error verifikasi token:", error.message);
      return res.status(401).json({ message: "Token tidak valid" });
    }
  } else {
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }
};

// Middleware untuk Admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Akses ditolak, hanya untuk admin" });
  }
};
