---
name: simpad-government-dashboard-design
description: Panduan desain UI/UX berdasarkan kode HTML/Tailwind SIMPAD Kabupaten Tulang Bawang untuk portal monitoring, optimalisasi, verifikasi, dan audit Pendapatan Asli Daerah (PAD).
---

# Skill Desain UI/UX — SIMPAD Kabupaten Tulang Bawang

## 1. Tujuan Skill

Gunakan skill ini saat merancang, memperbarui, atau membuat halaman web untuk **SIMPAD (Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah)**. Desain harus terasa resmi, terpercaya, rapi, berorientasi data, dan cocok untuk aplikasi administrasi pemerintahan.

Rujukan visualnya adalah kode HTML, Tailwind CSS, dan JavaScript yang diberikan. Kode tersebut mencakup halaman autentikasi dan verifikasi 2FA, dashboard capaian PAD, antrean verifikasi, impor CSV/Excel, deteksi anomali, proyeksi, laporan, master data rekening, kontrol akses berbasis peran, dan jejak audit.

## 2. Prinsip Desain

1. **Institusional dan tepercaya** — gunakan warna navy sebagai fondasi, kontras yang jelas, dan elemen keamanan yang terlihat.
2. **Data-first** — angka capaian, nilai rupiah, status verifikasi, tren, serta anomali harus mudah dipindai.
3. **Hierarki yang konsisten** — judul halaman, ringkasan metrik, filter, tabel, lalu detail atau tindakan.
4. **Fungsional, bukan dekoratif** — ikon, badge, warna status, dan tombol harus membantu pengguna memahami atau melakukan tindakan.
5. **Konsistensi lintas halaman** — gunakan token warna, tipografi, radius, jarak, navigasi, dan pola komponen yang sama.
6. **Responsif** — layout desktop mengutamakan sidebar dan tabel; layar kecil harus tetap bisa digunakan tanpa konten terpotong.
7. **Akses berbasis peran** — tampilkan tindakan sesuai peran pengguna dan bedakan informasi baca-saja dari kontrol yang dapat diedit.

## 3. Arah Visual

- **Gaya:** enterprise government dashboard, modern, formal, bersih, dan padat informasi secara teratur.
- **Latar utama:** biru sangat pucat atau putih kebiruan.
- **Navigasi utama:** panel navy gelap dengan label bagian yang dikelompokkan.
- **Konten:** kartu putih, bayangan halus, garis pemisah tipis, serta ruang kosong yang cukup.
- **Aksen:** hijau untuk status sukses/terverifikasi; merah untuk kesalahan atau anomali; warna amber/terakota untuk menunggu atau perlu perhatian.
- **Motif lokal:** pola geometris terinspirasi siger Lampung dapat digunakan secara halus di panel branding, bukan sebagai hiasan dominan.
- **Jangan:** memakai gradien mencolok, terlalu banyak warna aksen, bayangan berat, animasi berlebihan, atau gaya kartu aplikasi konsumen.

## 4. Design Tokens

### 4.1 Palet warna

Warna di bawah diambil dari konfigurasi Tailwind dalam kode sumber. Gunakan nama token bila memungkinkan.

| Token | Hex | Penggunaan |
|---|---|---|
| `primary` | `#001038` | Tombol utama, judul utama, identitas/navy |
| `primary-container` | `#0F2557` | Sidebar, panel navy sekunder |
| `on-primary` | `#FFFFFF` | Teks di atas warna primary |
| `on-background` | `#0B1C30` | Teks utama |
| `surface` / `background` | `#F8F9FF` | Latar halaman |
| `surface-container-low` | `#EFF4FF` | Panel filter, header tabel, area sekunder |
| `surface-container` | `#E5EEFF` | Tab dan kontrol sekunder |
| `surface-container-high` | `#DCE9FF` | Hover/selected state yang lembut |
| `surface-container-lowest` | `#FFFFFF` | Kartu, form, permukaan utama |
| `on-surface-variant` | `#44464F` | Teks pendamping |
| `outline` | `#757680` | Label sekunder dan outline |
| `outline-variant` | `#C5C6D0` | Garis pemisah/border |
| `secondary` | `#006D30` | Keberhasilan dan status terverifikasi |
| `secondary-container` | `#92F5A4` | Latar badge sukses |
| `secondary-fixed` | `#95F8A7` | Aksen hijau pada panel gelap |
| `tertiary` | `#260B00` | Aksen peringatan tertentu pada metrik |
| `tertiary-fixed` | `#FFDBCA` | Latar status menunggu/perhatian |
| `error` | `#BA1A1A` | Kesalahan, anomali, status ditolak |
| `error-container` | `#FFDAD6` | Latar alert kesalahan |

