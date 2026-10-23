/**
 * Database Studi Kasus Algoritma dan Pemrograman C++
 * Menyediakan data studi kasus terstruktur dengan kode C++ dan penjelasannya.
 */

const DEFAULT_CASE_STUDIES = [
    {
        id: "kasus-1",
        title: "Sistem Kasir & Diskon Bertingkat",
        category: "Percabangan & Array",
        level: "Mudah",
        date: "2026-10-01",
        author: "Tim Alpro",
        description: "Menghitung total belanja dengan diskon member bertingkat, voucher potongan harga, dan kalkulasi PPN 11%.",
        problem: "Sebuah minimarket membutuhkan program kasir otomatis untuk menghitung total tagihan belanja pelanggan. Toko memberlakukan aturan diskon:\n- Belanja >= Rp 500.000 diskon 15%\n- Belanja >= Rp 250.000 diskon 10%\n- Belanja >= Rp 100.000 diskon 5%\nJika pelanggan memiliki kartu member, mereka mendapatkan tambahan diskon 5% dari total setelah diskon belanja. Selain itu, dikenakan PPN sebesar 11%.",
        algorithm: [
            "1. Inisialisasi variabel total belanja, status member, dan diskon.",
            "2. Input jumlah jenis barang yang dibeli dan simpan harga per item dalam array.",
            "3. Hitung subtotal belanja dengan menjumlahkan semua harga item.",
            "4. Periksa kondisi diskon belanja menggunakan struktur if-else if.",
            "5. Cek apakah pembeli adalah member, jika ya hitung diskon tambahan.",
            "6. Hitung PPN 11% dari total setelah diskon.",
            "7. Tampilkan rincian struk pembelian dan uang kembalian."
        ],
        code: `#include <iostream>
#include <iomanip>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "=== SISTEM KASIR MINIMARKET ===" << endl;
    cout << "Masukkan jumlah barang: ";
    cin >> n;

    vector<double> harga(n);
    double subtotal = 0;

    for (int i = 0; i < n; i++) {
        cout << "Harga barang ke-" << i + 1 << ": Rp ";
        cin >> harga[i];
        subtotal += harga[i];
    }

    char statusMember;
    cout << "Apakah memiliki kartu member? (y/n): ";
    cin >> statusMember;

    double diskonBelanja = 0.0;
    if (subtotal >= 500000) {
        diskonBelanja = 0.15;
    } else if (subtotal >= 250000) {
        diskonBelanja = 0.10;
    } else if (subtotal >= 100000) {
        diskonBelanja = 0.05;
    }

    double nominalDiskon = subtotal * diskonBelanja;
    double setelahDiskon1 = subtotal - nominalDiskon;

    double diskonMember = (statusMember == 'y' || statusMember == 'Y') ? 0.05 : 0.0;
    double nominalDiskonMember = setelahDiskon1 * diskonMember;
    double setelahDiskon2 = setelahDiskon1 - nominalDiskonMember;

    double ppn = setelahDiskon2 * 0.11;
    double totalAkhir = setelahDiskon2 + ppn;

    cout << fixed << setprecision(2);
    cout << "\\n================ STRUK BELANJA ================" << endl;
    cout << "Subtotal         : Rp " << subtotal << endl;
    cout << "Diskon Belanja   : Rp " << nominalDiskon << " (" << (diskonBelanja * 100) << "%)" << endl;
    cout << "Diskon Member    : Rp " << nominalDiskonMember << " (" << (diskonMember * 100) << "%)" << endl;
    cout << "PPN (11%)        : Rp " << ppn << endl;
    cout << "-----------------------------------------------" << endl;
    cout << "TOTAL BAYAR      : Rp " << totalAkhir << endl;

    double bayar;
    cout << "Nominal Bayar    : Rp ";
    cin >> bayar;

    if (bayar >= totalAkhir) {
        cout << "Kembalian        : Rp " << (bayar - totalAkhir) << endl;
    } else {
        cout << "Uang kurang      : Rp " << (totalAkhir - bayar) << endl;
    }

    return 0;
}`,
        explanation: "Program ini mendemonstrasikan konsep percabangan bertingkat (if-else), manipulasi array dinamis menggunakan vector, dan operasi aritmetika dasar. Fungsi manipulasi output seperti fixed dan setprecision digunakan untuk memformat tampilan angka pecahan (desimal uang).",
        sampleInput: "Jumlah barang: 3\nHarga: 150000, 200000, 180000\nMember: y\nBayar: 550000",
        sampleOutput: "Subtotal: Rp 530000.00\nDiskon Belanja: Rp 79500.00 (15%)\nDiskon Member: Rp 22525.00 (5%)\nPPN (11%): Rp 47077.25\nTOTAL BAYAR: Rp 475052.25\nKembalian: Rp 74947.75",
        tags: ["Percabangan", "Array", "Perulangan", "Manipulasi I/O"]
    },
    {
        id: "kasus-2",
        title: "Manajemen & Pengurutan Nilai Mahasiswa (Bubble Sort)",
        category: "Sorting & Struct",
        level: "Menengah",
        date: "2026-10-02",
        author: "Tim Alpro",
        description: "Mengelola data nilai mahasiswa menggunakan struct dan mengurutkannya dari peringkat tertinggi ke terendah.",
        problem: "Dosen membutuhkan sistem untuk mendata nilai mahasiswa, menghitung nilai akhir berdasarkan bobot (Tugas 30%, UTS 30%, UAS 40%), menentukan predikat kelulusan (A, B, C, D, E), dan mengurutkan peringkat kelas dari nilai tertinggi ke terendah.",
        algorithm: [
            "1. Definisikan struct Mahasiswa berisi nama, NIM, nilai tugas, UTS, UAS, nilai akhir, dan grade.",
            "2. Input data n mahasiswa ke dalam array of struct.",
            "3. Hitung nilai akhir: (0.3 * tugas) + (0.3 * uts) + (0.4 * uas).",
            "4. Tentukan grade huruf menggunakan kondisi percabangan.",
            "5. Lakukan pengurutan (Sorting) secara descending dengan algoritma Bubble Sort berdasarkan nilai akhir.",
            "6. Tampilkan daftar peringkat mahasiswa dalam bentuk tabel yang rapi."
        ],
        code: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

struct Mahasiswa {
    string nim;
    string nama;
    double tugas, uts, uas;
    double nilaiAkhir;
    char grade;
};

void hitungNilai(Mahasiswa &m) {
    m.nilaiAkhir = (0.30 * m.tugas) + (0.30 * m.uts) + (0.40 * m.uas);
    if (m.nilaiAkhir >= 85) m.grade = 'A';
    else if (m.nilaiAkhir >= 70) m.grade = 'B';
    else if (m.nilaiAkhir >= 55) m.grade = 'C';
    else if (m.nilaiAkhir >= 40) m.grade = 'D';
    else m.grade = 'E';
}

void bubbleSort(Mahasiswa arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].nilaiAkhir < arr[j + 1].nilaiAkhir) {
                Mahasiswa temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n;
    cout << "Masukkan jumlah mahasiswa: ";
    cin >> n;

    Mahasiswa mhs[50];

    for (int i = 0; i < n; i++) {
        cout << "\\nData Mahasiswa ke-" << i + 1 << ":" << endl;
        cout << "NIM    : "; cin >> mhs[i].nim;
        cin.ignore();
        cout << "Nama   : "; getline(cin, mhs[i].nama);
        cout << "Tugas  : "; cin >> mhs[i].tugas;
        cout << "UTS    : "; cin >> mhs[i].uts;
        cout << "UAS    : "; cin >> mhs[i].uas;
        hitungNilai(mhs[i]);
    }

    bubbleSort(mhs, n);

    cout << "\\n" << setfill('=') << setw(65) << "=" << endl;
    cout << setfill(' ');
    cout << setw(5) << "Rank" 
         << setw(12) << "NIM" 
         << setw(20) << "Nama" 
         << setw(12) << "Nilai Akhir" 
         << setw(8) << "Grade" << endl;
    cout << setfill('-') << setw(65) << "-" << endl;
    cout << setfill(' ');

    for (int i = 0; i < n; i++) {
        cout << setw(5) << i + 1
             << setw(12) << mhs[i].nim
             << setw(20) << mhs[i].nama
             << setw(12) << fixed << setprecision(2) << mhs[i].nilaiAkhir
             << setw(8) << mhs[i].grade << endl;
    }
    return 0;
}`,
        explanation: "Studi kasus ini menggabungkan tipe data terstruktur (struct), passing by reference (&) pada fungsi kalkulasi nilai, dan algoritma Bubble Sort descending untuk mengurutkan objek kompleks berdasarkan salah satu atributnya.",
        sampleInput: "Jumlah: 2\nMhs 1: NIM=2301, Nama=Budi, Tugas=80, UTS=85, UAS=90\nMhs 2: NIM=2302, Nama=Siti, Tugas=90, UTS=95, UAS=92",
        sampleOutput: "Rank 1: Siti (92.30 - Grade A)\nRank 2: Budi (85.50 - Grade A)",
        tags: ["Struct", "Bubble Sort", "Fungsi", "Tabel Output"]
    },
    {
        id: "kasus-3",
        title: "Pencarian ID Produk: Linear vs Binary Search",
        category: "Searching & Algoritma",
        level: "Menengah",
        date: "2026-10-03",
        author: "Tim Alpro",
        description: "Membandingkan efisiensi algoritma Linear Search dan Binary Search dalam menemukan data katalog gudang.",
        problem: "Gudang e-commerce memiliki ratusan data ID produk yang telah terurut. Sistem membutuhkan fitur pencarian cepat sekaligus menampilkan berapa kali operasi perbandingan (komparasi) yang dilakukan oleh kedua algoritma untuk membuktikan perbedaan kompleksitas O(n) vs O(log n).",
        algorithm: [
            "1. Siapkan dataset ID produk yang sudah berurutan (sorted array).",
            "2. Input ID produk yang ingin dicari (target).",
            "3. Jalankan Linear Search: periksa elemen satu per satu dari indeks 0 hingga n-1, catat counter komparasi.",
            "4. Jalankan Binary Search: tentukan indeks kiri (low) dan kanan (high), cari titik tengah (mid). Jika target < mid, geser high = mid - 1; jika target > mid, geser low = mid + 1. Catat counter komparasi.",
            "5. Bandingkan jumlah langkah/perbandingan yang dibutuhkan kedua metode."
        ],
        code: `#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target, int &steps) {
    steps = 0;
    for (int i = 0; i < arr.size(); i++) {
        steps++;
        if (arr[i] == target) return i;
    }
    return -1;
}

