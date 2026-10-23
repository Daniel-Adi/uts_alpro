# 📚 Blog & Repositori Studi Kasus Algoritma dan Pemrograman (C++)

Aplikasi web modern berbasis **HTML5, CSS (Bootstrap 5.3), dan JavaScript** untuk mendokumentasikan, mengarsipkan, serta mempelajari kumpulan studi kasus **Algoritma dan Pemrograman (ALPRO) menggunakan bahasa C++**.

Cocok digunakan untuk dokumentasi praktikum perkuliahan, portofolio pemrograman, maupun penyelesaian tugas/ujian tengah semester (UTS).

---

## ✨ Fitur Utama

1. **Koleksi Studi Kasus C++ Siap Pakai**:
   - 🛒 **Sistem Kasir & Diskon Bertingkat** *(Percabangan & Array)*
   - 📊 **Manajemen & Pengurutan Nilai Mahasiswa** *(Bubble Sort & Struct)*
   - 🔍 **Pencarian ID Produk: Linear vs Binary Search** *(Kompleksitas $O(n)$ vs $O(\log n)$)*
   - 🎮 **Tic-Tac-Toe Console Game** *(Array 2D & Logika Matriks)*
   - 🗼 **Simulasi Menara Hanoi & FPB Euclidean** *(Fungsi Rekursif)*

2. **Detail Komprehensif Setiap Kasus**:
   - **Deskripsi Masalah**: Latar belakang studi kasus nyata/bisnis.
   - **Langkah Algoritma / Pseudocode**: Alur pemecahan masalah langkah demi langkah.
   - **Source Code C++ Berwarna**: Dilengkapi sintaks berwarna menggunakan **Prism.js**.
   - **Tombol Salin Kode (Copy-to-Clipboard)**: Salin source code dalam sekali klik.
   - **Terminal Simulasi**: Preview hasil eksekusi program di layar console/terminal.

3. **Pencarian & Penyaringan Realtime**:
   - Pencarian instan berdasarkan judul, kata kunci, tagar, ataupun kode.
   - Filter berdasarkan kategori topik algoritma.
   - Filter berdasarkan tingkat kesulitan (*Mudah, Menengah, Lanjutan*).

4. **Fitur CRUD Mandiri (Client-Side Storage)**:
   - Tambah studi kasus baru buatan sendiri melalui form modal interaktif.
   - Edit atau hapus studi kasus kapan saja.
   - Data otomatis tersimpan di peramban web (*LocalStorage*), tidak akan hilang saat halaman di-refresh.
   - **Export / Import JSON**: Fitur backup dan pulihkan database studi kasus.
   - Reset ke data bawaan kapan pun diperlukan.

5. **Antarmuka Modern & Responsif**:
   - Mendukung **Mode Gelap (Dark Mode)** dan **Mode Terang (Light Mode)**.
   - Dibuat dengan Bootstrap 5.3 dan ikon Bootstrap Icons yang ramah perangkat seluler (HP) maupun desktop.
   - Bagian **Profil UTS Mahasiswa** yang dapat diubah sesuai nama & NIM.

---

## 📁 Struktur Berkas

```
UTS-ALPRO/
├── index.html          # Halaman utama aplikasi blog studi kasus
├── css/
│   └── style.css       # Kustomisasi styling, dark mode, terminal mockup & animasi
├── js/
│   ├── data.js         # Dataset awal studi kasus algoritma & C++
│   └── app.js          # Logika aplikasi (CRUD LocalStorage, filter, copy code, dll.)
└── README.md           # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

Tidak memerlukan instalasi server backend khusus (seperti PHP/Node.js/Database SQL). Aplikasi ini murni berjalan di sisi peramban web (*client-side*).

1. Buka folder `c:\Users\Aqila\OneDrive\Desktop\UTS-ALPRO` di File Explorer.
2. Klik ganda pada berkas **`index.html`** untuk membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Firefox, dll).
3. Anda dapat langsung membaca studi kasus, menyalin kodenya, atau menambahkan studi kasus C++ baru!

---

## 🛠️ Teknologi yang Digunakan
- **HTML5**: Struktur semantik halaman web.
- **CSS3 & Bootstrap 5.3.3**: Tata letak responsif, kartu komponen, modal dialog, dan grid.
- **Bootstrap Icons 1.11.3**: Ikon visual interaktif.
- **Prism.js**: Pewarnaan sintaks (*syntax highlighting*) kode C++.
- **JavaScript (ES6+)**: Logika filter, pencarian, manipulasi DOM, dan penyimpanan lokal (*LocalStorage*).