**Aturan warna status**
- **Terverifikasi/sukses:** hijau dan ikon yang relevan.
- **Menunggu/diajukan:** amber/terakota atau warna perhatian yang konsisten.
- **Ditolak/gagal/anomali:** merah.
- **Informasi/netral:** navy, biru pucat, atau abu-abu.
- Jangan menyampaikan status hanya lewat warna; sertakan teks dan/atau ikon.

### 4.2 Tipografi

Gunakan Google Fonts yang sudah dirujuk kode:

- **Plus Jakarta Sans:** font utama untuk judul, label, isi, navigasi, dan kontrol.
- **JetBrains Mono:** angka metrik, kode referensi, data numerik, nilai rupiah, timestamp, dan data tabel yang perlu disejajarkan.

Skala tipografi yang sesuai dengan token kode:

| Token | Ukuran | Line height | Bobot | Pemakaian |
|---|---:|---:|---:|---|
| `display-lg` | 32 px | 40 px | 700 | Judul halaman utama |
| `headline-xl` | 24 px | 32 px | 700 | Judul bagian besar |
| `headline-lg` | 20 px | 28 px | 600 | Judul kartu/bagian |
| `headline-md` | 16 px | 24 px | 600 | Judul komponen |
| `body-lg` | 15 px | 22 px | 400 | Deskripsi penting |
| `body-md` | 14 px | 20 px | 400 | Isi utama |
| `body-sm` | 13 px | 18 px | 400 | Keterangan dan teks pendukung |
| `label-md` | 12 px | 16 px | 600 | Label, tombol, judul kolom |
| `label-sm` | 11 px | 14 px | 500 | Metadata dan caption |
| `numeric-metric-lg` | 28 px | 34 px | 700 | Angka KPI utama |
| `numeric-metric-md` | 20 px | 26 px | 600 | Angka metrik sekunder |
| `numeric-data-cell` | 13 px | 18 px | 500 | Kode, nominal, angka tabel |

Hindari menggunakan label 11–12 px untuk instruksi penting atau teks panjang. Pertahankan keterbacaan pada layar kecil.

### 4.3 Spacing dan radius

Token jarak dari konfigurasi Tailwind:

| Token | Nilai |
|---|---:|
| `space-xs` | 4 px |
| `space-sm` | 8 px |
| `space-md` | 12 px |
| `gutter` / `margin` | 16 px |
| `space-lg` | 20 px |
| `space-xl` | 32 px |
| `gutter-desktop` | 24 px |
| `margin-desktop` | 32 px |

Radius dari konfigurasi:
- `DEFAULT`: 2 px
- `lg`: 4 px
- `xl`: 8 px
- `full`: 12 px

Gunakan radius 8 px untuk sebagian besar kartu dan kontrol agar konsisten dengan tampilan dashboard. Gunakan radius penuh untuk badge atau indikator status berbentuk pil.

### 4.4 Elevasi dan border

- Kartu: bayangan tipis, misalnya `shadow-sm`.
- Header tetap: bayangan sangat halus dan latar putih dengan transparansi bila diperlukan.
- Border: `outline-variant` atau warna permukaan dengan kontras lembut.
- Hindari menumpuk shadow dan border tebal pada komponen yang sama.

## 5. Pola Layout

### 5.1 Dashboard desktop

Struktur utama:
1. **Sidebar kiri tetap** untuk identitas SIMPAD dan navigasi.
2. **Top bar tetap** untuk tahun anggaran, posisi data terakhir, notifikasi, identitas pengguna, bantuan, dan keluar.
3. **Area konten** dengan padding desktop.
4. **Breadcrumb** di atas judul halaman.
5. **Judul dan deskripsi** yang menjelaskan tujuan halaman.
6. **Ringkasan KPI** sebelum data rinci.
7. **Filter dan pencarian** dekat dengan tabel/grafik yang dikendalikannya.
8. **Area data** berupa kartu, tabel, grafik, atau panel detail.