int binarySearch(const vector<int>& arr, int target, int &steps) {
    steps = 0;
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        steps++;
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    // Dataset ID produk terurut
    vector<int> produk = {101, 105, 112, 120, 135, 142, 150, 168, 175, 189, 204, 215, 230, 245, 260, 280};
    
    cout << "=== DAFTAR ID PRODUK TERSEDIA ===" << endl;
    for (int id : produk) cout << id << " ";
    cout << "\\nTotal produk: " << produk.size() << endl;

    int cari;
    cout << "\\nMasukkan ID Produk yang dicari: ";
    cin >> cari;

    int stepsLinear = 0, stepsBinary = 0;
    int idxLinear = linearSearch(produk, cari, stepsLinear);
    int idxBinary = binarySearch(produk, cari, stepsBinary);

    cout << "\\n--- HASIL ANALISIS PENCARIAN ---" << endl;
    if (idxBinary != -1) {
        cout << "Status             : DITEMUKAN pada indeks " << idxBinary << endl;
        cout << "Langkah Linear (O(n))    : " << stepsLinear << " perbandingan" << endl;
        cout << "Langkah Binary (O(log n)): " << stepsBinary << " perbandingan" << endl;
        cout << "Efisiensi          : Binary Search " 
             << (stepsLinear - stepsBinary) << " langkah lebih cepat!" << endl;
    } else {
        cout << "Status: ID Produk TIDAK DITEMUKAN!" << endl;
    }

    return 0;
}`,
        explanation: "Binary Search membagi ruang pencarian menjadi setengah di setiap langkah, menjadikannya sangat efisien untuk data terurut dengan kompleksitas O(log n) dibandingkan Linear Search yang berjalan secara O(n).",
        sampleInput: "ID dicari: 245",
        sampleOutput: "Ditemukan pada indeks 13\nLangkah Linear: 14 perbandingan\nLangkah Binary: 3 perbandingan\nEfisiensi: Binary Search 11 langkah lebih cepat!",
        tags: ["Binary Search", "Linear Search", "Kompleksitas", "Array"]
    },
    {
        id: "kasus-4",
        title: "Permainan Tic-Tac-Toe Console (Matriks 2D)",
        category: "Array & Matriks 2D",
        level: "Lanjutan",
        date: "2026-10-04",
        author: "Tim Alpro",
        description: "Implementasi logika permainan papan 3x3 dua pemain (X dan O) menggunakan array 2 dimensi.",
        problem: "Membangun game klasik Tic-Tac-Toe berbasis terminal. Dua pemain bergiliran mengisi koordinat kotak (baris dan kolom). Program harus memvalidasi giliran, mencegah input pada kotak yang sudah terisi, dan memeriksa kondisi kemenangan (3 simbol sama horizontal, vertikal, atau diagonal) serta kondisi seri.",
        algorithm: [
            "1. Inisialisasi matriks karakter 3x3 berisi angka '1' sampai '9'.",
            "2. Buat fungsi cetak papan permainan.",
            "3. Lakukan loop permainan bergantian antara Pemain X dan Pemain O.",
            "4. Input nomor kotak dan konversi menjadi indeks baris dan kolom.",
            "5. Validasi: jika kotak kosong, tempatkan simbol pemain. Jika tidak, minta input ulang.",
            "6. Cek kondisi menang: 3 baris sama, 3 kolom sama, atau 2 pola diagonal sama.",
            "7. Cek kondisi seri jika 9 kotak sudah terisi tanpa ada pemenang."
        ],
        code: `#include <iostream>
