/**
 * data.js - Data Awal Studi Kasus Algoritma & Pemrograman C++
 * Koleksi studi kasus lengkap untuk materi Alpro (Dasar hingga Lanjut)
 */

const INITIAL_CASES = [
  {
    id: "case-01",
    title: "Sistem Kasir & Diskon Bertingkat Toko Swalayan",
    category: "Percabangan",
    difficulty: "Mudah",
    tags: ["if-else", "operator-logika", "aritmatika"],
    author: "Tim Alpro",
    date: "2026-10-01",
    summary: "Menghitung total belanjaan dengan skema diskon bertingkat berdasarkan nominal belanja dan kepemilikan kartu member.",
    problemStatement: "Sebuah minimarket ingin membuat sistem kasir otomatis. Kasir menerima input total belanja dan status member (Y/T). Ketentuan diskon:\n1. Jika belanja >= Rp 500.000, diskon 15% (jika member, dapat bonus tambahan 5%).\n2. Jika belanja >= Rp 250.000 s.d < Rp 500.000, diskon 10% (member +5%).\n3. Jika belanja >= Rp 100.000 s.d < Rp 250.000, diskon 5% (member +2%).\n4. Belanja di bawah Rp 100.000 tidak mendapat diskon dasar, tetapi member tetap mendapat diskon 2%.\nHitung total diskon dan total bayar akhir.",
    inputFormat: "1. Total belanja (tipe: double/float)\n2. Status member 'Y' atau 'T' (tipe: char)",
    outputFormat: "Total Belanja, Persentase Diskon, Nominal Diskon, dan Total Akhir Bayar dalam format Rupiah.",
    pseudocode: `MULAI
  DEKLARASI totalBelanja, persenDiskon, nominalDiskon, totalBayar
  DEKLARASI statusMember
  
  BACA totalBelanja, statusMember
  persenDiskon = 0
  
  JIKA totalBelanja >= 500000 MAKA
      persenDiskon = 15
  SELAIN_ITU JIKA totalBelanja >= 250000 MAKA
      persenDiskon = 10
  SELAIN_ITU JIKA totalBelanja >= 100000 MAKA
      persenDiskon = 5
  AKHIR_JIKA
  
  JIKA statusMember == 'Y' ATAU statusMember == 'y' MAKA
      JIKA totalBelanja >= 250000 MAKA
          persenDiskon = persenDiskon + 5
      SELAIN_ITU
          persenDiskon = persenDiskon + 2
      AKHIR_JIKA
  AKHIR_JIKA
  
  nominalDiskon = totalBelanja * (persenDiskon / 100)
  totalBayar = totalBelanja - nominalDiskon
  
  TAMPILKAN totalBelanja, persenDiskon, nominalDiskon, totalBayar
SELESAI`,
    cppCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double totalBelanja, persenDiskon = 0.0, nominalDiskon, totalBayar;
    char statusMember;

    cout << "========================================" << endl;
    cout << "     SISTEM KASIR MINIMARKET CERIA      " << endl;
    cout << "========================================" << endl;

    cout << "Masukkan total belanja (Rp): ";
    cin >> totalBelanja;

    cout << "Apakah memiliki kartu member? (Y/T): ";
    cin >> statusMember;

    // Menentukan diskon dasar berdasarkan total belanja
    if (totalBelanja >= 500000) {
        persenDiskon = 15.0;
    } else if (totalBelanja >= 250000) {
        persenDiskon = 10.0;
    } else if (totalBelanja >= 100000) {
        persenDiskon = 5.0;
    }

    // Tambahan diskon untuk member
    if (statusMember == 'Y' || statusMember == 'y') {
        if (totalBelanja >= 250000) {
            persenDiskon += 5.0;
        } else {
            persenDiskon += 2.0;
        }
    }

    // Perhitungan
    nominalDiskon = totalBelanja * (persenDiskon / 100.0);
    totalBayar = totalBelanja - nominalDiskon;

    // Menampilkan hasil struk
    cout << fixed << setprecision(2);
    cout << "\\n---------------- STRUK PEMBAYARAN ----------------" << endl;
    cout << "Total Belanja   : Rp " << totalBelanja << endl;
    cout << "Status Member   : " << ((statusMember == 'Y' || statusMember == 'y') ? "Ya (Member)" : "Tidak") << endl;
    cout << "Diskon Didapat  : " << persenDiskon << "% (Rp " << nominalDiskon << ")" << endl;
    cout << "--------------------------------------------------" << endl;
    cout << "TOTAL BAYAR     : Rp " << totalBayar << endl;
    cout << "==================================================" << endl;

    return 0;
}`,
    sampleOutput: `========================================
     SISTEM KASIR MINIMARKET CERIA      
========================================
Masukkan total belanja (Rp): 350000
Apakah memiliki kartu member? (Y/T): Y

---------------- STRUK PEMBAYARAN ----------------
Total Belanja   : Rp 350000.00
Status Member   : Ya (Member)
Diskon Didapat  : 15.00% (Rp 52500.00)
--------------------------------------------------
TOTAL BAYAR     : Rp 297500.00
==================================================`
  },
  {
    id: "case-02",
    title: "Simulasi Tarif Parkir Mall & Validasi Durasi",
    category: "Percabangan",
    difficulty: "Mudah",
    tags: ["switch-case", "percabangan", "konversi-waktu"],
    author: "Tim Alpro",
    date: "2026-10-02",
    summary: "Menghitung biaya parkir kendaraan bermotor (Motor/Mobil) berdasarkan jam masuk dan jam keluar.",
    problemStatement: "Buatlah program C++ untuk menghitung biaya parkir kendaraan. Pengguna memasukkan jenis kendaraan (1. Motor, 2. Mobil), jam masuk (format 24 jam), dan jam keluar (format 24 jam).\nAturan tarif:\n- Motor: Rp 2.000 untuk 1 jam pertama, dan Rp 1.000 untuk setiap jam berikutnya.\n- Mobil: Rp 5.000 untuk 1 jam pertama, dan Rp 3.000 untuk setiap jam berikutnya.\n- Jika durasi parkir melebihi 12 jam, dikenakan biaya inap tambahan sebesar Rp 25.000.",
    inputFormat: "1. Jenis kendaraan (1 atau 2)\n2. Jam Masuk (0 - 23)\n3. Jam Keluar (0 - 23)",
    outputFormat: "Total durasi parkir dan total tarif parkir yang harus dibayarkan.",
    pseudocode: `MULAI
  DEKLARASI jenis, jamMasuk, jamKeluar, durasi, totalBiaya
  BACA jenis, jamMasuk, jamKeluar
  
  JIKA jamKeluar >= jamMasuk MAKA
      durasi = jamKeluar - jamMasuk
  SELAIN_ITU
      durasi = (24 - jamMasuk) + jamKeluar
  AKHIR_JIKA
  
  JIKA durasi == 0 MAKA durasi = 1
  
  JIKA jenis == 1 MAKA // Motor
      totalBiaya = 2000 + (durasi - 1) * 1000
  SELAIN_ITU JIKA jenis == 2 MAKA // Mobil
      totalBiaya = 5000 + (durasi - 1) * 3000
  AKHIR_JIKA
  
  JIKA durasi > 12 MAKA
      totalBiaya = totalBiaya + 25000
  AKHIR_JIKA
  
  TAMPILKAN durasi, totalBiaya
SELESAI`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int jenisKendaraan, jamMasuk, jamKeluar, durasi;
    long biaya = 0;

    cout << "=== SISTEM TARIF PARKIR MALL ===" << endl;
    cout << "1. Sepeda Motor" << endl;
    cout << "2. Mobil" << endl;
    cout << "Pilih Jenis Kendaraan (1/2): ";
    cin >> jenisKendaraan;

    if (jenisKendaraan != 1 && jenisKendaraan != 2) {
        cout << "Pilihan jenis kendaraan tidak valid!" << endl;
        return 1;
    }

    cout << "Jam Masuk (format 0 - 23)  : ";
    cin >> jamMasuk;
    cout << "Jam Keluar (format 0 - 23) : ";
    cin >> jamKeluar;

    // Validasi jam
    if (jamMasuk < 0 || jamMasuk > 23 || jamKeluar < 0 || jamKeluar > 23) {
        cout << "Input jam tidak valid!" << endl;
        return 1;
    }

    // Menghitung durasi (mendukung parkir melewati tengah malam)
    if (jamKeluar >= jamMasuk) {
        durasi = jamKeluar - jamMasuk;
    } else {
        durasi = (24 - jamMasuk) + jamKeluar;
    }

    // Jika durasi 0 jam (masuk dan keluar di jam yang sama), dihitung minimal 1 jam
    if (durasi == 0) durasi = 1;

    // Perhitungan tarif berdasarkan jenis
    switch (jenisKendaraan) {
        case 1: // Motor
            biaya = 2000 + (durasi > 1 ? (durasi - 1) * 1000 : 0);
            break;
        case 2: // Mobil
            biaya = 5000 + (durasi > 1 ? (durasi - 1) * 3000 : 0);
            break;
    }

    // Denda inap jika lebih dari 12 jam
    if (durasi > 12) {
        biaya += 25000;
        cout << "* Dikenakan tambahan inap > 12 jam: Rp 25.000 *" << endl;
    }

    cout << "\\n---------- RINCIAN PARKIR ----------" << endl;
    cout << "Kendaraan   : " << (jenisKendaraan == 1 ? "Sepeda Motor" : "Mobil") << endl;
    cout << "Lama Parkir : " << durasi << " Jam" << endl;
    cout << "Total Tarif : Rp " << biaya << endl;
    cout << "------------------------------------" << endl;

    return 0;
}`,
    sampleOutput: `=== SISTEM TARIF PARKIR MALL ===
1. Sepeda Motor
2. Mobil
Pilih Jenis Kendaraan (1/2): 2
Jam Masuk (format 0 - 23)  : 8
Jam Keluar (format 0 - 23) : 22
* Dikenakan tambahan inap > 12 jam: Rp 25.000 *

---------- RINCIAN PARKIR ----------
Kendaraan   : Mobil
Lama Parkir : 14 Jam
Total Tarif : Rp 69000
------------------------------------`
  },
  {
    id: "case-03",
    title: "Pola Piramida Angka & Bintang Bersarang (Nested Loops)",
    category: "Perulangan",
    difficulty: "Menengah",
    tags: ["nested-loops", "for-loop", "pattern-printing"],
    author: "Tim Alpro",
    date: "2026-10-02",
    summary: "Mencetak pola piramida bintang simetris dan segitiga pascal sederhana dengan input tinggi N.",
    problemStatement: "Buatlah program C++ untuk mencetak pola piramida simetris dan segitiga angka bersarang berdasarkan tinggi baris N yang ditentukan oleh pengguna. Studi kasus ini melatih pemahaman perulangan for di dalam for (nested loop) untuk spasi dan karakter.",
    inputFormat: "Sebuah bilangan bulat positif N (tinggi baris, 1 <= N <= 20).",
    outputFormat: "Pola piramida bintang simetris dan piramida angka simetris.",
    pseudocode: `MULAI
  DEKLARASI N, i, j, spasi
  BACA N
  
  // Piramida Bintang
  UNTUK i = 1 SAMPAI N LAKUKAN
      UNTUK spasi = 1 SAMPAI (N - i) LAKUKAN
          CETAK " "
      AKHIR_UNTUK
      UNTUK j = 1 SAMPAI (2 * i - 1) LAKUKAN
          CETAK "*"
      AKHIR_UNTUK
      CETAK_BARIS_BARU
  AKHIR_UNTUK
SELESAI`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Masukkan tinggi piramida (N): ";
    cin >> n;

    if (n <= 0) {
        cout << "Nilai N harus lebih besar dari 0!" << endl;
        return 1;
    }

    cout << "\\n--- Pola 1: Piramida Bintang Simetris ---" << endl;
    for (int i = 1; i <= n; i++) {
        // Cetak spasi di sebelah kiri
        for (int s = 1; s <= (n - i); s++) {
            cout << " ";
        }
        // Cetak bintang
        for (int j = 1; j <= (2 * i - 1); j++) {
            cout << "*";
        }
        cout << endl;
    }

    cout << "\\n--- Pola 2: Piramida Angka Naik-Turun ---" << endl;
    for (int i = 1; i <= n; i++) {
        // Cetak spasi
        for (int s = 1; s <= (n - i); s++) {
            cout << "  ";
        }
        // Cetak angka naik
        for (int j = 1; j <= i; j++) {
            cout << j << " ";
        }
        // Cetak angka turun
        for (int j = i - 1; j >= 1; j--) {
            cout << j << " ";
        }
        cout << endl;
    }

    return 0;
}`,
    sampleOutput: `Masukkan tinggi piramida (N): 5