Pada kode contoh, sidebar menggunakan lebar sekitar `w-72` (18rem/288 px) dan top bar sekitar 64 px. Bila ukuran layar tidak cukup, ubah sidebar menjadi drawer atau navigasi ringkas.

### 5.2 Login dan 2FA

Gunakan layout dua kolom pada desktop:
- **Panel branding kiri:** identitas instansi, nama sistem, tahun anggaran aktif, pesan integritas, dan indikator keamanan.
- **Panel autentikasi kanan:** tab langkah, formulir kredensial, pilihan tahun anggaran, opsi sesi, dan tombol utama.
- **Langkah 2FA:** banner instruksi, enam kotak OTP, masa berlaku kode, kirim ulang, tombol kembali, dan verifikasi.

Di perangkat kecil, susun panel secara vertikal dan pastikan form tetap menjadi fokus utama.

### 5.3 Grid metrik

Gunakan 4 kolom di layar lebar, 2 kolom di tablet, dan 1 kolom di layar kecil. Setiap kartu metrik memiliki:
- label ringkas;
- angka utama dengan font numerik;
- satu baris konteks/perbandingan;
- ikon dalam wadah berwarna lembut;
- status atau keterangan tambahan bila diperlukan.

Contoh metrik dari kode: menunggu verifikasi, terverifikasi, ditolak/dikembalikan, dan anomali terbuka.

### 5.4 Tabel dan panel detail

Pola antrean verifikasi memakai split-pane: tabel di sisi kiri dan detail terpilih di sisi kanan. Terapkan:
- header tabel dengan latar sekunder;
- nomor/kode dokumen yang mudah dikenali;
- tanggal dan metadata sebagai teks pendamping;
- nominal rupiah rata kanan dan memakai font numerik;
- status sebagai badge dengan teks;
- aksi yang jelas dan tidak ambigu;
- baris terpilih dengan highlight halus serta penanda sisi;
- overflow horizontal yang terkendali untuk layar sempit.

Di layar kecil, ubah panel detail menjadi bagian di bawah tabel atau drawer. Jangan mengecilkan teks tabel sampai sulit dibaca.

## 6. Navigasi dan Informasi Arsitektur

Kelompokkan menu berdasarkan tugas pengguna, mengikuti struktur yang tampak dalam kode:

- **Utama:** Dashboard Capaian PAD, Kesenjangan & Proyeksi, Perbandingan Multi-Tahun.
- **Operasional & Verifikasi:** Input Realisasi OPD, Antrean Verifikasi, Impor Berkas CSV/Excel, Deteksi Anomali PAD.
- **Perencanaan & Manajemen:** Input & Perubahan Target, Master Data & Rekening, Laporan & Rekapitulasi, Jejak Audit, Pengaturan Ambang Anomali.
- **Administrasi dan keamanan:** manajemen pengguna, kontrol akses berbasis peran, log aktivitas, dan dokumen penugasan bila tersedia.

Aturan navigasi:
- Tandai menu aktif dengan latar primary dan teks kontras.
- Gunakan ikon Material Symbols yang sesuai dan konsisten.
- Badge angka dipakai hanya untuk jumlah yang memerlukan perhatian.
- Label grup menu lebih kecil dan tidak lebih dominan dari item navigasi.
- Bedakan item yang hanya dapat dibaca atau khusus admin menggunakan label yang jelas.

## 7. Komponen UI

### Tombol
- **Primary:** latar navy, teks putih; untuk tindakan utama seperti Masuk, Sinkronisasi, atau Simpan.
- **Success:** hijau; untuk tindakan konfirmasi/validasi yang benar-benar menyelesaikan langkah.
- **Secondary:** latar biru pucat; untuk kembali, membatalkan, atau tindakan sekunder.
- **Danger:** merah; untuk tindakan destruktif atau penolakan.
- Gunakan label berbasis kata kerja yang spesifik, misalnya “Verifikasi Dokumen”, bukan “OK”.
- Sediakan hover, focus, active, disabled, dan loading state.