using namespace std;

char papan[3][3] = { {'1','2','3'}, {'4','5','6'}, {'7','8','9'} };
char pemainSekarang = 'X';

void gambarPapan() {
    cout << "\\n";
    cout << " " << papan[0][0] << " | " << papan[0][1] << " | " << papan[0][2] << "\\n";
    cout << "---|---|---\\n";
    cout << " " << papan[1][0] << " | " << papan[1][1] << " | " << papan[1][2] << "\\n";
    cout << "---|---|---\\n";
    cout << " " << papan[2][0] << " | " << papan[2][1] << " | " << papan[2][2] << "\\n\\n";
}

bool cekMenang() {
    // Cek Baris & Kolom
    for (int i = 0; i < 3; i++) {
        if (papan[i][0] == papan[i][1] && papan[i][1] == papan[i][2]) return true;
        if (papan[0][i] == papan[1][i] && papan[1][i] == papan[2][i]) return true;
    }
    // Cek Diagonal
    if (papan[0][0] == papan[1][1] && papan[1][1] == papan[2][2]) return true;
    if (papan[0][2] == papan[1][1] && papan[1][1] == papan[2][0]) return true;
    return false;
}

bool cekSeri() {
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (papan[i][j] != 'X' && papan[i][j] != 'O') return false;
    return true;
}

