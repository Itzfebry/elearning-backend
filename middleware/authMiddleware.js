const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
      return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  // Ambil token setelah "Bearer "
  const token = authHeader.replace('Bearer ', '');

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      console.error("JWT Error:", error.message); // Log ke terminal
      res.status(401).json({ message: 'Token tidak valid', error: error.message });
  }
};

exports.verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Akses ditolak, tidak memiliki izin' });
    }
    next();
};