### Input dan form
- Latar putih atau `surface-container-low`.
- Ikon di sisi kiri hanya jika membantu mengenali jenis input.
- Label harus selalu terlihat; jangan mengandalkan placeholder sebagai label.
- Tampilkan instruksi dan kesalahan dekat dengan field yang terkait.
- Untuk kata sandi, sediakan kontrol tampil/sembunyi dengan label aksesibel.
- Untuk OTP, dukung keyboard, paste enam digit, fokus otomatis yang wajar, dan navigasi Backspace.
- Jangan pernah menanam kredensial atau kode OTP nyata di source code. Nilai yang terlihat di kode contoh harus diganti dengan placeholder aman sebelum dipakai di lingkungan nyata.

### Badge status
- Bentuk pil dengan teks singkat.
- Pasangkan warna dengan istilah status eksplisit: “Menunggu”, “Terverifikasi”, “Ditolak”, atau “Anomali”.
- Pastikan kontras memadai dan status tidak bergantung pada animasi saja.

### Kartu
- Latar putih, radius 8 px, padding 16–20 px.
- Judul singkat dan jelas.
- Pisahkan isi, metadata, dan tindakan.
- Gunakan shadow ringan; hindari kartu di dalam kartu secara berlebihan.

### Alert dan notifikasi
- Alert error menggunakan `error-container` dan `error`.
- Sertakan ikon, judul, uraian masalah, dan langkah pemulihan bila diketahui.
- Tombol tutup harus memiliki nama aksesibel.
- Alert penting tidak boleh hanya mengandalkan warna atau animasi.

### Grafik dan data
- Judul grafik menjelaskan metrik dan periode.
- Sertakan satuan, legenda, label sumbu, dan sumber/periode data bila relevan.
- Gunakan warna konsisten untuk realisasi, target, proyeksi, dan anomali.
- Berikan alternatif tabel atau ringkasan tekstual jika grafik sulit dibaca.
- Jangan menciptakan angka contoh seolah-olah merupakan data produksi.

### Ikon
Kode menggunakan **Material Symbols Outlined**. Pertahankan gaya outline dan ukuran yang konsisten. Contoh fungsi ikon: dashboard, tren, tabel, dokumen, kalender, pencarian, verifikasi, peringatan, keamanan, pengguna, dan keluar.

## 8. Panduan Per Halaman

### Login dan 2FA
- Tampilkan identitas instansi dan nama SIMPAD dengan jelas.
- Tampilkan domain email kedinasan sebagai petunjuk, bukan sebagai pengganti validasi server.
- Pisahkan langkah kredensial dan verifikasi dua faktor.
- Tampilkan masa berlaku OTP dan opsi kirim ulang.
- Untuk produksi, validasi kredensial dan OTP di backend; UI demo tidak boleh mengklaim autentikasi nyata jika hanya simulasi.

### Dashboard Capaian PAD
- Utamakan ringkasan capaian terhadap target.
- Susun tren kumulatif, komposisi realisasi, dan rincian komponen sebagai kelompok yang jelas.
- Filter tahun/periode harus terlihat dan konsisten.
- Format nominal rupiah secara konsisten.

### Antrean Verifikasi
- Letakkan KPI antrean di atas filter dan tabel.
- Sediakan pencarian, filter OPD, periode, dan status.
- Bedakan dokumen diajukan, terverifikasi, ditolak, dan anomali.
- Tampilkan detail dokumen yang dipilih dan alasan anomali dengan jelas.
- Sediakan jejak keputusan agar proses dapat ditelusuri.

### Impor Berkas CSV/Excel
- Jelaskan format file, ukuran maksimum, kolom wajib, dan aturan validasi.
- Tampilkan pratinjau sebelum impor.
- Laporkan jumlah baris valid, ditolak, dan perlu diperbaiki.
- Jangan langsung mengimpor data jika validasi penting belum selesai.

### Deteksi Anomali
- Tampilkan jenis anomali, tingkat urgensi, periode, entitas terkait, dan alasan deteksi.
- Sediakan detail bukti dan langkah tindak lanjut.
- Bedakan anomali terbuka, sedang diperiksa, dan selesai.
- Jelaskan bahwa hasil deteksi perlu ditinjau petugas; jangan menyajikan dugaan sebagai keputusan final tanpa proses verifikasi.