int main() {
    int pilihan;
    bool gameBerjalan = true;

    cout << "=== TIC-TAC-TOE C++ CONSOLE ===" << endl;

    while (gameBerjalan) {
        gambarPapan();
        cout << "Pemain " << pemainSekarang << ", pilih nomor kotak (1-9): ";
        cin >> pilihan;

        int baris = (pilihan - 1) / 3;
        int kolom = (pilihan - 1) % 3;

        if (pilihan < 1 || pilihan > 9 || papan[baris][kolom] == 'X' || papan[baris][kolom] == 'O') {
            cout << "Pilihan tidak valid! Coba lagi.\\n";
            continue;
        }

        papan[baris][kolom] = pemainSekarang;

        if (cekMenang()) {
            gambarPapan();
            cout << "SELAMAT! Pemain " << pemainSekarang << " MEMENANGKAN PERMAINAN! 🎉\\n";
            gameBerjalan = false;
        } else if (cekSeri()) {
            gambarPapan();
            cout << "PERMAINAN SERI! Tidak ada pemenang.\\n";
            gameBerjalan = false;
        } else {
            pemainSekarang = (pemainSekarang == 'X') ? 'O' : 'X';
        }
    }
    return 0;
}`,
        explanation: "Menggunakan array dua dimensi 3x3 untuk representasi grafis papan, matematika pembagian dan modulus untuk memetakan input angka 1-9 ke koordinat baris (pilihan-1)/3 dan kolom (pilihan-1)%3, serta fungsi modular pengecekan status game.",
        sampleInput: "Pemain X: 5\nPemain O: 1\nPemain X: 3\nPemain O: 2\nPemain X: 7",
        sampleOutput: "Papan terisi diagonal X (3, 5, 7)\nSELAMAT! Pemain X MEMENANGKAN PERMAINAN! 🎉",
        tags: ["Array 2D", "Game Logic", "Perulangan While", "Fungsi Modular"]
    },
    {
        id: "kasus-5",
        title: "Perhitungan FPB & Simulasi Menara Hanoi",
        category: "Fungsi & Rekursi",
        level: "Lanjutan",
        date: "2026-10-05",
        author: "Tim Alpro",
        description: "Penerapan konsep rekursi untuk mencari Faktor Persekutuan Terbesar (FPB Euclidean) dan menyelesaikan teka-teki Menara Hanoi.",
        problem: "Fungsi rekursif adalah fungsi yang memanggil dirinya sendiri sampai mencapai base case. Dua masalah matematika klasik yang paling elegan diselesaikan dengan rekursi adalah Algoritma Euclidean untuk FPB dan langkah pemindahan cakram pada Menara Hanoi (Tower of Hanoi).",
        algorithm: [
            "1. FPB Rekursif (Euclid): jika b == 0 maka hasilnya a, selain itu fpb(b, a % b).",
            "2. Menara Hanoi Rekursif: pindahkan n-1 cakram dari pasak Asal ke pasak Bantuan.",
            "3. Pindahkan cakram ke-n dari pasak Asal langsung ke pasak Tujuan.",
            "4. Pindahkan n-1 cakram dari pasak Bantuan ke pasak Tujuan menggunakan pasak Asal."
        ],
        code: `#include <iostream>