--- Pola 1: Piramida Bintang Simetris ---
    *
   ***
  *****
 *******
*********

--- Pola 2: Piramida Angka Naik-Turun ---
        1 
      1 2 1 
    1 2 3 2 1 
  1 2 3 4 3 2 1 
1 2 3 4 5 4 3 2 1 `
  },
  {
    id: "case-04",
    title: "Statistik Nilai Ujian Mahasiswa & Indeks Kelulusan",
    category: "Array",
    difficulty: "Menengah",
    tags: ["array-1d", "statistik", "looping", "akumulator"],
    author: "Tim Alpro",
    date: "2026-10-03",
    summary: "Menghitung rata-rata, nilai tertinggi, nilai terendah, simpangan, dan persentase kelulusan menggunakan Array 1D.",
    problemStatement: "Dosen membutuhkan program untuk mengolah sekumpulan nilai ujian mahasiswa (maksimal 100 mahasiswa). Program menerima jumlah mahasiswa N dan nilai masing-masing. Program harus menghasilkan: Nilai rata-rata, nilai tertinggi beserta indeksnya, nilai terendah, dan jumlah mahasiswa yang lulus (nilai >= 60) dan tidak lulus (< 60).",
    inputFormat: "Jumlah mahasiswa N, diikuti oleh N nilai ujian (0 s.d 100).",
    outputFormat: "Daftar nilai, Rata-rata kelas, Nilai Maksimum, Nilai Minimum, dan Persentase Kelulusan.",
    pseudocode: `MULAI
  DEKLARASI N, i, lulusCount = 0
  DEKLARASI nilai[100], total = 0, rataRata, maxNilai, minNilai
  
  BACA N
  UNTUK i = 0 SAMPAI (N - 1) LAKUKAN
      BACA nilai[i]
      total = total + nilai[i]
      JIKA nilai[i] >= 60 MAKA lulusCount = lulusCount + 1
  AKHIR_UNTUK
  
  rataRata = total / N
  maxNilai = nilai[0]
  minNilai = nilai[0]
  
  UNTUK i = 1 SAMPAI (N - 1) LAKUKAN
      JIKA nilai[i] > maxNilai MAKA maxNilai = nilai[i]
      JIKA nilai[i] < minNilai MAKA minNilai = nilai[i]
  AKHIR_UNTUK
  
  TAMPILKAN rataRata, maxNilai, minNilai, lulusCount
