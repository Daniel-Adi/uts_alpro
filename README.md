# Alpro C++ Vault - Blog & Repositori Studi Kasus Algoritma dan Pemrograman

Aplikasi web blog interaktif berbasis **HTML5**, **CSS3 (Bootstrap 5.3)**, dan **JavaScript (ES6)** untuk mendokumentasikan, mempelajari, dan menyimpan studi kasus mata kuliah **Algoritma dan Pemrograman (Alpro)** dengan implementasi bahasa **C++**.

---

## 🌟 Fitur Utama

1. **8 Koleksi Studi Kasus C++ Siap Pakai**:
   - **Kasus 01**: Sistem Kasir & Diskon Bertingkat Toko Swalayan *(Percabangan / If-Else)*
   - **Kasus 02**: Simulasi Tarif Parkir Mall & Validasi Durasi *(Percabangan / Switch-Case)*
   - **Kasus 03**: Pola Piramida Angka & Bintang Bersarang *(Nested Loops / Perulangan)*
   - **Kasus 04**: Statistik Nilai Ujian Mahasiswa & Indeks Kelulusan *(Array 1 Dimensi)*
   - **Kasus 05**: Operasi Perkalian Matriks 2 Dimensi *(Array 2 Dimensi / Matrix Multiplication)*
   - **Kasus 06**: Sistem Manajemen Inventaris Barang Gudang *(Struct & Array of Struct)*
   - **Kasus 07**: Algoritma Bubble Sort & Binary Search pada Data Terurut *(Sorting & Searching)*
   - **Kasus 08**: Deret Bilangan Fibonacci & Faktorial Rekursif *(Fungsi Rekursif)*

2. **Detail Komprehensif Tiap Studi Kasus**:
   - **Problem Statement**: Penjelasan naratif kasus dunia nyata.
   - **Spesifikasi Input & Output**: Format data masukan dan luaran.
   - **Pseudocode**: Alur logika sistematis sebelum diterjemahkan ke kode program.
   - **C++ Source Code Viewer**: Dilengkapi syntax highlighting (`Prism.js`) gaya Okaidia / Dark Developer Theme dengan nomor baris.
   - **Tombol 1-Klik Salin Kode**: Memudahkan mahasiswa menyalin kode ke compiler (Code::Blocks, Dev-C++, VS Code, dll).
   - **Simulasi Terminal Output**: Tampilan mock console hijau/hitam sesuai output eksekusi C++.

3. **Live Search & Filter Multifungsi**:
   - Pencarian instan (live search) berdasarkan judul, kata kunci, tag, pseudocode, maupun sintaks C++.
   - Filter berdasarkan Kategori / Bab (*Percabangan, Perulangan, Array, Struct, Algoritma, Rekursif*).
   - Filter berdasarkan Tingkat Kesulitan (*Mudah, Menengah, Sulit*).

4. **Penyimpanan Lokal (LocalStorage CRUD)**:
   - Pengguna dapat menambahkan studi kasus baru secara mandiri melalui tombol **"Tambah Kasus"**.
   - Edit dan Hapus studi kasus langsung dari browser.
   - Data tersimpan persisten di `localStorage` peramban.

5. **Fitur Ekspor & Impor Data (JSON)**:
   - Ekspor seluruh koleksi kasus ke file `.json` untuk backup atau pengumpulan tugas UTS.
   - Impor file `.json` untuk memuat kasus dari teman atau dosen.
   - Tombol **"Reset ke Data Bawaan"** untuk mengembalikan data awal kapan saja.

6. **Tampilan Modern & Dark / Light Mode Switcher**:
   - Transisi halus antara tema terang (Light) dan gelap (Dark) yang ramah mata.
   - Desain responsif di layar Smartphone, Tablet, hingga Desktop/Laptop.

---

## 📂 Struktur Berkas

```
c:\xampp\htdocs\uts\uts_alpro\
│
├── index.html              # Halaman utama aplikasi blog (Bootstrap 5 + Modal + Layout)
├── README.md               # Dokumentasi proyek
│
└── assets/
    ├── css/
    │   └── style.css       # Styling kustom (Glassmorphism, Terminal Window, Badges, Dark Theme)
    └── js/
        ├── data.js         # Dataset bawaan 8 studi kasus Alpro C++ lengkap
        └── app.js          # Logika aplikasi, state management, filter, LocalStorage CRUD, theme
```

---

## 🚀 Cara Menjalankan Proyek

### Opsi 1: Menggunakan Apache XAMPP (Direkomendasikan)
1. Buka aplikasi **XAMPP Control Panel**.
2. Klik tombol **Start** pada modul **Apache**.
3. Buka peramban (Google Chrome, Edge, Firefox, dll).
4. Akses URL berikut:
   ```text
   http://localhost/uts/uts_alpro/
   ```

### Opsi 2: Buka Langsung Berkas HTML
Anda juga dapat membuka berkas `index.html` langsung dengan klik dua kali (double click) dari File Explorer:
`c:\xampp\htdocs\uts\uts_alpro\index.html`.

---

## 🛠️ Teknologi yang Digunakan
- **HTML5**: Semantik dan struktur dokumen modern.
- **CSS3 & Bootstrap 5.3.3**: Framework CSS responsif dan utilitas modern.
- **Bootstrap Icons 1.11.3**: Ikon antarmuka web.
- **JavaScript (ES6+)**: Logika filter, manipulasi DOM, dan penyimpanan lokal.
- **Prism.js**: Library syntax highlighting untuk bahasa pemrograman C++.
- **SweetAlert2**: Notifikasi toast dan modal dialog interaktif yang elegan.

---
*Dibuat untuk Tugas Proyek UTS Mata Kuliah Algoritma dan Pemrograman (C++)*
