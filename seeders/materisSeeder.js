const mongoose = require("mongoose");
const Materi = require("../models/materis");
const KelasMataPelajaran = require("../models/kelasmatapelajarans");
const MataPelajaran = require("../models/matapelajarans");

const seedMateri = async () => {
  try {
    // Cari ID mata pelajaran dari koleksi `mata_pelajarans`
    const mapelMatematika = await MataPelajaran.findOne({ name: "Matematika" }).lean();
    const mapelBahasaIndonesia = await MataPelajaran.findOne({ name: "Bahasa Indonesia" }).lean();

    if (!mapelMatematika || !mapelBahasaIndonesia) {
      throw new Error("❌ Mata pelajaran tidak ditemukan di database!");
    }

    // Cari kelas-mata pelajaran berdasarkan `mata_pelajaran_id`
    const kelasMatematika = await KelasMataPelajaran.findOne({ mata_pelajaran_id: mapelMatematika._id }).lean();
    const kelasBahasaIndonesia = await KelasMataPelajaran.findOne({ mata_pelajaran_id: mapelBahasaIndonesia._id }).lean();

    if (!kelasMatematika || !kelasBahasaIndonesia) {
      throw new Error("❌ Kelas-mata pelajaran tidak ditemukan di database!");
    }

    console.log(`✅ Ditemukan kelas-mata pelajaran Matematika: ${kelasMatematika._id}`);
    console.log(`✅ Ditemukan kelas-mata pelajaran Bahasa Indonesia: ${kelasBahasaIndonesia._id}`);

    const materiData = [
      {
        judul: "Operasi Bilangan Pecahan",
        deskripsi: "Pembelajaran tentang penjumlahan, pengurangan, perkalian, dan pembagian pecahan.",
        file_url: "https://example.com/matematika-pecahan.pdf",
        file_type: "pdf",
        file_size: 500, // dalam KB
        kelas_matapelajaran_id: kelasMatematika._id,
        is_published: true,
      },
      {
        judul: "Bangun Ruang",
        deskripsi: "Materi mengenai berbagai jenis bangun ruang dan cara menghitung volumenya.",
        file_url: "https://example.com/matematika-bangunruang.ppt",
        file_type: "ppt",
        file_size: 1024, // dalam KB
        kelas_matapelajaran_id: kelasMatematika._id,
        is_published: true,
      },
      {
        judul: "Menulis Cerpen",
        deskripsi: "Panduan menulis cerpen yang menarik dengan struktur yang baik.",
        file_url: "https://example.com/bahasa-menuliscerpen.pdf",
        file_type: "pdf",
        file_size: 800, // dalam KB
        kelas_matapelajaran_id: kelasBahasaIndonesia._id,
        is_published: true,
      },
      {
        judul: "Membaca Puisi",
        deskripsi: "Teknik membaca puisi dengan ekspresi dan intonasi yang tepat.",
        file_url: "https://example.com/bahasa-membacapuisi.mp4",
        file_type: "video",
        file_size: 500, // dalam KB
        kelas_matapelajaran_id: kelasBahasaIndonesia._id,
        is_published: true,
      },
    ];

    for (const data of materiData) {
      await Materi.updateOne(
        { judul: data.judul, kelas_matapelajaran_id: data.kelas_matapelajaran_id },
        data,
        { upsert: true }
      );
    }

    console.log("✅ Seeder materi berhasil!");
  } catch (error) {
    console.error("❌ Seeder materi gagal:", error);
  }
};

module.exports = seedMateri;