SELESAI`,
    cppCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cout << "Masukkan jumlah mahasiswa (maksimal 100): ";
    cin >> n;

    if (n <= 0 || n > 100) {
        cout << "Jumlah mahasiswa harus antara 1 sampai 100!" << endl;
        return 1;
    }

    double nilai[100];
    double total = 0.0;
    int lulus = 0, tidakLulus = 0;

    for (int i = 0; i < n; i++) {
        cout << "Nilai mahasiswa ke-" << (i + 1) << ": ";
        cin >> nilai[i];
        
        while (nilai[i] < 0 || nilai[i] > 100) {
            cout << "  [Error] Nilai harus rentang 0 - 100. Input ulang: ";
            cin >> nilai[i];
        }

        total += nilai[i];
        if (nilai[i] >= 60.0) {
            lulus++;
        } else {
            tidakLulus++;
        }
    }

    double rataRata = total / n;
    double maxNilai = nilai[0];
    double minNilai = nilai[0];
    int idxMax = 0, idxMin = 0;

    for (int i = 1; i < n; i++) {
        if (nilai[i] > maxNilai) {
            maxNilai = nilai[i];
            idxMax = i;
        }
        if (nilai[i] < minNilai) {
            minNilai = nilai[i];
            idxMin = i;
        }
    }

    cout << fixed << setprecision(2);
    cout << "\\n================ LAPORAN REKAP NILAI ================" << endl;
    cout << "Jumlah Mahasiswa     : " << n << endl;
    cout << "Nilai Rata-rata      : " << rataRata << endl;
    cout << "Nilai Tertinggi      : " << maxNilai << " (Mahasiswa ke-" << (idxMax + 1) << ")" << endl;
    cout << "Nilai Terendah       : " << minNilai << " (Mahasiswa ke-" << (idxMin + 1) << ")" << endl;
    cout << "Jumlah Mahasiswa Lulus : " << lulus << " (" << ((double)lulus / n * 100) << "%)" << endl;
    cout << "Jumlah Tidak Lulus     : " << tidakLulus << " (" << ((double)tidakLulus / n * 100) << "%)" << endl;
    cout << "=====================================================" << endl;

    return 0;
}`,
    sampleOutput: `Masukkan jumlah mahasiswa (maksimal 100): 5
Nilai mahasiswa ke-1: 85
Nilai mahasiswa ke-2: 45
Nilai mahasiswa ke-3: 90
Nilai mahasiswa ke-4: 75
Nilai mahasiswa ke-5: 60

================ LAPORAN REKAP NILAI ================
Jumlah Mahasiswa     : 5
Nilai Rata-rata      : 71.00
Nilai Tertinggi      : 90.00 (Mahasiswa ke-3)
Nilai Terendah       : 45.00 (Mahasiswa ke-2)
Jumlah Mahasiswa Lulus : 4 (80.00%)
Jumlah Tidak Lulus     : 1 (20.00%)
=====================================================`
  },
  {
    id: "case-05",
    title: "Operasi Perkalian Matriks 2 Dimensi (Matrix Multiplication)",
    category: "Array",
    difficulty: "Sulit",
    tags: ["array-2d", "matriks", "aljabar-linear", "nested-loop-3"],
    author: "Tim Alpro",
    date: "2026-10-03",
    summary: "Validasi dimensi dan perkalian dua matriks (A x B) dengan ukuran ordo dinamis hingga 10x10.",
    problemStatement: "Dua matriks A (ordo r1 x c1) dan B (ordo r2 x c2) dapat dikalikan HANYA JIKA jumlah kolom matriks A sama dengan jumlah baris matriks B (c1 == r2). Hasil perkalian C berordo r1 x c2. Buat program yang memvalidasi kondisi ini, menginput elemen kedua matriks, dan menghitung matriks hasil kali.",
    inputFormat: "Ordo Matriks A (baris r1, kolom c1), elemen matriks A, ordo Matriks B (baris r2, kolom c2), elemen matriks B.",
    outputFormat: "Matriks A, Matriks B, dan Matriks Hasil Perkalian C.",
    pseudocode: `MULAI
  BACA r1, c1, r2, c2
  JIKA c1 != r2 MAKA
      CETAK "Tidak dapat dikalikan!"
      KELUAR
  AKHIR_JIKA
  
  BACA elemen A[r1][c1]
  BACA elemen B[r2][c2]
  
  UNTUK i = 0 SAMPAI (r1 - 1) LAKUKAN
      UNTUK j = 0 SAMPAI (c2 - 1) LAKUKAN
          C[i][j] = 0
          UNTUK k = 0 SAMPAI (c1 - 1) LAKUKAN
              C[i][j] = C[i][j] + (A[i][k] * B[k][j])
          AKHIR_UNTUK
      AKHIR_UNTUK
  AKHIR_UNTUK
  
  TAMPILKAN Matriks C
SELESAI`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    int r1, c1, r2, c2;

    cout << "=== PERKALIAN DUA MATRIKS (A x B) ===" << endl;
    cout << "Masukkan baris dan kolom matriks A (r1 c1): ";
    cin >> r1 >> c1;

    cout << "Masukkan baris dan kolom matriks B (r2 c2): ";
    cin >> r2 >> c2;

    // Validasi syarat perkalian matriks
    if (c1 != r2) {
        cout << "\\n[Error]: Perkalian Matriks TIDAK DAPAT DILAKUKAN!" << endl;
        cout << "Syarat: Kolom Matriks A (" << c1 << ") harus sama dengan Baris Matriks B (" << r2 << ")." << endl;
        return 1;
    }

    int A[10][10], B[10][10], C[10][10];

    // Input Matriks A
    cout << "\\n--- Input Elemen Matriks A (" << r1 << "x" << c1 << ") ---" << endl;
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            cout << "A[" << i << "][" << j << "]: ";
            cin >> A[i][j];
        }
    }

    // Input Matriks B
    cout << "\\n--- Input Elemen Matriks B (" << r2 << "x" << c2 << ") ---" << endl;
    for (int i = 0; i < r2; i++) {
        for (int j = 0; j < c2; j++) {
            cout << "B[" << i << "][" << j << "]: ";
            cin >> B[i][j];
        }
    }

    // Proses Perkalian Matriks
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    // Output Matriks Hasil C
    cout << "\\n=== MATRIKS HASIL (C = A x B) Ukuran " << r1 << "x" << c2 << " ===" << endl;
    for (int i = 0; i < r1; i++) {
        cout << "[ ";
        for (int j = 0; j < c2; j++) {
            cout << C[i][j] << "\\t";
        }
        cout << "]" << endl;
    }

    return 0;
}`,
    sampleOutput: `=== PERKALIAN DUA MATRIKS (A x B) ===
