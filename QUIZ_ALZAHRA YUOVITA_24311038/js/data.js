/**
 * SIMPAD - Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah
 * Kabupaten Tulang Bawang, Provinsi Lampung
 * 
 * Data Model & Storage Module
 * Catatan: Data bersumber dari dokumen resmi RLPPD 2024, SIKD 2025-2026,
 * serta Perda Kab. Tulang Bawang No. 1 Tahun 2024.
 * Ditandai sebagai DATA SIMULASI & ESTIMASI AKADEMIK.
 */

const SIMPAD_DATA = {
  meta: {
    daerah: "Kabupaten Tulang Bawang",
    ibukota: "Menggala",
    provinsi: "Lampung",
    aplikasi: "SIMPAD Tulang Bawang",
    versi: "v1.0.0 (Release Candidate)",
    dasarHukum: "Perda Kab. Tulang Bawang No. 1 Tahun 2024 tentang Pajak Daerah & Retribusi Daerah (UU No. 1/2022 HKPD & PP 35/2023)",
    tanggalPosisi: "20 Oktober 2026",
    statusData: "Data Simulasi Berbasis SIKD & Dokumen Profil PAD Kab. Tulang Bawang",
    disclaimer: "PERINGATAN RESMI: Data yang ditampilkan merupakan data simulasi dan estimasi analitis berbasis dokumen RLPPD 2024 dan agregator SIKD 2025–2026 untuk keperluan pengembangan sistem monitoring, bukan publikasi resmi final BPKAD Tulang Bawang."
  },

  // Pengguna & Role Berbasis RBAC (Role-Based Access Control)
  roles: {
    PIMPINAN: {
      id: "PIMPINAN",
      namaPeran: "Pimpinan Daerah (Bupati / Sekda)",
      deskripsi: "Melihat dashboard eksekutif ringkas satu halaman, proyeksi akhir tahun, dan mengunduh laporan PDF/Excel.",
      permissions: ["view_dashboard", "view_projections", "export_reports", "view_anomalies"]
    },
    VERIFIKATOR: {
      id: "VERIFIKATOR",
      namaPeran: "Verifikator BPKAD / Bapenda",
      deskripsi: "Memeriksa usulan realisasi OPD, menyetujui, menolak dengan catatan, menangani deteksi anomali, dan mengimpor berkas.",
      permissions: ["view_dashboard", "verify_data", "reject_data", "resolve_anomalies", "import_data", "publish_data", "view_audit"]
    },
    OPERATOR: {
      id: "OPERATOR",
      namaPeran: "Operator OPD Pengelola",
      deskripsi: "Menginput realisasi bulanan OPD sendiri, mengunggah bukti setoran/STS, melihat status verifikasi.",
      permissions: ["view_dashboard", "input_realisasi", "upload_sts", "view_own_opd"]
    },
    PENGAWAS: {
      id: "PENGAWAS",
      namaPeran: "Pengawas (Inspektorat / DPRD)",
      deskripsi: "Hak akses baca seluruh data tanpa wewenang mengubah, termasuk inspeksi log jejak audit menyeluruh.",
      permissions: ["view_dashboard", "view_all_reports", "view_audit", "view_anomalies"]
    },
    ADMIN: {
      id: "ADMIN",
      namaPeran: "Administrator Sistem",
      deskripsi: "Konfigurasi master data rekening, pengelolaan pengguna, perubahan ambang batas anomali, dan tata kelola sistem.",
      permissions: ["all"]
    }
  },

  users: [
    {
      id: "usr-01",
      nama: "Drs. H. Qudrotul Ikhwan, MM",
      nip: "19680512 199303 1 004",
      jabatan: "Pj. Bupati / Pembina Utama",
      role: "PIMPINAN",
      instansi: "Sekretariat Daerah Kab. Tulang Bawang",
      avatar: "QI"
    },
    {
      id: "usr-02",
      nama: "Rina Suryani, SE, Ak., M.Si",
      nip: "19840215 200801 2 007",
      jabatan: "Kepala Bidang Akuntansi & Pelaporan",
      role: "VERIFIKATOR",
      instansi: "BPKAD Kab. Tulang Bawang",
      avatar: "RS"
    },
    {
      id: "usr-03",
      nama: "Dedi Irawan, S.Kom",
      nip: "19910418 201502 1 002",
      jabatan: "Operator Pengelola Data Penerimaan",
      role: "OPERATOR",
      instansi: "Badan Pendapatan Daerah (Bapenda)",
      avatar: "DI"
    },
    {
      id: "usr-04",
      nama: "drg. Fitri Amalia, M.Kes",
      nip: "19860920 201101 2 009",
      jabatan: "Bendahara Penerimaan BLUD",
      role: "OPERATOR",
      instansi: "RSUD Menggala Kab. Tulang Bawang",
      avatar: "FA"
    },
    {
      id: "usr-05",
      nama: "Bambang Supriyadi, SH, MH",
      nip: "19750808 200003 1 003",
      jabatan: "Inspektur Pembantu Wilayah I",
      role: "PENGAWAS",
      instansi: "Inspektorat Daerah Kab. Tulang Bawang",
      avatar: "BS"
    },
    {
      id: "usr-06",
      nama: "Alzahra Yuovita, S.Kom",
      nip: "24311038",
      jabatan: "Super Administrator SIMPAD",
      role: "ADMIN",
      instansi: "Diskominfosandi / Tim IT Bapenda",
      avatar: "AY"
    }
  ],

  // Daftar OPD Pengelola PAD di Kabupaten Tulang Bawang
  opdList: [
    { id: "OPD-01", kode: "5.02.0.00.0.00.01", nama: "Badan Pendapatan Daerah (Bapenda)", kategori: "Pajak & Retribusi", penanggungJawab: "Kepala Bapenda" },
    { id: "OPD-02", kode: "5.02.0.00.0.00.02", nama: "Badan Pengelola Keuangan dan Aset Daerah (BPKAD)", kategori: "Kekayaan Daerah & Kasda", penanggungJawab: "Kepala BPKAD" },
    { id: "OPD-03", kode: "1.02.0.00.0.00.01", nama: "Dinas Kesehatan", kategori: "Retribusi Layanan Kesehatan", penanggungJawab: "Kepala Dinkes" },
    { id: "OPD-04", kode: "1.02.0.00.0.00.02", nama: "RSUD Menggala (BLUD)", kategori: "Lain-lain PAD yang Sah / BLUD", penanggungJawab: "Direktur RSUD" },
    { id: "OPD-05", kode: "2.15.0.00.0.00.01", nama: "Dinas Perhubungan", kategori: "Retribusi Parkir & Terminal", penanggungJawab: "Kepala Dishub" },
    { id: "OPD-06", kode: "2.16.0.00.0.00.01", nama: "Dinas Perdagangan", kategori: "Retribusi Pasar Daerah", penanggungJawab: "Kepala Disdag" },
    { id: "OPD-07", kode: "1.03.0.00.0.00.01", nama: "Dinas Pekerjaan Umum & Penataan Ruang (PUPR)", kategori: "Retribusi PBG & Alat Berat", penanggungJawab: "Kepala Dinas PUPR" },
    { id: "OPD-08", kode: "2.11.0.00.0.00.01", nama: "Dinas Lingkungan Hidup (DLH)", kategori: "Retribusi Sampah & Uji Lab", penanggungJawab: "Kepala DLH" }
  ],

  // Hierarki Komponen PAD & Kode Rekening Akun
  akunHierarki: [
    {
      kode: "4.1.01",
      komponen: "Pajak Daerah",
      opdId: "OPD-01",
      deskripsi: "Pajak yang dipungut oleh Bapenda berdasarkan UU No. 1/2022 dan Perda No. 1/2024",
      subAkun: [
        { kode: "4.1.01.01", nama: "PBB-P2 (PBB Perdesaan & Perkotaan)", opdId: "OPD-01", target2026: 28500000000, realisasi2026: 12450000000 },
        { kode: "4.1.01.02", nama: "BPHTB (Bea Perolehan Hak atas Tanah & Bangunan)", opdId: "OPD-01", target2026: 18000000000, realisasi2026: 6820000000 },
        { kode: "4.1.01.03", nama: "PBJT Tenaga Listrik", opdId: "OPD-01", target2026: 14000000000, realisasi2026: 4950000000 },
        { kode: "4.1.01.04", nama: "PBJT Makanan dan/atau Minuman (Restoran)", opdId: "OPD-01", target2026: 6200000000, realisasi2026: 1850000000 },
        { kode: "4.1.01.05", nama: "PBJT Jasa Perhotelan & Parkir Khusus", opdId: "OPD-01", target2026: 2300000000, realisasi2026: 680000000 },
        { kode: "4.1.01.06", nama: "Pajak Reklame", opdId: "OPD-01", target2026: 3100000000, realisasi2026: 940000000 },
        { kode: "4.1.01.07", nama: "Pajak Air Tanah (PAT)", opdId: "OPD-01", target2026: 1800000000, realisasi2026: 480000000 },
        { kode: "4.1.01.08", nama: "Pajak Mineral Bukan Logam & Batuan (MBLB)", opdId: "OPD-01", target2026: 4500000000, realisasi2026: 720000000 },
        { kode: "4.1.01.09", nama: "Pajak Sarang Burung Walet", opdId: "OPD-01", target2026: 1600000000, realisasi2026: 150000000 }
      ]
    },
    {
      kode: "4.1.02",
      komponen: "Retribusi Daerah",
      opdId: "Multi-OPD",
      deskripsi: "Pungutan daerah atas jasa umum, jasa usaha, dan perizinan tertentu",
      subAkun: [
        { kode: "4.1.02.01", nama: "Retribusi Pelayanan Kesehatan (Puskesmas)", opdId: "OPD-03", target2026: 2400000000, realisasi2026: 980000000 },
        { kode: "4.1.02.02", nama: "Retribusi Persetujuan Bangunan Gedung (PBG)", opdId: "OPD-07", target2026: 1900000000, realisasi2026: 520000000 },
        { kode: "4.1.02.03", nama: "Retribusi Pelayanan Parkir Tepi Jalan Umum", opdId: "OPD-05", target2026: 1100000000, realisasi2026: 340000000 },
        { kode: "4.1.02.04", nama: "Retribusi Terminal Menggala & Uji Kir", opdId: "OPD-05", target2026: 950000000, realisasi2026: 280000000 },
        { kode: "4.1.02.05", nama: "Retribusi Pelayanan Pasar Daerah", opdId: "OPD-06", target2026: 1450000000, realisasi2026: 460000000 },
        { kode: "4.1.02.06", nama: "Retribusi Pelayanan Kebersihan & Sampah", opdId: "OPD-08", target2026: 800000000, realisasi2026: 210000000 },
        { kode: "4.1.02.07", nama: "Retribusi Pemakaian Kekayaan Daerah (Sewa Aset)", opdId: "OPD-02", target2026: 400000000, realisasi2026: 110000000 }
      ]
    },
    {
      kode: "4.1.03",
      komponen: "Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan",
      opdId: "OPD-02",
      deskripsi: "Bagian laba penyertaan modal pemerintah daerah pada BUMD & Lembaga Keuangan",
      subAkun: [
        { kode: "4.1.03.01", nama: "Bagian Laba PT Bank Lampung", opdId: "OPD-02", target2026: 1960000000, realisasi2026: 0 },
        { kode: "4.1.03.02", nama: "Bagian Laba BUMD Tulang Bawang Jaya", opdId: "OPD-02", target2026: 400000000, realisasi2026: 0 }
      ]
    },
    {
      kode: "4.1.04",
      komponen: "Lain-lain PAD yang Sah",
      opdId: "Multi-OPD",
      deskripsi: "Pendapatan bunga kas daerah, layanan BLUD, dan tuntutan ganti rugi daerah",
      subAkun: [
        { kode: "4.1.04.01", nama: "Pendapatan Layanan BLUD RSUD Menggala", opdId: "OPD-04", target2026: 95000000000, realisasi2026: 28950000000 },
        { kode: "4.1.04.02", nama: "Hasil Penjualan Aset Daerah yang Tidak Dipisahkan", opdId: "OPD-02", target2026: 1500000000, realisasi2026: 420000000 },
        { kode: "4.1.04.03", nama: "Pendapatan Bunga Kasda (Giro & Deposito)", opdId: "OPD-02", target2026: 8500000000, realisasi2026: 3620000000 },
        { kode: "4.1.04.04", nama: "Pendapatan Denda Keterlambatan & TGR", opdId: "OPD-02", target2026: 940000000, realisasi2026: 800000000 }
      ]
    }
  ],

  // Ringkasan Finansial Multi-Tahun Resmi sesuai Dokumen PRD & Analisis PAD
  tahunan: {
    "2026": {
      tahun: 2026,
      labelPeriode: "TA 2026 (s.d. Agustus 2026)",
      statusLaporan: "Berjalan (Bulan ke-8 dari 12)",
      targetPAD: 200350000000,            // Rp 200,35 Miliar (naik 9,13% dari 2025)
      realisasiPAD: 65730000000,          // Rp 65,73 Miliar (32,81%)
      sisaTarget: 134620000000,           // Rp 134,62 Miliar (67,19%)
      sisaBulan: 4,                       // September - Desember (4 bulan)
      kebutuhanPerBulan: 33655000000,     // Rp 33,66 M/bulan
      rataRataRealisasiPerBulan: 8216250000, // Rp 8,22 M/bulan (Jan - Agt)
      rasioKesenjanganLaju: 4.09,          // Butuh percepatan 4,1x lipat
      totalAnggaranPendapatan: 1238100000000, // Rp 1.238,10 Miliar (turun 6,7%)
      porsiPADthdAnggaran: 16.18,         // 16,18%
      komponen: [
        { nama: "Lain-lain PAD yang Sah", target: 105940000000, realisasi: 33790000000, persen: 31.89, porsiRealisasi: 51.41 },
        { nama: "Pajak Daerah", target: 80000000000, realisasi: 29040000000, persen: 36.30, porsiRealisasi: 44.18 },
        { nama: "Retribusi Daerah", target: 9000000000, realisasi: 2900000000, persen: 32.22, porsiRealisasi: 4.41 },
        { nama: "Hasil Kekayaan Daerah Dipisahkan", target: 5410000000, realisasi: 0, persen: 0.00, porsiRealisasi: 0.00 }
      ],
      bulanan: [
        { bulan: "Jan", targetBulanan: 16695833333, realisasiBulanan: 7850000000, kumulatif: 7850000000 },
        { bulan: "Feb", targetBulanan: 16695833333, realisasiBulanan: 8120000000, kumulatif: 15970000000 },
        { bulan: "Mar", targetBulanan: 16695833333, realisasiBulanan: 7940000000, kumulatif: 23910000000 },
        { bulan: "Apr", targetBulanan: 16695833333, realisasiBulanan: 8350000000, kumulatif: 32260000000 },
        { bulan: "Mei", targetBulanan: 16695833333, realisasiBulanan: 8460000000, kumulatif: 40720000000 },
        { bulan: "Jun", targetBulanan: 16695833333, realisasiBulanan: 8280000000, kumulatif: 49000000000 },
        { bulan: "Jul", targetBulanan: 16695833333, realisasiBulanan: 7890000000, kumulatif: 56890000000, catatan: "Catatan: Databoks sempat mencatat 14,09 M akibat jeda entri SIKD" },
        { bulan: "Agt", targetBulanan: 16695833333, realisasiBulanan: 8840000000, kumulatif: 65730000000 },
        { bulan: "Sep", targetBulanan: 16695833333, realisasiBulanan: null, proyeksiRataRata: 73946250000, kebutuhanTarget: 99385000000 },
        { bulan: "Okt", targetBulanan: 16695833333, realisasiBulanan: null, proyeksiRataRata: 82162500000, kebutuhanTarget: 133040000000 },
        { bulan: "Nov", targetBulanan: 16695833333, realisasiBulanan: null, proyeksiRataRata: 90378750000, kebutuhanTarget: 166695000000 },
        { bulan: "Des", targetBulanan: 16695833333, realisasiBulanan: null, proyeksiRataRata: 98595000000, kebutuhanTarget: 200350000000 }
      ]
    },
    "2025": {
      tahun: 2025,
      labelPeriode: "TA 2025 (Sementara, SIKD per 20 Des 2025)",
      statusLaporan: "Realisasi Sementara (Unaudited)",
      targetPAD: 183580000000,            // Rp 183,58 Miliar
      realisasiPAD: 83280000000,          // Rp 83,28 Miliar (45,36%)
      sisaTarget: 100300000000,
      totalPendapatanRealisasi: 1032570000000, // Rp 1.032,57 Miliar
      transferRealisasi: 949290000000,    // TKDD (912,06 M) + Transfer Antardaerah (37,23 M)
      rasioPADthdTotalRealisasi: 8.07,    // PAD hanya 8,07% dari pendapatan terealisasi!
      ketergantunganTransfer: 91.93,
      komponen: [
        { nama: "Pajak Daerah", target: 81150000000, realisasi: 35540000000, persen: 43.80, porsiRealisasi: 42.68, catatan: "Capaian 43,80%" },
        { nama: "Retribusi Daerah", target: 6890000000, realisasi: 40260000000, persen: 584.33, porsiRealisasi: 48.34, catatan: "Anomali 584,33% (Diduga reklasifikasi akun BLUD/Kesehatan)" },
        { nama: "Hasil Kekayaan Daerah Dipisahkan", target: 1960000000, realisasi: 1960000000, persen: 100.00, porsiRealisasi: 2.35, catatan: "Dividen PT Bank Lampung tercapai 100%" },
        { nama: "Lain-lain PAD yang Sah", target: 93580000000, realisasi: 5520000000, persen: 5.90, porsiRealisasi: 6.63, catatan: "Anomali rendah 5,90% (Kompensasi selisih akun retribusi)" }
      ],
      bulanan: [
        { bulan: "Jan", realisasiBulanan: 5200000000, kumulatif: 5200000000 },
        { bulan: "Feb", realisasiBulanan: 5800000000, kumulatif: 11000000000 },
        { bulan: "Mar", realisasiBulanan: 6100000000, kumulatif: 17100000000 },
        { bulan: "Apr", realisasiBulanan: 6400000000, kumulatif: 23500000000 },
        { bulan: "Mei", realisasiBulanan: 6900000000, kumulatif: 30400000000 },
        { bulan: "Jun", realisasiBulanan: 7200000000, kumulatif: 37600000000 },
        { bulan: "Jul", realisasiBulanan: 7500000000, kumulatif: 45100000000 },
        { bulan: "Agt", realisasiBulanan: 7800000000, kumulatif: 52900000000 },
        { bulan: "Sep", realisasiBulanan: 8100000000, kumulatif: 61000000000 },
        { bulan: "Okt", realisasiBulanan: 7400000000, kumulatif: 68400000000 },
        { bulan: "Nov", realisasiBulanan: 7600000000, kumulatif: 76000000000 },
        { bulan: "Des", realisasiBulanan: 7280000000, kumulatif: 83280000000 }
      ]
    },
    "2024": {
      tahun: 2024,
      labelPeriode: "TA 2024 (Realisasi Akhir Tahun Teruji)",
      statusLaporan: "Laporan Resmi (RLPPD & Perbup No. 12/2023)",
      targetPAD: 186919467430,            // Rp 186,92 Miliar
      realisasiPAD: 139363382133,          // Rp 139,36 Miliar (74,56%)
      sisaTarget: 47556085297,
      pendapatanTransferTarget: 1189572659125,
      pendapatanTransferRealisasi: 1117331602546,
      totalPendapatanTarget: 1376492626555,
      totalPendapatanRealisasi: 1256694984679,
      rasioPADthdTotalRealisasi: 11.09,    // 11,09%
      ketergantunganTransfer: 88.91,
      komponen: [
        { nama: "Pajak Daerah", target: 82500000000, realisasi: 61500000000, persen: 74.55, porsiRealisasi: 44.13 },
        { nama: "Retribusi Daerah", target: 10419467430, realisasi: 7263382133, persen: 69.71, porsiRealisasi: 5.21 },
        { nama: "Hasil Kekayaan Daerah Dipisahkan", target: 2000000000, realisasi: 1950000000, persen: 97.50, porsiRealisasi: 1.40 },
        { nama: "Lain-lain PAD yang Sah", target: 92000000000, realisasi: 68650000000, persen: 74.62, porsiRealisasi: 49.26 }
      ],
      bulanan: [
        { bulan: "Jan", realisasiBulanan: 9800000000, kumulatif: 9800000000 },
        { bulan: "Feb", realisasiBulanan: 10200000000, kumulatif: 20000000000 },
        { bulan: "Mar", realisasiBulanan: 10500000000, kumulatif: 30500000000 },
        { bulan: "Apr", realisasiBulanan: 11200000000, kumulatif: 41700000000 },
        { bulan: "Mei", realisasiBulanan: 11800000000, kumulatif: 53500000000 },
        { bulan: "Jun", realisasiBulanan: 12400000000, kumulatif: 65900000000 },
        { bulan: "Jul", realisasiBulanan: 11900000000, kumulatif: 77800000000 },
        { bulan: "Agt", realisasiBulanan: 12800000000, kumulatif: 90600000000 },
        { bulan: "Sep", realisasiBulanan: 13500000000, kumulatif: 104100000000 },
        { bulan: "Okt", realisasiBulanan: 11600000000, kumulatif: 115700000000 },
        { bulan: "Nov", realisasiBulanan: 11400000000, kumulatif: 127100000000 },
        { bulan: "Des", realisasiBulanan: 12263382133, kumulatif: 139363382133 }
      ]
    }
  },

  // Aturan Deteksi Anomali Data (FR-6.5)
  aturanAnomali: [
    {
      kode: "A-1",
      nama: "Realisasi Melebihi Batas Ambang Target",
      ambang: "> 120% dari target",
      status: "Aktif",
      deskripsi: "Mendeteksi akun penerimaan yang realisasinya melonjak di luar batas wajar (potensi salah klasifikasi pos penerimaan atau entri ganda)."
    },
    {
      kode: "A-2",
      nama: "Realisasi Sangat Rendah Menjelang Akhir Tahun",
      ambang: "< 50% setelah bulan ke-9",
      status: "Aktif",
      deskripsi: "Peringatan dini untuk pos pendapatan yang serapannya sangat tertinggal dan berisiko gagal memenuhi target APBD."
    },
    {
      kode: "A-3",
      nama: "Lonjakan / Fluktuasi Bulanan Tidak Wajar",
      ambang: "> 3x rata-rata bulanan berjalan",
      status: "Aktif",
      deskripsi: "Mendeteksi anomali seperti lonjakan drastis akibat keterlambatan konsolidasi data SIKD (misal kasus Juli vs Agustus 2026)."
    },
    {
      kode: "A-4",
      nama: "Realisasi Kumulatif Menurun",
      ambang: "Kumulatif (n) < Kumulatif (n-1)",
      status: "Aktif",
      deskripsi: "Nilai kumulatif tahun berjalan tidak boleh turun; jika turun mengindikasikan adanya koreksi pembatalan tanpa tiket verifikasi resmi."
    },
    {
      kode: "A-5",
      nama: "Discrepancy / Selisih Total Komponen vs Induk",
      ambang: "Selisih != 0 Rupiah",
      status: "Aktif",
      deskripsi: "Total penjumlahan seluruh komponen harus persis sama dengan total PAD yang dicatat dalam rekening induk."
    },
    {
      kode: "A-6",
      nama: "Realisasi pada Rekening Tanpa Alokasi Target",
      ambang: "Target = 0 & Realisasi > 0",
      status: "Aktif",
      deskripsi: "Terdapat setoran masuk pada rekening yang tidak dianggarkan dalam APBD murni maupun APBD Perubahan."
    }
  ],

  // Kasus Anomali Riil & Terdeteksi Sistem
  daftarKasusAnomali: [
    {
      id: "ANOM-2025-01",
      kodeAturan: "A-1",
      tahun: 2025,
      komponen: "Retribusi Daerah",
      akun: "4.1.02.01 Retribusi Pelayanan Kesehatan",
      opd: "Dinas Kesehatan / RSUD",
      target: 6890000000,
      realisasi: 40260000000,
      capaianPersen: 584.33,
      status: "Terbuka (Perlu Penjelasan Verifikator)",
      urgensi: "Tinggi (Kritis)",
      penyebabDugaan: "Penerimaan fungsional jasa layanan BLUD RSUD Menggala terinput ke dalam pos Retribusi Daerah, bukan pos Lain-lain PAD yang Sah.",
      rekomendasi: "Lakukan rekonsiliasi bersama BPKAD dan verifikasi naskah LRA Audited BPK RI Perwakilan Lampung TA 2025.",
      tindakLanjut: null
    },
    {
      id: "ANOM-2025-02",
      kodeAturan: "A-2",
      tahun: 2025,
      komponen: "Lain-lain PAD yang Sah",
      akun: "4.1.04.01 Pendapatan BLUD RSUD",
      opd: "RSUD Menggala",
      target: 9358000000,
      realisasi: 5520000000,
      capaianPersen: 5.90,
      status: "Terbuka (Perlu Penjelasan Verifikator)",
      urgensi: "Tinggi",
      penyebabDugaan: "Anomali cermin dari pos retribusi (Rp40,26 M), realisasi BLUD tidak tercatat di Lain-lain PAD sehingga serapan pos ini hanya 5,90%.",
      rekomendasi: "Jurnal penyesuaian reklasifikasi akun saat penyusunan LKPD.",
      tindakLanjut: null
    },
    {
      id: "ANOM-2026-03",
      kodeAturan: "A-3",
      tahun: 2026,
      komponen: "Pajak Daerah & PAD Total",
      akun: "4.1 Total Pendapatan Asli Daerah",
      opd: "Bapenda / Konsolidasi",
      target: 200350000000,
      realisasi: 65730000000,
      capaianPersen: 32.81,
      status: "Selesai Diverifikasi",
      urgensi: "Sedang",
      penyebabDugaan: "Angka posisi Juli 2026 tercatat Rp14,09 M di Databoks Katadata lalu melesat menjadi Rp65,73 M pada Agustus 2026 (lonjakan 4,66x).",
      rekomendasi: "Diberi label 'Keterlambatan Konsolidasi SIKD' pada data historis agar grafik tidak menipu perencana.",
      tindakLanjut: "Diverifikasi oleh Rina Suryani (BPKAD) pada 12 Sept 2026: Terjadi jeda pelaporan online SIKD Kemendagri pada bulan Juli."
    },
    {
      id: "ANOM-2026-04",
      kodeAturan: "A-6",
      tahun: 2026,
      komponen: "Retribusi Daerah",
      akun: "4.1.02.02 Retribusi Persetujuan Bangunan Gedung (PBG)",
      opd: "Dinas Pekerjaan Umum & PR",
      target: 0,
      realisasi: 520000000,
      capaianPersen: 100.0,
      status: "Terbuka (Dalam Tinjauan)",
      urgensi: "Sedang",
      penyebabDugaan: "Penerimaan PBG masuk sebelum penetapan target APBD Perubahan 2026.",
      rekomendasi: "Daftarkan pagu target resmi pada rancangan KUA-PPAS Perubahan TA 2026.",
      tindakLanjut: null
    }
  ],

  // Antrean Dokumen Pengajuan Realisasi OPD (Verification Queue)
  antreanPengajuan: [
    {
      id: "REQ-2026-0819",
      noBukti: "STS/BAPENDA/2026/08/042",
      tanggalPengajuan: "2026-08-28",
      opdId: "OPD-01",
      opdNama: "Badan Pendapatan Daerah",
      akunKode: "4.1.01.01",
      akunNama: "PBB-P2 Sektor Perdesaan & Perkebunan",
      periodeBulan: "Agustus 2026",
      nominal: 3450000000,
      sumber: "Sistem Host-to-Host Bank Lampung / ETPD",
      status: "Menunggu Verifikasi",
      operator: "Dedi Irawan, S.Kom",
      keterangan: "Penerimaan masa pajak PBB-P2 jatuh tempo Agustus wilayah Menggala, Banjar Margo, dan Penawartama.",
      lampiran: "STS_PBB_AGT2026.pdf"
    },
    {
      id: "REQ-2026-0820",
      noBukti: "STS/RSUD/2026/08/112",
      tanggalPengajuan: "2026-08-29",
      opdId: "OPD-04",
      opdNama: "RSUD Menggala (BLUD)",
      akunKode: "4.1.04.01",
      akunNama: "Pendapatan Layanan Rawat Inap & BPJS BLUD",
      periodeBulan: "Agustus 2026",
      nominal: 4120000000,
      sumber: "Rekening Koran Bank Lampung BLUD",
      status: "Menunggu Verifikasi",
      operator: "drg. Fitri Amalia",
      keterangan: "Klaim kapitasi & non-kapitasi BPJS Kesehatan gelombang I Agustus 2026.",
      lampiran: "RekeningKoran_BLUD_08.pdf"
    },
    {
      id: "REQ-2026-0821",
      noBukti: "STS/DISHUB/2026/08/015",
      tanggalPengajuan: "2026-08-30",
      opdId: "OPD-05",
      opdNama: "Dinas Perhubungan",
      akunKode: "4.1.02.04",
      akunNama: "Retribusi Terminal Menggala & Uji Kir",
      periodeBulan: "Agustus 2026",
      nominal: 38500000,
      sumber: "Penyetoran Tunai ke Kasda Bank Lampung",
      status: "Menunggu Verifikasi",
      operator: "Yudi Pratama, A.Md",
      keterangan: "Penerimaan retribusi peron bus Terminal Menggala dan layanan uji kir keliling.",
      lampiran: "BuktiSetor_Dishub_Agt.pdf"
    },
    {
      id: "REQ-2026-0815",
      noBukti: "STS/BAPENDA/2026/08/038",
      tanggalPengajuan: "2026-08-25",
      opdId: "OPD-01",
      opdNama: "Badan Pendapatan Daerah",
      akunKode: "4.1.01.02",
      akunNama: "BPHTB Transaksi Jual Beli Tanah",
      periodeBulan: "Agustus 2026",
      nominal: 890000000,
      sumber: "Validasi Notaris/PPAT Online",
      status: "Terverifikasi",
      operator: "Dedi Irawan, S.Kom",
      keterangan: "Bea perolehan hak atas tanah dan bangunan wilayah perkebunan kelapa sawit.",
      lampiran: "Validasi_BPHTB_Agustus.pdf",
      diverifikasiOleh: "Rina Suryani, SE, Ak. (BPKAD)",
      tanggalVerifikasi: "2026-08-26"
    },
    {
      id: "REQ-2026-0814",
      noBukti: "STS/DISDAG/2026/08/009",
      tanggalPengajuan: "2026-08-24",
      opdId: "OPD-06",
      opdNama: "Dinas Perdagangan",
      akunKode: "4.1.02.05",
      akunNama: "Retribusi Kios & Pelataran Pasar Unit 2",
      periodeBulan: "Agustus 2026",
      nominal: 72000000,
      sumber: "Karcis Manual & E-Retribusi",
      status: "Ditolak",
      operator: "Hendra Wijaya",
      keterangan: "Setoran mingguan pasar daerah Unit 2 Banjar Agung.",
      lampiran: "Rekap_Pasar_Unit2.pdf",
      alasanPenolakan: "Lampiran bukti setor ke Kasda tidak menyertakan validasi teller Bank Lampung dan terdapat selisih hitung Rp1.500.000 antara bukti karcis dengan slip bank."
    }
  ],

  // Log Jejak Audit Keuangan (FR-8.1)
  jejakAudit: [
    {
      id: "AUD-1008",
      waktu: "2026-08-30 14:15:22",
      pengguna: "Rina Suryani, SE, Ak.",
      role: "VERIFIKATOR",
      opd: "BPKAD Kab. Tulang Bawang",
      aksi: "VERIFIKASI_DOKUMEN",
      entitas: "Realisasi BPHTB (REQ-2026-0815)",
      nilaiLama: "Status: Menunggu Verifikasi",
      nilaiBaru: "Status: Terverifikasi (Rp 890.000.000 Masuk ke Dashboard)",
      ipAddress: "192.168.10.45"
    },
    {
      id: "AUD-1007",
      waktu: "2026-08-29 11:02:18",
      pengguna: "Rina Suryani, SE, Ak.",
      role: "VERIFIKATOR",
      opd: "BPKAD Kab. Tulang Bawang",
      aksi: "TOLAK_DOKUMEN",
      entitas: "Realisasi Retribusi Pasar (REQ-2026-0814)",
      nilaiLama: "Status: Menunggu Verifikasi",
      nilaiBaru: "Status: Ditolak (Alasan: Selisih bukti setor kasda Rp 1,5 Juta)",
      ipAddress: "192.168.10.45"
    },
    {
      id: "AUD-1006",
      waktu: "2026-08-28 09:40:11",
      pengguna: "Dedi Irawan, S.Kom",
      role: "OPERATOR",
      opd: "Bapenda Kab. Tulang Bawang",
      aksi: "INPUT_REALISASI",
      entitas: "PBB-P2 Sektor Perdesaan & Perkebunan",
      nilaiLama: "null",
      nilaiBaru: "Rp 3.450.000.000 (Masa Pajak Agt 2026)",
      ipAddress: "192.168.14.88"
    },
    {
      id: "AUD-1005",
      waktu: "2026-08-15 16:30:00",
      pengguna: "Alzahra Yuovita, S.Kom",
      role: "ADMIN",
      opd: "Diskominfosandi",
      aksi: "UPDATE_AMBANG_ANOMALI",
      entitas: "Aturan A-1 (Realisasi Melebihi Ambang)",
      nilaiLama: "Ambang batas: > 150%",
      nilaiBaru: "Ambang batas: > 120% (Sesuai Rekomendasi PRD 6.5)",
      ipAddress: "192.168.10.2"
    },
    {
      id: "AUD-1004",
      waktu: "2026-08-10 13:20:05",
      pengguna: "Rina Suryani, SE, Ak.",
      role: "VERIFIKATOR",
      opd: "BPKAD Kab. Tulang Bawang",
      aksi: "CATAT_ANOMALI",
      entitas: "Kasus ANOM-2026-03 (Lonjakan Juli - Agt)",
      nilaiLama: "Status: Baru",
      nilaiBaru: "Status: Selesai Diverifikasi (Catatan: Input Delay SIKD)",
      ipAddress: "192.168.10.45"
    }
  ]
};

// Expose to window for browser access
window.SIMPAD_DATA = SIMPAD_DATA;