using namespace std;

// Rekursi FPB (Euclidean Algorithm)
int fpb(int a, int b) {
    if (b == 0) return a;
    return fpb(b, a % b);
}

// Rekursi Menara Hanoi
void menaraHanoi(int n, char asal, char tujuan, char bantuan, int &langkah) {
    if (n == 1) {
        langkah++;
        cout << "Langkah " << langkah << ": Pindahkan cakram 1 dari " << asal << " ke " << tujuan << endl;
        return;
    }
    menaraHanoi(n - 1, asal, bantuan, tujuan, langkah);
    langkah++;
    cout << "Langkah " << langkah << ": Pindahkan cakram " << n << " dari " << asal << " ke " << tujuan << endl;
    menaraHanoi(n - 1, bantuan, tujuan, asal, langkah);
}

int main() {
    cout << "=== STUDI KASUS REKURSI C++ ===" << endl;
    
    // Uji Kasus 1: FPB
    int x = 48, y = 18;
    cout << "\\n1. Perhitungan FPB (" << x << ", " << y << "):" << endl;
    cout << "   FPB = " << fpb(x, y) << endl;

    // Uji Kasus 2: Menara Hanoi
    int cakram = 3;
    int totalLangkah = 0;
    cout << "\\n2. Simulasi Menara Hanoi (" << cakram << " Cakram):" << endl;
    menaraHanoi(cakram, 'A', 'C', 'B', totalLangkah);
    cout << "   Total langkah yang dibutuhkan: " << totalLangkah << " langkah (2^n - 1 = " << (1 << cakram) - 1 << ")" << endl;

    return 0;
}`,
        explanation: "Rekursi menyederhanakan masalah kompleks menjadi sub-masalah identik yang lebih kecil. Base case mencegah stack overflow. Untuk Menara Hanoi dengan n cakram, kompleksitas waktu adalah O(2^n).",
        sampleInput: "Cakram: 3, Pasak: A -> C (bantuan B)",
        sampleOutput: "Langkah 1: Cakram 1 (A -> C)\nLangkah 2: Cakram 2 (A -> B)\nLangkah 3: Cakram 1 (C -> B)\n...\nTotal: 7 langkah",
        tags: ["Rekursi", "Matematika", "Divide and Conquer", "Algoritma Euclid"]
    }
];