### Kesenjangan dan Proyeksi
- Pisahkan data aktual, target, estimasi/proyeksi, dan gap.
- Jelaskan periode dan asumsi proyeksi.
- Gunakan visual yang membantu perbandingan, bukan dekorasi.
- Tampilkan rekomendasi tindakan sebagai daftar yang dapat ditindaklanjuti.

### Laporan dan Rekapitulasi
- Sediakan filter periode, OPD, jenis penerimaan, dan status bila sesuai.
- Tampilkan ringkasan eksekutif sebelum rincian.
- Pastikan hasil ekspor konsisten dengan filter yang sedang aktif.
- Tampilkan waktu pembaruan dan konteks data.

### Master Data dan Jejak Audit
- Gunakan tabel terstruktur, pencarian, filter, serta informasi versi/perubahan.
- Bedakan mode baca-saja dari mode edit.
- Log audit perlu menampilkan pelaku, waktu, tindakan, objek, dan hasil.
- Aksi berisiko harus meminta konfirmasi dan menghasilkan catatan audit.

### Manajemen Pengguna dan RBAC
- Tampilkan nama/peran/status akun secara jelas.
- Berikan akses berdasarkan prinsip least privilege.
- Jangan menampilkan tindakan yang tidak diizinkan untuk peran aktif.
- Perubahan hak akses dan penerbitan penugasan harus memiliki konfirmasi dan jejak audit.

## 9. Responsivitas

- **Desktop lebar:** sidebar penuh, top bar, grid KPI 4 kolom, tabel dan detail berdampingan.
- **Tablet:** kurangi grid menjadi 2 kolom; rapikan top bar; pertimbangkan sidebar yang dapat diciutkan.
- **Mobile:** sidebar menjadi drawer, KPI satu kolom atau dua kolom sesuai lebar, filter ditumpuk, tabel dapat digulir horizontal atau ditampilkan sebagai daftar kartu.
- Hindari `position: fixed` yang menutupi isi tanpa menyediakan padding yang sesuai.
- Uji halaman pada lebar sekitar 360 px, 768 px, 1024 px, dan desktop lebar.
- Pastikan tombol dan target sentuh cukup besar serta jarak antar kontrol memadai.

## 10. Aksesibilitas dan UX

- Gunakan struktur heading berurutan (`h1`, `h2`, dan seterusnya).
- Setiap input memiliki label yang terhubung secara semantik.
- Semua kontrol dapat digunakan dengan keyboard dan memiliki focus ring yang terlihat.
- Gunakan `aria-current` untuk menu aktif dan atribut ARIA yang sesuai untuk tab, alert, serta dialog.
- Jangan menyembunyikan scrollbar bila hal itu membuat pengguna tidak menyadari konten yang dapat digulir; bila tabel horizontal, berikan petunjuk yang jelas.
- Sediakan pesan sukses/gagal yang spesifik dan dapat dipahami.
- Hindari animasi berulang yang mengganggu; hormati preferensi reduced motion.
- Pastikan kontras teks dan latar memenuhi pedoman WCAG yang relevan.

## 11. Keamanan: Desain vs Implementasi

Kode contoh memperlihatkan beberapa perilaku simulasi di sisi klien, seperti perpindahan langkah 2FA, penghitungan waktu, pilihan peran cepat, dan alert keberhasilan. Perlakukan itu sebagai **demo antarmuka**, bukan bukti keamanan backend.

Untuk sistem nyata:
- autentikasi, otorisasi, validasi OTP, masa berlaku sesi, dan pembatasan percobaan harus dilakukan di server;
- jangan menaruh password, token, kunci, atau data sensitif di HTML/JavaScript;
- jangan menggunakan tombol simulasi sebagai pengganti validasi backend;
- gunakan HTTPS, pengelolaan sesi yang aman, dan audit log yang terlindungi;
- tampilkan data sensitif hanya kepada peran yang berhak;
- jangan mengklaim kepatuhan sertifikasi keamanan hanya karena teks atau badge ditampilkan pada UI.

## 12. Implementasi Tailwind

Kode sumber memakai Tailwind melalui CDN, konfigurasi warna kustom, font Google, dan Material Symbols. Untuk meniru desain:

1. Definisikan token warna, tipografi, radius, dan spacing di satu konfigurasi.
2. Buat komponen reusable untuk sidebar, top bar, breadcrumb, KPI card, filter bar, status badge, data table, alert, dan form field.
3. Gunakan nama kelas konsisten; hindari menyalin kelas berbeda untuk komponen yang seharusnya sama.
4. Pisahkan data dari markup sehingga angka dan status berasal dari sumber data, bukan teks hard-coded.
5. Pisahkan status UI (loading, success, error, empty) dari data utama.
6. Untuk aplikasi produksi, gunakan proses build Tailwind yang sesuai daripada bergantung pada CDN bila kebijakan proyek mengharuskannya.

Contoh kerangka token Tailwind berdasarkan kode sumber:

```js
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#001038",
        "primary-container": "#0F2557",
        secondary: "#006D30",
        error: "#BA1A1A",
        surface: "#F8F9FF",
        "surface-container-low": "#EFF4FF",
        "surface-container-lowest": "#FFFFFF",
        "on-surface": "#0B1C30",
        outline: "#757680",
        "outline-variant": "#C5C6D0"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        lg: "4px",
        xl: "8px",
        full: "12px"
      }
    }
  }
};
```

## 13. Checklist Kualitas

Sebelum menyelesaikan halaman, periksa:

- [ ] Identitas SIMPAD dan instansi konsisten.
- [ ] Judul halaman menyatakan tujuan dengan jelas.
- [ ] Sidebar dan top bar konsisten di semua halaman dashboard.
- [ ] Warna status digunakan secara konsisten dan disertai teks.
- [ ] KPI menonjol tetapi tidak mengalahkan informasi penting lainnya.
- [ ] Nominal dan kode data menggunakan format yang mudah dipindai.
- [ ] Filter dan pencarian jelas serta berfungsi.
- [ ] Tabel memiliki header, empty state, loading state, dan error state.
- [ ] Tampilan mobile tidak menyebabkan konten atau kontrol terpotong.
- [ ] Semua kontrol dapat diakses dengan keyboard.
- [ ] Data contoh diberi label sebagai data simulasi.
- [ ] Tidak ada password, OTP, atau kredensial nyata yang tertanam di kode.
- [ ] Aksi penting dikonfirmasi dan dapat ditelusuri melalui audit log.
- [ ] UI tidak membuat klaim keamanan atau kepatuhan yang belum diverifikasi.

## 14. Prompt Siap Pakai untuk AI Desain/Coding

> Buat antarmuka web SIMPAD (Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah) untuk pemerintah daerah berdasarkan design skill ini. Gunakan gaya enterprise government dashboard yang formal, tepercaya, rapi, dan berorientasi data. Terapkan palet navy `#001038`, navy sekunder `#0F2557`, latar `#F8F9FF`, panel `#EFF4FF`, hijau sukses `#006D30`, dan merah error `#BA1A1A`. Gunakan Plus Jakarta Sans untuk teks dan JetBrains Mono untuk angka/kode. Buat sidebar kiri, top bar tetap, breadcrumb, judul halaman, kartu KPI, filter, tabel data, badge status, dan panel detail sesuai kebutuhan halaman. Gunakan Material Symbols Outlined, radius sekitar 8 px, shadow tipis, jarak konsisten, serta layout responsif desktop/tablet/mobile. Pertahankan hierarki informasi dan pola komponen antarhalaman. Pastikan label input, focus state, kontras, keyboard navigation, loading/empty/error states, dan aksesibilitas diperhatikan. Gunakan data dummy yang jelas diberi label simulasi. Jangan hard-code password atau OTP dan jangan menganggap validasi frontend sebagai keamanan produksi. Hasilkan kode yang rapi, reusable, dan mudah dipelihara.

## 15. Catatan Sumber

Dokumen skill ini disusun dari struktur HTML, konfigurasi Tailwind, komponen, warna, tipografi, navigasi, dan perilaku UI yang terdapat dalam kode SIMPAD yang diberikan. Saran responsivitas, aksesibilitas, keamanan produksi, dan pemeliharaan komponen merupakan rekomendasi desain/implementasi untuk menggunakan pola tersebut secara lebih andal; bukan klaim bahwa seluruh rekomendasi sudah diterapkan pada kode sumber.