Masukkan baris dan kolom matriks A (r1 c1): 2 2
Masukkan baris dan kolom matriks B (r2 c2): 2 2

--- Input Elemen Matriks A (2x2) ---
A[0][0]: 1
A[0][1]: 2
A[1][0]: 3
A[1][1]: 4

--- Input Elemen Matriks B (2x2) ---
B[0][0]: 5
B[0][1]: 6
B[1][0]: 7
B[1][1]: 8

=== MATRIKS HASIL (C = A x B) Ukuran 2x2 ===
[ 19	22	]
[ 43	50	]`
  },
  {
    id: "case-06",
    title: "Sistem Manajemen Inventaris Barang Gudang (Struct Data)",
    category: "Struct",
    difficulty: "Menengah",
    tags: ["struct", "array-of-struct", "crud", "fungsi"],
    author: "Tim Alpro",
    date: "2026-10-04",
    summary: "Mengelola rekaman data produk (Kode, Nama, Stok, Harga) menggunakan Struct dan operasi CRUD sederhana.",
    problemStatement: "Buat sistem sederhana berbasis terminal menggunakan `struct` untuk mengelola data inventaris barang toko: menambah produk baru, melihat seluruh daftar produk, dan mencari produk berdasarkan kode barang.",
    inputFormat: "Menu pilihan (1-4), rincian produk (Kode, Nama, Jumlah Stok, Harga Satuan).",
    outputFormat: "Tabel data produk rapi dan hasil pencarian barang.",
    pseudocode: `TIPE_DATA Produk:
    kode: STRING
    nama: STRING
    stok: INTEGER
    harga: DOUBLE
