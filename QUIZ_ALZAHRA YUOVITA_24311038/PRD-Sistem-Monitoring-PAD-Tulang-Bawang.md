# PRD: Sistem Monitoring dan Optimalisasi PAD Kabupaten Tulang Bawang

| Atribut | Keterangan |
|---|---|
| Nama produk | SIMPAD Tulang Bawang (nama kerja) |
| Versi dokumen | 1.0 (Draft) |
| Tanggal | 20 Oktober 2026 |
| Basis dokumen | *Profil dan Analisis PAD Kabupaten Tulang Bawang* (PAD-Kabupaten-Tulang-Bawang.md) |
| Pengguna utama | Bapenda, BPKAD, OPD pengelola retribusi, Bappeda, pimpinan daerah |
| Platform | Web responsif (lihat Open Question #3) |

> **Asumsi dasar PRD ini.** Permintaan "PRD berdasarkan PAD" ditafsirkan sebagai PRD untuk **sistem informasi yang membantu Pemkab Tulang Bawang memantau dan mengoptimalkan PAD**, karena masalah yang ditemukan pada analisis PAD (data tersebar, anomali, target tidak realistis, capaian rendah) paling tepat dijawab oleh produk semacam itu. Asumsi ini dan semua hal yang belum diketahui ditandai di Bagian 11. Kalau produk yang Anda maksud berbeda, dokumen ini perlu disesuaikan.

---

## 1. Problem Statement

**Siapa yang dirugikan:** pengambil keputusan fiskal Pemkab Tulang Bawang (Bupati, Sekda, Kepala Bapenda, BPKAD, Bappeda) dan, secara tidak langsung, masyarakat yang bergantung pada belanja daerah.

**Bukti masalah (dari analisis PAD):**

| Temuan | Data |
|---|---|
| PAD tidak pernah mencapai target | 2024: 74,56% (Rp139,36 M dari Rp186,92 M). 2025 sementara: 45,36% (Rp83,28 M dari Rp183,58 M). 2026 s.d. Agustus: 32,81% (Rp65,73 M dari Rp200,35 M) |
| Target 2026 naik saat kapasitas pungut belum terbukti | Target naik 9,13% ke Rp200,35 M. Sisa Rp134,62 M harus terkumpul dalam 4 bulan (rata-rata Rp33,66 M/bulan) vs rata-rata realisasi Jan–Agt Rp8,22 M/bulan |
| Ketergantungan transfer tinggi | PAD hanya 11,09% (2024) dan 8,07% (2025, sementara) dari pendapatan terealisasi; anggaran pendapatan 2026 turun 6,7% |
| Data tidak konsisten dan sulit diaudit | Retribusi 2025 tercatat 584% dari target; PAD Juli 2026 Rp14,09 M lalu Rp65,73 M di Agustus; salah ketik pada RLPPD 2024 |
| Data mutakhir tidak tersedia dari satu sumber resmi yang mudah diakses | Angka 2025–2026 hanya dapat ditemukan dari media dan agregator, bukan dari laporan realisasi daerah |
| Rincian per jenis pajak/retribusi tidak tersedia terbuka | Rincian 2024 tidak ditemukan pada sumber yang dapat diakses |

**Akar masalah yang bisa ditangani produk:** (1) tidak ada satu tempat yang memantau target vs realisasi per komponen secara berkala, (2) tidak ada pengecekan kualitas data otomatis, (3) tidak ada peringatan dini saat capaian tertinggal, (4) target disusun tanpa dukungan data historis yang mudah dipakai.

**Yang bukan akar masalah produk ini:** rendahnya potensi ekonomi, tarif pajak, dan kepatuhan wajib pajak, yang butuh kebijakan dan penegakan, bukan hanya perangkat lunak.

---

## 2. Pengguna dan Persona

### Target pengguna
Aparatur Pemkab Tulang Bawang yang menyusun, memungut, mencatat, dan mengawasi PAD.

### Persona 1: "Pak Hadi — Kepala Bapenda" (pengambil keputusan operasional; tokoh fiktif)
- Tanggung jawab: capaian pajak dan retribusi, monev OPD pengelola retribusi.
- Kebutuhan: tahu tiap bulan komponen mana yang tertinggal, seberapa jauh dari target, dan OPD mana yang perlu ditegur.
- Hambatan saat ini: data masuk dari beberapa OPD dalam format berbeda; kesimpulan baru terlihat di akhir tahun.

### Persona 2: "Bu Rina — Staf BPKAD (verifikator data)"
- Tanggung jawab: konsolidasi realisasi, rekonsiliasi dengan SIKD/LRA.
- Kebutuhan: angka yang konsisten, jejak perubahan, dan penanda otomatis saat angka janggal (misalnya realisasi jauh di atas target).
- Hambatan saat ini: menemukan anomali secara manual.

### Persona 3: "Pak Dedi — Operator OPD pengelola retribusi"
- Tanggung jawab: mengisi realisasi retribusi OPD-nya.
- Kebutuhan: form input sederhana, tahu data mana yang ditolak dan kenapa.

### Pengguna sekunder
- **Bappeda/TAPD:** menyusun target APBD dan APBD-P berdasarkan data historis.
- **Bupati/Sekda:** ringkasan satu halaman.
- **Inspektorat dan DPRD (akses baca):** transparansi dan pengawasan.

---

## 3. Goals dan Non-Goals

### Goals (MVP)
1. Menyediakan satu sumber data terpusat untuk target dan realisasi PAD per komponen, per jenis pajak/retribusi, dan per OPD, per bulan.
2. Menampilkan capaian vs target dan proyeksi akhir tahun, sehingga kesenjangan terlihat sebelum akhir tahun.
3. Mendeteksi otomatis anomali data (misal capaian di atas ambang, lonjakan bulanan tidak wajar) dan mewajibkan verifikasi sebelum angka dipublikasikan.
4. Menghasilkan laporan standar yang dapat diekspor untuk rapat monev.
5. Mencatat jejak audit setiap perubahan data.

### Non-Goals (MVP, tidak dikerjakan sekarang)
1. **Bukan pengganti SIPD, SIKD, atau sistem akuntansi daerah.** Produk ini membaca dan merekonsiliasi, bukan menjadi buku besar.
2. **Tidak memproses pembayaran** (e-billing, QRIS, payment gateway). Elektronifikasi transaksi (ETPD) ditangani sistem lain.
3. **Tidak menghitung ketetapan pajak** (SPPT PBB, SKPD) dan tidak mengelola objek pajak per wajib pajak.
4. **Tidak ada portal wajib pajak.**
5. **Tidak memberi estimasi potensi pajak berbasis model** (butuh data objek pajak; masuk v2).
6. **Tidak mengubah tarif atau kebijakan.**

---

## 4. User Stories

**Pimpinan dan Bapenda**
- Sebagai Kepala Bapenda, saya ingin melihat capaian PAD vs target per komponen bulan ini, supaya saya tahu mana yang tertinggal sebelum terlambat.
- Sebagai Kepala Bapenda, saya ingin melihat proyeksi akhir tahun berdasarkan laju realisasi saat ini, supaya saya bisa memutuskan perlu tindakan atau revisi target pada APBD-P.
- Sebagai Sekda, saya ingin ringkasan satu halaman yang bisa dicetak, supaya saya bisa memakainya di rapat.

**BPKAD (verifikator)**
- Sebagai verifikator, saya ingin sistem menandai angka yang janggal, supaya saya tidak menemukannya secara manual di akhir tahun.
- Sebagai verifikator, saya ingin mengimpor data realisasi dari file Excel/CSV, supaya saya tidak mengetik ulang.
- Sebagai verifikator, saya ingin menyetujui atau menolak data dengan catatan, supaya ada jejak keputusan.

**OPD pengelola retribusi**
- Sebagai operator OPD, saya ingin mengisi realisasi bulanan melalui form per jenis retribusi, supaya data langsung masuk tanpa menunggu pengumpulan manual.
- Sebagai operator OPD, saya ingin tahu alasan penolakan data, supaya bisa memperbaikinya cepat.

**Bappeda/TAPD**
- Sebagai perencana, saya ingin melihat tren target vs realisasi beberapa tahun per komponen, supaya target tahun depan dibuat berdasarkan data.

**Pengawas**
- Sebagai Inspektorat, saya ingin membaca data dan jejak perubahan tanpa dapat mengubahnya, supaya pengawasan independen.

---

## 5. Daftar Fitur

### MVP
| Fitur | Keterangan |
|---|---|
| Manajemen master data | Daftar komponen PAD, jenis pajak/retribusi, kode rekening, OPD pemungut |
| Input target | Target per akun per versi anggaran (APBD murni, APBD-P) |
| Input/impor realisasi | Form manual per OPD dan impor Excel/CSV, per bulan |
| Alur verifikasi | Draf → diajukan → diverifikasi/ditolak → dipublikasikan |
| Dashboard capaian | Target vs realisasi per komponen, jenis, OPD, bulan, tahun |
| Proyeksi akhir tahun | Berdasarkan laju realisasi dan pola musiman historis |
| Deteksi anomali | Aturan ambang yang dapat dikonfigurasi (Bagian 6.5) |
| Laporan dan ekspor | PDF/Excel ringkasan bulanan dan tahunan |
| Peran dan hak akses | Admin, verifikator, operator OPD, pimpinan, pengawas (baca saja) |
| Jejak audit | Setiap perubahan data tercatat |

### v2
| Fitur | Keterangan |
|---|---|
| Integrasi otomatis SIKD/SIPD/ETPD | Menarik data tanpa impor manual (bergantung ketersediaan API) |
| Pemodelan potensi | Estimasi potensi per jenis pajak (memerlukan data objek pajak) |
| Notifikasi dan pengingat | Peringatan capaian tertinggal, tenggat input OPD |
| Skenario target | Simulasi target APBD-P |
| Pemetaan wilayah | Capaian per kecamatan |

### Nanti
| Fitur | Keterangan |
|---|---|
| Portal transparansi publik | Ringkasan PAD terbuka bagi masyarakat |
| Prediksi berbasis model statistik lanjutan | Setelah deret data cukup panjang |
| Integrasi data wajib pajak | Tunggakan per objek, bila mandat dan kebijakan data tersedia |

---

## 6. Functional Requirements (MVP)

### 6.1 Master data
- **FR-1.1** Sistem menyimpan hierarki: Komponen PAD (Pajak Daerah, Retribusi Daerah, Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan, Lain-lain PAD yang Sah) → Jenis → Rincian objek, dengan kode rekening.
- **FR-1.2** Setiap akun dipetakan ke satu OPD pemungut (atau lebih, bila dibagi).
- **FR-1.3** Perubahan struktur akun tidak boleh mengubah data historis; akun lama dinonaktifkan, bukan dihapus.
- **FR-1.4** Sistem menyimpan pemetaan akun antar tahun supaya perbandingan multi-tahun tetap sah ketika klasifikasi berubah (lihat Edge Case E-2).

### 6.2 Target
- **FR-2.1** Admin/Bappeda dapat memasukkan target per akun per versi (APBD murni, APBD-P).
- **FR-2.2** Total target semua akun PAD harus sama dengan target PAD yang diinput sebagai total; selisih ditampilkan sebelum disimpan.
- **FR-2.3** Hanya satu versi yang berstatus "berlaku" pada satu waktu; versi lama tetap dapat dilihat.

### 6.3 Realisasi
- **FR-3.1** Operator OPD memasukkan realisasi bulanan per akun untuk OPD-nya sendiri.
- **FR-3.2** Verifikator dapat mengimpor file Excel/CSV dengan templat baku; sistem memvalidasi format, kode akun, dan periode, lalu melaporkan baris gagal beserta alasannya.
- **FR-3.3** Setiap entri memiliki status: Draf, Diajukan, Diverifikasi, Ditolak, Dipublikasikan. Hanya status Dipublikasikan yang muncul di dashboard dan laporan.
- **FR-3.4** Entri ditolak wajib disertai catatan alasan.
- **FR-3.5** Setiap entri mencatat **sumber data** (input manual, impor, rekonsiliasi SIKD) dan tanggal posisi data.
- **FR-3.6** Koreksi atas data yang sudah dipublikasikan dibuat sebagai revisi baru, bukan menimpa; versi sebelumnya tetap tersimpan.

### 6.4 Dashboard dan proyeksi
- **FR-4.1** Dashboard menampilkan: total PAD target vs realisasi, persentase capaian, porsi tiap komponen, dan tren bulanan.
- **FR-4.2** Dapat disaring per tahun, bulan, komponen, jenis, dan OPD.
- **FR-4.3** Menampilkan **kesenjangan**: sisa target, jumlah bulan tersisa, dan kebutuhan rata-rata per bulan dibandingkan rata-rata realisasi berjalan (contoh posisi Agustus 2026: kebutuhan Rp33,66 M/bulan vs rata-rata Rp8,22 M/bulan).
- **FR-4.4** Menampilkan proyeksi akhir tahun dengan metode yang jelas dan dapat dibaca pengguna (default: laju rata-rata berjalan; opsi: pola bulanan tahun-tahun sebelumnya bila ada ≥ 2 tahun data). Proyeksi selalu diberi label sebagai perkiraan.
- **FR-4.5** Menampilkan porsi PAD terhadap total pendapatan daerah bila data total pendapatan diinput (indikator ketergantungan fiskal).
- **FR-4.6** Perbandingan multi-tahun per komponen.

### 6.5 Deteksi anomali (aturan awal, ambang dapat dikonfigurasi admin)
| Kode | Aturan | Ambang usulan (perlu konfirmasi) |
|---|---|---|
| A-1 | Realisasi akun melebihi persentase tertentu dari target | > 120% |
| A-2 | Realisasi akun sangat rendah menjelang akhir tahun | < 50% setelah bulan ke-9 |
| A-3 | Lonjakan atau penurunan bulanan tidak wajar pada total PAD | perubahan > 3× rata-rata bulanan sebelumnya |
| A-4 | Realisasi kumulatif turun dibanding bulan sebelumnya | turun sama sekali |
| A-5 | Total komponen tidak sama dengan total PAD yang diinput | selisih ≠ 0 |
| A-6 | Akun tanpa target tetapi ada realisasi (atau sebaliknya) | ada |
- **FR-5.1** Entri yang melanggar aturan otomatis diberi tanda dan **tidak bisa dipublikasikan sebelum verifikator memberi penjelasan atau koreksi**.
- **FR-5.2** Daftar anomali dapat dilihat, disaring, dan ditutup dengan catatan penjelasan.
- **FR-5.3** Admin dapat menyesuaikan ambang dan menonaktifkan aturan; setiap perubahan tercatat.

### 6.6 Laporan
- **FR-6.1** Laporan bulanan: capaian per komponen, per OPD, kesenjangan, daftar anomali terbuka.
- **FR-6.2** Laporan tahunan: realisasi vs target dan tren multi-tahun.
- **FR-6.3** Ekspor PDF dan Excel. Setiap laporan memuat tanggal posisi data dan status verifikasi.

### 6.7 Hak akses
| Peran | Hak |
|---|---|
| Admin | Kelola pengguna, master data, ambang anomali |
| Verifikator (BPKAD/Bapenda) | Impor, verifikasi, publikasi, revisi |
| Operator OPD | Input dan ajukan data OPD sendiri |
| Pimpinan | Baca dashboard dan laporan |
| Pengawas | Baca semua, termasuk jejak audit; tidak dapat mengubah |
| Perencana (Bappeda/TAPD) | Input target, baca dashboard |
- **FR-7.1** Operator OPD hanya melihat dan mengubah data OPD-nya.
- **FR-7.2** Autentikasi dengan kata sandi kuat; dukungan autentikasi dua faktor untuk Admin dan Verifikator.

### 6.8 Jejak audit
- **FR-8.1** Mencatat siapa, kapan, apa (nilai lama dan baru) untuk setiap perubahan target, realisasi, status, dan konfigurasi.
- **FR-8.2** Log tidak dapat diubah atau dihapus oleh peran mana pun, termasuk Admin.

---

## 7. Kebutuhan Non-Fungsional

| ID | Kebutuhan |
|---|---|
| NF-1 | Dashboard memuat dalam waktu yang wajar pada koneksi biasa (target usulan < 3 detik untuk data satu tahun) |
| NF-2 | Data dicadangkan otomatis harian; pemulihan diuji berkala |
| NF-3 | Seluruh tampilan Bahasa Indonesia; format angka Rp dan satuan (juta/miliar) konsisten |
| NF-4 | Berjalan di peramban modern pada desktop dan tablet; tampilan ponsel dapat dibaca |
| NF-5 | Data keuangan daerah diperlakukan sebagai data sensitif; akses sesuai peran, komunikasi terenkripsi |
| NF-6 | Kepatuhan pada ketentuan pelindungan data dan keamanan informasi pemerintah daerah (rincian: Open Question #8) |
| NF-7 | Penyimpanan di lingkungan yang disetujui Pemkab (lihat Open Question #4) |

---

## 8. Sketsa Data Model

| Entitas | Field kunci |
|---|---|
| `Pengguna` | id, nama, email, peran, id_opd, status_aktif |
| `OPD` | id, nama, kode |
| `AkunPAD` | id, kode_rekening, nama, komponen (enum), jenis, id_akun_induk, id_opd_pemungut, aktif_dari, aktif_sampai |
| `PemetaanAkun` | id, id_akun_lama, id_akun_baru, tahun_berlaku, catatan |
| `VersiAnggaran` | id, tahun, jenis (murni/perubahan), status_berlaku |
| `Target` | id, id_akun, id_versi, nilai_rp |
| `Realisasi` | id, id_akun, tahun, bulan, nilai_rp_kumulatif, status, sumber, tanggal_posisi, revisi_ke, diinput_oleh, diverifikasi_oleh |
| `ImporBerkas` | id, nama_berkas, diunggah_oleh, waktu, jumlah_baris, jumlah_gagal, ringkasan_galat |
| `AturanAnomali` | id, kode, deskripsi, ambang, aktif |
| `Anomali` | id, id_realisasi, id_aturan, status (terbuka/ditutup), catatan_penjelasan, ditutup_oleh |
| `TotalPendapatanDaerah` | id, tahun, bulan, anggaran, realisasi, transfer, sumber |
| `LogAudit` | id, id_pengguna, aksi, entitas, nilai_lama, nilai_baru, waktu |

Catatan desain: `Realisasi` menyimpan **nilai kumulatif** per bulan (sesuai praktik laporan realisasi) dan menurunkan nilai bulanan dengan selisih; ini memungkinkan aturan A-4. Nilai kumulatif vs bulanan perlu dikonfirmasi (Open Question #6).

---

## 9. Edge Case dan Failure State

| No | Kondisi | Perilaku yang diharapkan |
|---|---|---|
| E-1 | Impor berkas dengan kode akun tidak dikenal | Baris ditolak dengan alasan; baris valid lain tetap diproses; ringkasan galat ditampilkan |
| E-2 | Klasifikasi akun berubah antar tahun (mirip temuan retribusi vs Lain-lain PAD 2025) | Perbandingan multi-tahun memakai `PemetaanAkun`; bila tidak ada pemetaan, dashboard menampilkan peringatan "perbandingan tidak sepadan" dan menawarkan perbandingan di level total |
| E-3 | Realisasi jauh melebihi target (mis. 584%) | Ditandai A-1; tidak dapat dipublikasikan sebelum dijelaskan |
| E-4 | Lonjakan besar antar bulan akibat input terlambat (mirip Juli→Agustus 2026) | Ditandai A-3; verifikator dapat menandai "input terlambat" dan sistem menampilkan catatan di grafik |
| E-5 | Data bulan tertentu belum masuk | Dashboard menampilkan "data belum lengkap" pada bulan itu dan tidak menghitung proyeksi dari bulan kosong |
| E-6 | Dua pengguna mengubah entri yang sama | Penguncian entri atau penolakan simpan konflik dengan pesan jelas |
| E-7 | Revisi data yang sudah dipublikasikan dan dipakai di laporan lama | Laporan lama tetap menampilkan nilai saat dibuat (dengan tanggal posisi); versi baru ditandai |
| E-8 | Operator OPD mencoba mengakses OPD lain | Ditolak dan dicatat di log |
| E-9 | Total komponen ≠ total PAD yang diinput | Ditandai A-5 |
| E-10 | Penghentian layanan atau kehilangan data | Pulihkan dari cadangan harian; kehilangan maksimal satu hari data |
| E-11 | Pengguna mengekspor laporan berisi data belum diverifikasi | Hanya data berstatus Dipublikasikan yang diekspor; data lain dikecualikan atau diberi label eksplisit |

---

## 10. Metrik Keberhasilan

> Baseline berasal dari dokumen PAD (angka 2025–2026 sementara). **Target numerik belum ditetapkan** karena belum ada baseline operasional produk ini; nilai di kolom "Usulan" harus disetujui pemangku kepentingan.

| Metrik | Baseline | Usulan arah |
|---|---|---|
| Waktu dari akhir bulan sampai angka terverifikasi tersedia di dashboard | Tidak diketahui | Ditetapkan setelah pengukuran awal 2–3 bulan |
| Persentase entri realisasi yang disampaikan OPD tepat waktu | Tidak diketahui | Naik dari baseline |
| Anomali yang terdeteksi sistem sebelum publikasi vs yang baru ditemukan setelah publikasi | Anomali ditemukan pasca-publikasi (584% retribusi 2025) | Menuju 0 anomali ditemukan pasca-publikasi |
| Selisih proyeksi akhir tahun (diukur pada bulan ke-8) vs realisasi akhir | n/a | Dipantau; ambang kualitas proyeksi ditetapkan setelah satu siklus tahunan |
| Penggunaan: jumlah pengguna aktif bulanan dari tiap peran | n/a | Seluruh Verifikator dan OPD pengelola retribusi aktif tiap bulan |
| Kualitas target: selisih target dan realisasi PAD | 74,56% (2024); 45,36% (2025, sementara) | Capaian lebih dekat ke 100% pada penyusunan target berbasis data (hasil kebijakan, bukan hanya produk) |

Catatan: capaian PAD itu sendiri dipengaruhi kebijakan, ekonomi, dan kepatuhan. Produk ini diukur dari kualitas data dan kecepatan keputusan, bukan dijanjikan menaikkan PAD secara langsung.

---

## 11. Open Questions

1. **Apakah tafsiran produk ini benar?** PRD ini berasumsi produknya adalah sistem monitoring PAD internal Pemkab. Jika yang dimaksud produk lain (misal aplikasi pembayaran pajak atau portal wajib pajak), PRD perlu disusun ulang.
2. **Siapa pemilik produk dan sponsor?** Bapenda, BPKAD, atau Bappeda? Menentukan prioritas fitur dan siapa yang menyetujui data.
3. **Platform:** web saja atau perlu aplikasi seluler? Diasumsikan web responsif.
4. **Hosting dan infrastruktur:** server milik Pemkab, pusat data pemerintah, atau awan? Ada ketentuan lokasi data?
5. **Ketersediaan integrasi:** apakah SIKD/SIPD/ETPD Tulang Bawang menyediakan API atau hanya ekspor berkas? MVP diasumsikan impor Excel/CSV.
6. **Format data realisasi:** kumulatif atau bulanan, level rincian objek apa, dan templat apa yang dipakai OPD saat ini?
7. **Ambang anomali:** angka di Bagian 6.5 hanya usulan; perlu validasi verifikator.
8. **Kepatuhan:** regulasi apa yang berlaku untuk keamanan informasi dan akses data keuangan daerah, termasuk keterbukaan kepada DPRD dan publik?
9. **Cakupan OPD pada fase awal:** seluruh OPD pemungut atau hanya Bapenda dan OPD retribusi terbesar?
10. **Anggaran, tim, dan jadwal:** belum diketahui; rencana rilis di bawah bersifat urutan, bukan tanggal.
11. **Rincian data historis:** apakah data PAD per jenis pajak/retribusi 2022–2025 tersedia untuk dimuat awal? Dokumen PAD tidak menemukannya.
12. **Hasil verifikasi anomali 2025:** penyebab retribusi 584% dan lonjakan Juli→Agustus 2026 belum diketahui; hasilnya memengaruhi aturan deteksi dan pemetaan akun.

---

## 12. Urutan Rilis

| Fase | Cakupan |
|---|---|
| Fase 1 (MVP inti) | Master data, input target, impor/input realisasi, alur verifikasi, dashboard capaian dan kesenjangan, jejak audit, peran akses |
| Fase 2 | Deteksi anomali penuh, proyeksi akhir tahun, laporan PDF/Excel, perbandingan multi-tahun |
| Fase 3 (v2) | Integrasi otomatis, notifikasi, simulasi target, pemodelan potensi |

(Anomali dasar A-1 dan A-5 sebaiknya masuk Fase 1 karena menyangkut masalah data yang sudah terbukti.)

---

*Dokumen ini turunan dari analisis PAD Kabupaten Tulang Bawang. Angka baseline 2025–2026 bersifat sementara dan perlu diperbarui dengan laporan realisasi teruji sebelum dipakai sebagai target atau tolok ukur formal.*