AKHIR_TIPE_DATA

DEKLARASI daftarBarang[50] OF Produk, totalBarang = 0
ULANGI
    TAMPILKAN MENU
    JIKA PILIH 1: TAMBAH_PRODUK()
    JIKA PILIH 2: TAMPILKAN_PRODUK()
    JIKA PILIH 3: CARI_PRODUK_BY_KODE()
SAMPAI PILIH 4 (KELUAR)`,
    cppCode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

struct Produk {
    string kode;
    string nama;
    int stok;
    double harga;
};

const int MAX_PRODUK = 50;
Produk gudang[MAX_PRODUK];
int jumlahProduk = 0;

void tambahProduk() {
    if (jumlahProduk >= MAX_PRODUK) {
        cout << "[Gagal] Kapasitas gudang penuh!" << endl;
        return;
    }
    cout << "\\n--- TAMBAH BARANG BARU ---" << endl;
    cout << "Kode Barang : ";
    cin >> gudang[jumlahProduk].kode;
    cin.ignore();
    cout << "Nama Barang : ";
    getline(cin, gudang[jumlahProduk].nama);
    cout << "Jumlah Stok : ";
    cin >> gudang[jumlahProduk].stok;
    cout << "Harga (Rp)  : ";
    cin >> gudang[jumlahProduk].harga;

    jumlahProduk++;
    cout << "=> Barang berhasil disimpan!" << endl;
}

void tampilkanProduk() {
    if (jumlahProduk == 0) {
        cout << "\\n[Info] Data gudang masih kosong." << endl;
        return;
    }

    cout << fixed << setprecision(2);
    cout << "\\n====================== DAFTAR INVENTARIS GUDANG ======================" << endl;
    cout << left << setw(10) << "KODE" 
         << setw(25) << "NAMA BARANG" 
         << setw(10) << "STOK" 
         << setw(15) << "HARGA (Rp)" << endl;
    cout << "----------------------------------------------------------------------" << endl;
    for (int i = 0; i < jumlahProduk; i++) {
        cout << left << setw(10) << gudang[i].kode
             << setw(25) << gudang[i].nama
             << setw(10) << gudang[i].stok
             << setw(15) << gudang[i].harga << endl;
    }
    cout << "======================================================================" << endl;
}

void cariProduk() {
    if (jumlahProduk == 0) {
        cout << "\\n[Info] Data gudang masih kosong." << endl;
        return;
    }
    string cariKode;
    cout << "\\nMasukkan kode barang yang dicari: ";
    cin >> cariKode;

    bool ditemukan = false;
    for (int i = 0; i < jumlahProduk; i++) {
        if (gudang[i].kode == cariKode) {
            cout << "\\n[Barang Ditemukan!]" << endl;
            cout << "Kode  : " << gudang[i].kode << endl;
            cout << "Nama  : " << gudang[i].nama << endl;
            cout << "Stok  : " << gudang[i].stok << " unit" << endl;
            cout << "Harga : Rp " << gudang[i].harga << endl;
            ditemukan = true;
            break;
        }
    }
    if (!ditemukan) {
        cout << "=> Barang dengan kode '" << cariKode << "' tidak ditemukan." << endl;
    }
}

int main() {
    int pilihan;
    do {
        cout << "\\n=== APLIKASI MANAJEMEN GUDANG ===" << endl;
        cout << "1. Tambah Data Barang" << endl;
        cout << "2. Lihat Seluruh Barang" << endl;
        cout << "3. Cari Barang by Kode" << endl;
        cout << "4. Keluar" << endl;
        cout << "Pilihan Anda (1-4): ";
        cin >> pilihan;

        switch (pilihan) {
            case 1: tambahProduk(); break;
            case 2: tampilkanProduk(); break;
            case 3: cariProduk(); break;
            case 4: cout << "Keluar dari program. Terima kasih!" << endl; break;
            default: cout << "Pilihan tidak valid!" << endl;
        }
    } while (pilihan != 4);

    return 0;
}`,
    sampleOutput: `=== APLIKASI MANAJEMEN GUDANG ===
1. Tambah Data Barang
2. Lihat Seluruh Barang
3. Cari Barang by Kode
4. Keluar
Pilihan Anda (1-4): 2

====================== DAFTAR INVENTARIS GUDANG ======================
KODE      NAMA BARANG              STOK      HARGA (Rp)     
----------------------------------------------------------------------
BRG01     Logitech Mouse Wireless  25        175000.00      
BRG02     Mechanical Keyboard TKL  12        450000.00      
======================================================================`
  },
  {
    id: "case-07",
    title: "Algoritma Bubble Sort & Binary Search pada Data Terurut",
    category: "Algoritma",
    difficulty: "Menengah",
    tags: ["sorting", "bubble-sort", "binary-search", "pencarian"],
    author: "Tim Alpro",
    date: "2026-10-04",
    summary: "Mengurutkan array acak secara Ascending dengan Bubble Sort, kemudian mencari elemen target menggunakan Binary Search.",
    problemStatement: "Pencarian Biner (Binary Search) memiliki kompleksitas O(log N), jauh lebih cepat daripada Linear Search O(N), namun mensyaratkan data harus terurut terlebih dahulu. Implementasikan Bubble Sort untuk mengurutkan array terlebih dahulu, lalu lakukan Binary Search untuk menemukan indeks angka target yang dimasukkan pengguna.",
    inputFormat: "N elemen integer acak dan angka target yang ingin dicari.",
    outputFormat: "Array sebelum sorting, array sesudah sorting, dan status penemuan indeks Binary Search.",
    pseudocode: `MULAI
  BACA arr[], N, target
  
  // 1. Bubble Sort Ascending
  UNTUK i = 0 SAMPAI (N - 2) LAKUKAN
      UNTUK j = 0 SAMPAI (N - i - 2) LAKUKAN
          JIKA arr[j] > arr[j + 1] MAKA
              SWAP(arr[j], arr[j + 1])
          AKHIR_JIKA
      AKHIR_UNTUK
  AKHIR_UNTUK
  
  // 2. Binary Search
  kiri = 0, kanan = N - 1, posisi = -1
  SELAMA kiri <= kanan LAKUKAN
      tengah = kiri + (kanan - kiri) / 2
      JIKA arr[tengah] == target MAKA
          posisi = tengah
          BERHENTI
      SELAIN_ITU JIKA arr[tengah] < target MAKA
          kiri = tengah + 1
      SELAIN_ITU
          kanan = tengah - 1
      AKHIR_JIKA
  AKHIR_SELAMA
  
  TAMPILKAN posisi
SELESAI`,
    cppCode: `#include <iostream>
using namespace std;

// Fungsi Bubble Sort
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapTerjadi = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Tukar nilai
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapTerjadi = true;
            }
        }
        // Optimasi: jika tidak ada swap, array sudah urut
        if (!swapTerjadi) break;
    }
}

// Fungsi Binary Search
int binarySearch(int arr[], int n, int target) {
    int kiri = 0;
    int kanan = n - 1;

    while (kiri <= kanan) {
        int tengah = kiri + (kanan - kiri) / 2;

        if (arr[tengah] == target) {
            return tengah; // Mengembalikan indeks ditemukan
        }
        if (arr[tengah] < target) {
            kiri = tengah + 1; // Cari ke paruh kanan
        } else {
            kanan = tengah - 1; // Cari ke paruh kiri
        }
    }
    return -1; // Tidak ditemukan
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90, 88, 45, 5};
    int n = sizeof(data) / sizeof(data[0]);

    cout << "=== BUBBLE SORT & BINARY SEARCH ===" << endl;
    cout << "Array Awal: ";
    for (int i = 0; i < n; i++) cout << data[i] << " ";
    cout << endl;

    // Mengurutkan array
    bubbleSort(data, n);

    cout << "Array Terurut (Ascending): ";
    for (int i = 0; i < n; i++) cout << data[i] << " ";
    cout << endl;

    int target;
    cout << "\\nMasukkan angka yang ingin dicari (Binary Search): ";
    cin >> target;

    int hasil = binarySearch(data, n, target);
    if (hasil != -1) {
        cout << "=> Sukses! Angka " << target << " ditemukan pada indeks ke-" << hasil << " (posisi ke-" << (hasil + 1) << ")" << endl;
    } else {
        cout << "=> Angka " << target << " TIDAK ADA di dalam array." << endl;
    }

    return 0;
}`,
    sampleOutput: `=== BUBBLE SORT & BINARY SEARCH ===
Array Awal: 64 34 25 12 22 11 90 88 45 5 
Array Terurut (Ascending): 5 11 12 22 25 34 45 64 88 90 

Masukkan angka yang ingin dicari (Binary Search): 25
=> Sukses! Angka 25 ditemukan pada indeks ke-4 (posisi ke-5)`
  },
  {
    id: "case-08",
    title: "Deret Bilangan Fibonacci & Faktorial Rekursif",
    category: "Rekursif",
    difficulty: "Mudah",
    tags: ["fungsi-rekursif", "faktorial", "fibonacci", "call-stack"],
    author: "Tim Alpro",
    date: "2026-10-05",
    summary: "Memahami base case dan recursive call pada komputasi deret matematika faktorial dan Fibonacci.",
    problemStatement: "Fungsi rekursif adalah fungsi yang memanggil dirinya sendiri dengan kondisi penghenti (base case). Buatlah program untuk menghitung:\n1. Nilai Faktorial N (N! = N * (N-1)! dengan 0! = 1).\n2. Deret suku ke-N bilangan Fibonacci (F(n) = F(n-1) + F(n-2) dengan F(0)=0, F(1)=1).",
    inputFormat: "Bilangan bulat non-negatif N.",
    outputFormat: "Hasil Faktorial N! dan deret Fibonacci hingga suku ke-N.",
    pseudocode: `FUNGSI faktorial(n):
    JIKA n <= 1 MAKA KEMBALIKAN 1
    KEMBALIKAN n * faktorial(n - 1)
AKHIR_FUNGSI

FUNGSI fibonacci(n):
    JIKA n <= 0 MAKA KEMBALIKAN 0
    JIKA n == 1 MAKA KEMBALIKAN 1
    KEMBALIKAN fibonacci(n - 1) + fibonacci(n - 2)
AKHIR_FUNGSI`,
    cppCode: `#include <iostream>
using namespace std;

// Fungsi rekursif faktorial
long long faktorial(int n) {
    // Base Case
    if (n <= 1) {
        return 1;
    }
    // Recursive Step
    return n * faktorial(n - 1);
}

// Fungsi rekursif Fibonacci
int fibonacci(int n) {
    // Base Case
    if (n <= 0) return 0;
    if (n == 1) return 1;
    // Recursive Step
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n;

    cout << "=== DEMO FUNGSI REKURSIF (C++) ===" << endl;
    cout << "Masukkan bilangan bulat positif (N): ";
    cin >> n;

    if (n < 0) {
        cout << "Input tidak boleh negatif!" << endl;
        return 1;
    }

    // Faktorial
    cout << "\\n1. Hasil Faktorial (" << n << "!): " << faktorial(n) << endl;

    // Fibonacci
    cout << "2. Deret Fibonacci hingga suku ke-" << n << ":\\n   ";
    for (int i = 0; i <= n; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;

    return 0;
}`,
    sampleOutput: `=== DEMO FUNGSI REKURSIF (C++) ===
Masukkan bilangan bulat positif (N): 7

1. Hasil Faktorial (7!): 5040
2. Deret Fibonacci hingga suku ke-7:
   0 1 1 2 3 5 8 13 `
  }
];
