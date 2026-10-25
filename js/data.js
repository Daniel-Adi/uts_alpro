/**
 * Data studi kasus UTS Alpro.
 * Studi kasus 1-10 hanya judul; studi kasus 08 (kelompok ini) memiliki detail lengkap.
 * Ganti teks ISI_... dengan identitas kelompok.
 */
const IDENTITAS = {
  mataKuliah: "SSI1144 Algoritma dan Pengantar Pemrograman",
  anggota: [
    { nama: "Daniel Adi Nugroho", nim: "322610014", modul: "Program " },
    { nama: "Mellow Laudya Farizty", nim: "322610017", modul: "Dokumentasi " }
  ],
  repository: "https://github.com/Daniel-Adi/uts_alpro"
};

const STUDI_KASUS = [
  {
    "no": 1,
    "judul": "Sistem Pengelolaan Parkir Kampus"
  },
  {
    "no": 2,
    "judul": "Sistem Perhitungan Biaya Laundry"
  },
  {
    "no": 3,
    "judul": "Sistem Pengolahan Nilai Mata Kuliah"
  },
  {
    "no": 4,
    "judul": "Sistem Perhitungan Biaya Pengiriman Paket"
  },
  {
    "no": 5,
    "judul": "Sistem Perhitungan Tagihan Air Rumah Tangga"
  },
  {
    "no": 6,
    "judul": "Sistem Evaluasi Persediaan Barang"
  },
  {
    "no": 7,
    "judul": "Sistem Pendaftaran Seminar Nasional"
  },
  {
    "no": 8,
    "judul": "Sistem Biaya Penggunaan Laboratorium",
    "utama": true,
    "detail": {
      "ringkasan": "Program C++ console yang menghitung biaya penggunaan ruangan dan peralatan laboratorium untuk beberapa kelompok pengguna: tarif bertingkat per jam, tambahan akhir pekan, diskon pengguna internal, denda kerusakan, lalu rekapitulasi pendapatan laboratorium.",
      
"latarBelakang": "Laboratorium kampus digunakan oleh berbagai kelompok, baik dari lingkungan internal kampus maupun pihak eksternal. Pengelola harus menghitung biaya setiap kelompok berdasarkan lama penggunaan, hari penggunaan, jenis pengguna, dan kondisi peralatan setelah dipakai. Perhitungan manual rawan salah karena melibatkan tarif bertingkat, tambahan akhir pekan, diskon, dan denda yang tidak boleh terkena diskon. Oleh karena itu dibuat program yang dapat menghitung biaya setiap kelompok secara konsisten dan menghasilkan rekapitulasi pendapatan secara teratur. Program juga dapat memproses data beberapa kelompok secara berulang sampai petugas memilih mengakhiri proses.",

"rumusanMasalah": [
  "Bagaimana cara menghitung biaya penggunaan berdasarkan tarif bertingkat (dua jam pertama dan jam berikutnya)?",
  "Bagaimana cara menghitung tambahan akhir pekan dan diskon pengguna internal?",
  "Bagaimana cara menghitung denda kerusakan tanpa terkena diskon?",
  "Bagaimana cara memproses data beberapa kelompok secara berulang?",
  "Bagaimana cara membuat rekapitulasi penggunaan dan pendapatan laboratorium?",
  "Bagaimana cara menangani input yang tidak valid agar program tetap berjalan dengan baik?"
],

"tujuanProgram": [
  "Menghitung biaya penggunaan laboratorium berdasarkan durasi, hari, dan jenis pengguna.",
  "Menghitung denda berdasarkan status kerusakan peralatan.",
  "Menampilkan rincian biaya yang harus dibayar setiap kelompok.",
  "Memproses data kelompok secara berulang.",
  "Menghasilkan rekapitulasi penggunaan dan pendapatan laboratorium."
],

"penggunaProgram": "Pengguna program adalah petugas atau pengelola laboratorium yang memasukkan data kelompok pengguna dan melihat hasil perhitungan biaya serta rekapitulasi.",

     
      "ketentuan": [
        [
          "Tarif jam",
          "2 jam pertama Rp50.000 per jam; jam berikutnya Rp35.000 per jam"
        ],
        [
          "Akhir pekan",
          "Biaya penggunaan dikenai tambahan 25%"
        ],
        [
          "Diskon",
          "Pengguna internal mendapat diskon 15%; tidak berlaku pada denda"
        ],
        [
          "Denda",
          "Kerusakan ringan Rp100.000; kerusakan berat Rp500.000; tidak ada denda jika tidak ada kerusakan"
        ],
      
      ],
      "asumsi": [
        "Urutan perhitungan: biaya dasar, tambahan akhir pekan, diskon internal (dari subtotal), lalu denda ditambahkan terakhir.",
        "Durasi boleh desimal (mis. 1,5 jam) dan dihitung proporsional.",
        "Durasi dibatasi lebih dari 0 dan paling banyak 24 jam per kelompok.",
        "Satu kelompok hanya memiliki satu status kerusakan (tidak ada, ringan, atau berat)."
      ],
      "ipo": {
        "input": [
          "Nama kelompok",
          "Jenis pengguna (1 internal, 2 eksternal)",
          "Durasi (jam)",
          "Hari (1 kerja, 2 akhir pekan)",
          "Status kerusakan (0 tidak ada, 1 ringan, 2 berat)",
          "Pilihan ulang (y/n)"
        ],
        "proses": [
          "Validasi input (percabangan dan perulangan)",
          "Hitung biaya dasar (tarif bertingkat)",
          "Hitung tambahan akhir pekan",
          "Hitung diskon internal",
          "Tentukan denda",
          "Hitung total biaya",
          "Perbarui akumulator rekapitulasi",
          "Ulangi untuk kelompok berikutnya"
        ],
        "output": [
          "Pesan kesalahan jika input tidak valid",
          "Rincian biaya tiap kelompok",
          "Rekapitulasi laboratorium"
        ]
      },
      "variabel": [
        [
          "TARIF_JAM_AWAL, TARIF_JAM_LANJUT, BATAS_JAM_AWAL",
          "const double",
          "50000, 35000, 2",
          "Tarif per jam dan batas 2 jam pertama"
        ],
        [
          "PERSEN_WEEKEND, PERSEN_DISKON",
          "const double",
          "0.25, 0.15",
          "Tambahan akhir pekan dan diskon internal"
        ],
        [
          "DENDA_RINGAN, DENDA_BERAT, BATAS_DURASI_MAKS",
          "const double",
          "100000, 500000, 24",
          "Nominal denda dan batas durasi"
        ],
        [
          "namaKelompok",
          "string",
          "(input)",
          "Nama kelompok"
        ],
        [
          "jenisPengguna, hari, statusKerusakan",
          "int",
          "(input)",
          "Pilihan menu"
        ],
        [
          "durasi",
          "double",
          "(input)",
          "Lama penggunaan (jam)"
        ],
        [
          "biayaDasar, tambahanWeekend, subtotalPenggunaan, diskon, biayaSetelahDiskon, denda, totalBiaya",
          "double",
          "0",
          "Komponen perhitungan biaya"
        ],
        [
          "ulang, valid",
          "char, bool",
          "-, false",
          "Kontrol perulangan dan validasi"
        ],
        [
          "jumlahInternal, jumlahEksternal, jumlahWeekend, jumlahRusakRingan, jumlahRusakBerat",
          "int",
          "0",
          "Penghitung rekapitulasi"
        ],
        [
          "totalJam, totalDiskon, totalDenda, totalPendapatan",
          "double",
          "0.0",
          "Akumulator rekapitulasi"
        ]
      ],
      "algoritma": [
        "Mulai program, deklarasikan konstanta tarif, persentase, denda, dan batas durasi 24 jam.",
        "Minta nama kelompok; ulangi sampai tidak kosong.",
        "Minta jenis pengguna (1 = internal, 2 = eksternal); ulangi sampai berupa angka 1 atau 2.",
        "Minta durasi (jam); ulangi sampai berupa angka lebih dari 0 dan paling banyak 24.",
        "Minta hari penggunaan (1 = hari kerja, 2 = akhir pekan); ulangi sampai valid.",
        "Minta status kerusakan (0 = tidak ada, 1 = ringan, 2 = berat); ulangi sampai valid.",
        "Hitung biaya dasar: jika durasi ≤ 2 jam maka durasi × 50.000; selain itu 2 × 50.000 + (durasi − 2) × 35.000.",
        "Jika hari = akhir pekan, tambahan = 25% × biaya dasar; selain itu 0. Hitung subtotal = biaya dasar + tambahan.",
        "Jika pengguna internal, diskon = 15% × subtotal; selain itu 0. Hitung biaya setelah diskon.",
        "Tentukan denda: ringan 100.000, berat 500.000, tidak ada 0 (denda tidak didiskon).",
        "Hitung total biaya = biaya setelah diskon + denda, lalu tampilkan rincian biaya.",
        "Tanyakan apakah memproses kelompok lain (y/n); jika y ulangi dari langkah 2, jika n selesai.",
        "MODUL B: setelah rincian ditampilkan, perbarui rekapitulasi (jumlah internal/eksternal, total jam, jumlah akhir pekan, jumlah kerusakan ringan/berat, total diskon, total denda, total pendapatan).",
        "Setelah perulangan selesai, tampilkan rekapitulasi laboratorium."
      ],
      "pseudocode": "ALGORITMA SistemBiayaLaboratorium (Modul A + Modul B)\n\nMULAI\n  Deklarasikan konstanta tarif, persentase, denda, dan batas durasi\n  Inisialisasi variabel rekapitulasi (Modul B) <- 0\n\n  ULANGI\n    ----- MODUL A -----\n    BACA dan validasi: namaKelompok, jenisPengguna, durasi, hari, statusKerusakan\n    Hitung biayaDasar          (JIKA durasi <= 2 ... SELAIN ITU ...)\n    Hitung tambahanWeekend     (JIKA hari = 2)\n    subtotalPenggunaan <- biayaDasar + tambahanWeekend\n    Hitung diskon              (JIKA jenisPengguna = 1; hanya dari subtotalPenggunaan)\n    Hitung denda               (JIKA statusKerusakan = 1 / 2; TIDAK didiskon)\n    totalBiaya <- subtotalPenggunaan - diskon + denda\n    TAMPILKAN rincian biaya\n\n    ----- MODUL B (pengumpulan data) -----\n    Tambah jumlahInternal ATAU jumlahEksternal\n    totalJam <- totalJam + durasi\n    JIKA hari = 2 MAKA jumlahWeekend <- jumlahWeekend + 1\n    Tambah jumlahRusakRingan ATAU jumlahRusakBerat\n    totalDiskon, totalDenda, totalPendapatan <- ditambah nilai kelompok ini\n\n    ULANGI BACA ulang SAMPAI ulang = y/Y/n/N\n  SAMPAI ulang = 'n' ATAU 'N'\n\n  ----- MODUL B (tampilan) -----\n  TAMPILKAN rekapitulasi laboratorium\nSELESAI\n",
      "flowchart": "flowchart TD\n  S([\"Mulai\"]) --> I[\"Inisialisasi konstanta tarif<br/>dan variabel rekapitulasi = 0\"]\n  I --> IN[/\"MODUL A: Input nama kelompok, jenis pengguna,<br/>durasi, hari, status kerusakan\"/]\n  IN --> V{\"Semua input valid?\"}\n  V -- Tidak --> ERR[/\"Tampilkan pesan kesalahan\"/]\n  ERR --> IN\n  V -- Ya --> C1{\"durasi ≤ 2 jam?\"}\n  C1 -- Ya --> P1[\"biayaDasar = durasi × 50.000\"]\n  C1 -- Tidak --> P2[\"biayaDasar = 2 × 50.000 + (durasi − 2) × 35.000\"]\n  P1 --> C2{\"hari = akhir pekan?\"}\n  P2 --> C2\n  C2 -- Ya --> P3[\"tambahanWeekend = 25% × biayaDasar\"]\n  C2 -- Tidak --> P4[\"tambahanWeekend = 0\"]\n  P3 --> P5[\"subtotal = biayaDasar + tambahanWeekend\"]\n  P4 --> P5\n  P5 --> C3{\"pengguna internal?\"}\n  C3 -- Ya --> P6[\"diskon = 15% × subtotal\"]\n  C3 -- Tidak --> P7[\"diskon = 0\"]\n  P6 --> C4{\"status kerusakan?\"}\n  P7 --> C4\n  C4 -- \"1 ringan\" --> D1[\"denda = 100.000\"]\n  C4 -- \"2 berat\" --> D2[\"denda = 500.000\"]\n  C4 -- \"0 tidak ada\" --> D0[\"denda = 0\"]\n  D1 --> T[\"totalBiaya = subtotal − diskon + denda\"]\n  D2 --> T\n  D0 --> T\n  T --> OUT[/\"Tampilkan rincian biaya kelompok\"/]\n  OUT --> R[\"MODUL B: perbarui rekapitulasi<br/>(jumlah internal/eksternal, total jam, weekend,<br/>rusak ringan/berat, diskon, denda, pendapatan)\"]\n  R --> U{\"Proses kelompok lain? (y/n)\"}\n  U -- \"y\" --> IN\n  U -- \"n\" --> RB[/\"MODUL B: Tampilkan rekapitulasi laboratorium\"/]\n  RB --> E([\"Selesai\"])\n",
      "kode": "// STUDI KASUS 08 - SISTEM BIAYA PENGGUNAAN LABORATORIUM\n// PROGRAM TERINTEGRASI = MODUL A (Proses Utama) + MODUL B (Rekapitulasi)\n// Memproses beberapa kelompok pengguna (perulangan), menampilkan rincian biaya\n// tiap kelompok, lalu menampilkan rekapitulasi laboratorium.\n\n#include <iostream>\n#include <string>\n#include <iomanip>\n#include <limits>\n\nusing namespace std;\n\nint main() {\n    // ===== Konstanta ketentuan studi kasus =====\n    const double TARIF_JAM_AWAL    = 50000.0;  // tarif per jam untuk 2 jam pertama\n    const double TARIF_JAM_LANJUT  = 35000.0;  // tarif per jam setelah 2 jam pertama\n    const double BATAS_JAM_AWAL    = 2.0;      // batas jam bertarif awal\n    const double PERSEN_WEEKEND    = 0.25;     // tambahan akhir pekan 25%\n    const double PERSEN_DISKON     = 0.15;     // diskon pengguna internal 15%\n    const double DENDA_RINGAN      = 100000.0; // denda kerusakan ringan\n    const double DENDA_BERAT       = 500000.0; // denda kerusakan berat\n    const double BATAS_DURASI_MAKS = 24.0;     // batas logis durasi (1 hari)\n\n    // ===== Variabel rekapitulasi (Modul B) =====\n    int    jumlahInternal    = 0;\n    int    jumlahEksternal   = 0;\n    double totalJam          = 0.0;\n    int    jumlahWeekend     = 0;\n    int    jumlahRusakRingan = 0;\n    int    jumlahRusakBerat  = 0;\n    double totalDiskon       = 0.0;\n    double totalDenda        = 0.0;\n    double totalPendapatan   = 0.0;\n\n    char ulang;\n\n    cout << \"==================================================\\n\";\n    cout << \"     SISTEM BIAYA PENGGUNAAN LABORATORIUM\\n\";\n    cout << \"==================================================\\n\";\n\n    do {\n        string namaKelompok;\n        int    jenisPengguna, hari, statusKerusakan;\n        double durasi;\n        bool   valid;\n\n        // ================= MODUL A : PROSES UTAMA =================\n        // ----- Input data kelompok (dengan validasi) -----\n        cout << \"\\n--- INPUT DATA KELOMPOK ---\\n\";\n        cout << \"Nama Kelompok: \";\n        getline(cin, namaKelompok);\n        while (namaKelompok.empty()) {\n            cout << \"  [!] Nama kelompok tidak boleh kosong. Ulangi: \";\n            getline(cin, namaKelompok);\n        }\n\n        valid = false;\n        while (!valid) {\n            cout << \"Jenis Pengguna (1=Internal, 2=Eksternal): \";\n            if (cin >> jenisPengguna) {\n                if (jenisPengguna == 1 || jenisPengguna == 2) valid = true;\n                else cout << \"  [!] Pilihan harus 1 atau 2.\\n\";\n            } else {\n                cout << \"  [!] Input harus berupa angka.\\n\";\n                cin.clear();\n                cin.ignore(numeric_limits<streamsize>::max(), '\\n');\n            }\n        }\n\n        valid = false;\n        while (!valid) {\n            cout << \"Durasi Penggunaan (jam, maksimal 24): \";\n            if (cin >> durasi) {\n                if (durasi > 0 && durasi <= BATAS_DURASI_MAKS) valid = true;\n                else cout << \"  [!] Durasi harus lebih dari 0 dan maksimal 24 jam.\\n\";\n            } else {\n                cout << \"  [!] Input harus berupa angka.\\n\";\n                cin.clear();\n                cin.ignore(numeric_limits<streamsize>::max(), '\\n');\n            }\n        }\n\n        valid = false;\n        while (!valid) {\n            cout << \"Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): \";\n            if (cin >> hari) {\n                if (hari == 1 || hari == 2) valid = true;\n                else cout << \"  [!] Pilihan harus 1 atau 2.\\n\";\n            } else {\n                cout << \"  [!] Input harus berupa angka.\\n\";\n                cin.clear();\n                cin.ignore(numeric_limits<streamsize>::max(), '\\n');\n            }\n        }\n\n        valid = false;\n        while (!valid) {\n            cout << \"Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): \";\n            if (cin >> statusKerusakan) {\n                if (statusKerusakan >= 0 && statusKerusakan <= 2) valid = true;\n                else cout << \"  [!] Pilihan harus 0, 1, atau 2.\\n\";\n            } else {\n                cout << \"  [!] Input harus berupa angka.\\n\";\n                cin.clear();\n                cin.ignore(numeric_limits<streamsize>::max(), '\\n');\n            }\n        }\n\n        // ----- Proses perhitungan biaya -----\n        // 1) Biaya dasar: 2 jam pertama Rp50.000/jam, jam berikutnya Rp35.000/jam\n        double biayaDasar;\n        if (durasi <= BATAS_JAM_AWAL) {\n            biayaDasar = durasi * TARIF_JAM_AWAL;\n        } else {\n            biayaDasar = (BATAS_JAM_AWAL * TARIF_JAM_AWAL)\n                       + ((durasi - BATAS_JAM_AWAL) * TARIF_JAM_LANJUT);\n        }\n\n        // 2) Tambahan 25% jika dipakai pada akhir pekan\n        double tambahanWeekend = 0;\n        if (hari == 2) {\n            tambahanWeekend = biayaDasar * PERSEN_WEEKEND;\n        }\n        double subtotalPenggunaan = biayaDasar + tambahanWeekend;\n\n        // 3) Diskon 15% hanya untuk pengguna internal, dihitung dari biaya penggunaan\n        double diskon = 0;\n        if (jenisPengguna == 1) {\n            diskon = subtotalPenggunaan * PERSEN_DISKON;\n        }\n        double biayaSetelahDiskon = subtotalPenggunaan - diskon;\n\n        // 4) Denda kerusakan (TIDAK terkena diskon)\n        double denda = 0;\n        if (statusKerusakan == 1) {\n            denda = DENDA_RINGAN;\n        } else if (statusKerusakan == 2) {\n            denda = DENDA_BERAT;\n        }\n\n        // 5) Total biaya = biaya setelah diskon + denda\n        double totalBiaya = biayaSetelahDiskon + denda;\n\n        // ----- Tampilkan rincian biaya -----\n        cout << fixed << setprecision(2);\n        cout << \"\\n==================================================\\n\";\n        cout << \"  RINCIAN BIAYA : \" << namaKelompok << \"\\n\";\n        cout << \"==================================================\\n\";\n        cout << \"Jenis Pengguna       : \"\n             << (jenisPengguna == 1 ? \"Internal\" : \"Eksternal\") << \"\\n\";\n        cout << \"Durasi               : \" << durasi << \" jam\\n\";\n        cout << \"Hari                 : \"\n             << (hari == 1 ? \"Hari Kerja\" : \"Akhir Pekan\") << \"\\n\";\n        cout << \"Status Kerusakan     : \";\n        if (statusKerusakan == 0)      cout << \"Tidak Ada\\n\";\n        else if (statusKerusakan == 1) cout << \"Ringan\\n\";\n        else                           cout << \"Berat\\n\";\n        cout << \"--------------------------------------------------\\n\";\n        cout << \"Biaya Dasar          : Rp \" << biayaDasar         << \"\\n\";\n        cout << \"Tambahan Weekend 25% : Rp \" << tambahanWeekend    << \"\\n\";\n        cout << \"Subtotal Penggunaan  : Rp \" << subtotalPenggunaan << \"\\n\";\n        cout << \"Diskon Internal 15%  : Rp \" << diskon             << \"\\n\";\n        cout << \"Biaya Setelah Diskon : Rp \" << biayaSetelahDiskon << \"\\n\";\n        cout << \"Denda Kerusakan      : Rp \" << denda              << \"\\n\";\n        cout << \"--------------------------------------------------\\n\";\n        cout << \"TOTAL BIAYA          : Rp \" << totalBiaya         << \"\\n\";\n        cout << \"==================================================\\n\";\n\n        // ================= MODUL B : PENGUMPULAN DATA REKAPITULASI =================\n        if (jenisPengguna == 1) jumlahInternal++;\n        else                    jumlahEksternal++;\n\n        totalJam = totalJam + durasi;\n\n        if (hari == 2) jumlahWeekend++;\n\n        if (statusKerusakan == 1)      jumlahRusakRingan++;\n        else if (statusKerusakan == 2) jumlahRusakBerat++;\n\n        totalDiskon     = totalDiskon     + diskon;\n        totalDenda      = totalDenda      + denda;\n        totalPendapatan = totalPendapatan + totalBiaya;\n\n        // ----- Pilihan mengulang atau mengakhiri -----\n        valid = false;\n        while (!valid) {\n            cout << \"\\nProses kelompok lain? (y/n): \";\n            if (cin >> ulang) {\n                cin.ignore(numeric_limits<streamsize>::max(), '\\n');\n                if (ulang == 'y' || ulang == 'Y' || ulang == 'n' || ulang == 'N') valid = true;\n                else cout << \"  [!] Masukkan 'y' atau 'n'.\\n\";\n            } else {\n                // input terputus (EOF): akhiri proses dengan wajar\n                ulang = 'n';\n                valid = true;\n            }\n        }\n    } while (ulang == 'y' || ulang == 'Y');\n\n    // ================= MODUL B : TAMPILKAN REKAPITULASI =================\n    // ===== Tampilkan rekapitulasi laboratorium =====\n    cout << fixed << setprecision(2);\n    cout << \"\\n==================================================\\n\";\n    cout << \"         REKAPITULASI LABORATORIUM\\n\";\n    cout << \"==================================================\\n\";\n    cout << \"Jumlah Pengguna Internal  : \" << jumlahInternal    << \"\\n\";\n    cout << \"Jumlah Pengguna Eksternal : \" << jumlahEksternal   << \"\\n\";\n    cout << \"Total Jam Penggunaan      : \" << totalJam          << \" jam\\n\";\n    cout << \"Jumlah Penggunaan Weekend : \" << jumlahWeekend     << \"\\n\";\n    cout << \"Jumlah Kerusakan Ringan   : \" << jumlahRusakRingan << \"\\n\";\n    cout << \"Jumlah Kerusakan Berat    : \" << jumlahRusakBerat  << \"\\n\";\n    cout << \"--------------------------------------------------\\n\";\n    cout << \"Total Diskon              : Rp \" << totalDiskon     << \"\\n\";\n    cout << \"Total Denda               : Rp \" << totalDenda      << \"\\n\";\n    cout << \"TOTAL PENDAPATAN          : Rp \" << totalPendapatan << \"\\n\";\n    cout << \"==================================================\\n\";\n\n    cout << \"Program selesai. Terima kasih!\\n\";\n    return 0;\n}\n",
      "hasil": "==================================================\n     SISTEM BIAYA PENGGUNAAN LABORATORIUM\n==================================================\n\n--- INPUT DATA KELOMPOK ---\nNama Kelompok: Jenis Pengguna (1=Internal, 2=Eksternal): Durasi Penggunaan (jam, maksimal 24): Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): \n==================================================\n  RINCIAN BIAYA : Alpha\n==================================================\nJenis Pengguna       : Internal\nDurasi               : 3.00 jam\nHari                 : Akhir Pekan\nStatus Kerusakan     : Ringan\n--------------------------------------------------\nBiaya Dasar          : Rp 135000.00\nTambahan Weekend 25% : Rp 33750.00\nSubtotal Penggunaan  : Rp 168750.00\nDiskon Internal 15%  : Rp 25312.50\nBiaya Setelah Diskon : Rp 143437.50\nDenda Kerusakan      : Rp 100000.00\n--------------------------------------------------\nTOTAL BIAYA          : Rp 243437.50\n==================================================\n\nProses kelompok lain? (y/n): \n--- INPUT DATA KELOMPOK ---\nNama Kelompok: Jenis Pengguna (1=Internal, 2=Eksternal): Durasi Penggunaan (jam, maksimal 24): Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): \n==================================================\n  RINCIAN BIAYA : Beta\n==================================================\nJenis Pengguna       : Eksternal\nDurasi               : 1.50 jam\nHari                 : Hari Kerja\nStatus Kerusakan     : Berat\n--------------------------------------------------\nBiaya Dasar          : Rp 75000.00\nTambahan Weekend 25% : Rp 0.00\nSubtotal Penggunaan  : Rp 75000.00\nDiskon Internal 15%  : Rp 0.00\nBiaya Setelah Diskon : Rp 75000.00\nDenda Kerusakan      : Rp 500000.00\n--------------------------------------------------\nTOTAL BIAYA          : Rp 575000.00\n==================================================\n\nProses kelompok lain? (y/n): \n--- INPUT DATA KELOMPOK ---\nNama Kelompok: Jenis Pengguna (1=Internal, 2=Eksternal): Durasi Penggunaan (jam, maksimal 24): Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): \n==================================================\n  RINCIAN BIAYA : Gamma\n==================================================\nJenis Pengguna       : Internal\nDurasi               : 2.00 jam\nHari                 : Hari Kerja\nStatus Kerusakan     : Tidak Ada\n--------------------------------------------------\nBiaya Dasar          : Rp 100000.00\nTambahan Weekend 25% : Rp 0.00\nSubtotal Penggunaan  : Rp 100000.00\nDiskon Internal 15%  : Rp 15000.00\nBiaya Setelah Diskon : Rp 85000.00\nDenda Kerusakan      : Rp 0.00\n--------------------------------------------------\nTOTAL BIAYA          : Rp 85000.00\n==================================================\n\nProses kelompok lain? (y/n): \n==================================================\n         REKAPITULASI LABORATORIUM\n==================================================\nJumlah Pengguna Internal  : 2\nJumlah Pengguna Eksternal : 1\nTotal Jam Penggunaan      : 6.50 jam\nJumlah Penggunaan Weekend : 1\nJumlah Kerusakan Ringan   : 1\nJumlah Kerusakan Berat    : 1\n--------------------------------------------------\nTotal Diskon              : Rp 40312.50\nTotal Denda               : Rp 600000.00\nTOTAL PENDAPATAN          : Rp 903437.50\n==================================================\nProgram selesai. Terima kasih!\n",
      "pengujian": [
        {
          "no": 1,
          "skenario": "Input normal",
          "data": "Internal, 3 jam, hari kerja, tanpa kerusakan",
          "harapan": "TOTAL BIAYA Rp 114750.00",
          "aktual": "TOTAL BIAYA Rp 114750.00",
          "ok": true
        },
        {
          "no": 2,
          "skenario": "Batas tarif awal",
          "data": "Eksternal, tepat 2 jam, hari kerja, tanpa kerusakan",
          "harapan": "TOTAL BIAYA Rp 100000.00",
          "aktual": "TOTAL BIAYA Rp 100000.00",
          "ok": true
        },
        {
          "no": 3,
          "skenario": "Batas bawah durasi",
          "data": "Eksternal, 0.5 jam, hari kerja, tanpa kerusakan",
          "harapan": "TOTAL BIAYA Rp 25000.00",
          "aktual": "TOTAL BIAYA Rp 25000.00",
          "ok": true
        },
        {
          "no": 4,
          "skenario": "Batas atas durasi",
          "data": "Eksternal, 24 jam, akhir pekan, rusak berat",
          "harapan": "TOTAL BIAYA Rp 1587500.00",
          "aktual": "TOTAL BIAYA Rp 1587500.00",
          "ok": true
        },
        {
          "no": 5,
          "skenario": "Kombinasi lengkap",
          "data": "Internal, 3 jam, akhir pekan, rusak ringan",
          "harapan": "TOTAL BIAYA Rp 243437.50",
          "aktual": "TOTAL BIAYA Rp 243437.50",
          "ok": true
        },
        {
          "no": 6,
          "skenario": "Akhir pekan tanpa diskon",
          "data": "Eksternal, 4 jam, akhir pekan, tanpa kerusakan",
          "harapan": "TOTAL BIAYA Rp 212500.00",
          "aktual": "TOTAL BIAYA Rp 212500.00",
          "ok": true
        },
        {
          "no": 7,
          "skenario": "Durasi nol",
          "data": "Durasi 0 ditolak, lalu 1 jam (eksternal, kerja, normal)",
          "harapan": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "ok": true
        },
        {
          "no": 8,
          "skenario": "Durasi negatif",
          "data": "Durasi -3 ditolak, lalu 2 jam (eksternal, kerja, normal)",
          "harapan": "TOTAL BIAYA Rp 100000.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 100000.00; input salah ditolak",
          "ok": true
        },
        {
          "no": 9,
          "skenario": "Durasi melebihi batas",
          "data": "Durasi 25 ditolak, lalu 24 jam (eksternal, kerja, normal)",
          "harapan": "TOTAL BIAYA Rp 870000.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 870000.00; input salah ditolak",
          "ok": true
        },
        {
          "no": 10,
          "skenario": "Jenis pengguna tidak valid",
          "data": "Input 'abc' dan 3 ditolak, lalu 1 (internal, 1 jam, kerja)",
          "harapan": "TOTAL BIAYA Rp 42500.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 42500.00; input salah ditolak",
          "ok": true
        },
        {
          "no": 11,
          "skenario": "Status kerusakan tidak valid",
          "data": "Status 5 ditolak, lalu 0 (eksternal, 1 jam, kerja)",
          "harapan": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "ok": true
        },
        {
          "no": 12,
          "skenario": "Konfirmasi ulang tidak valid",
          "data": "Jawaban 'x' ditolak, lalu 'n' (eksternal, 1 jam, kerja)",
          "harapan": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "aktual": "TOTAL BIAYA Rp 50000.00; input salah ditolak",
          "ok": true
        }
      ],
      "traceCabInfo": "Input: Alpha, internal (1), durasi 3 jam, akhir pekan (2), kerusakan ringan (1).",
      "traceCab": [
        [
          "1",
          "durasi <= 2 ?",
          "3 Salah",
          "-"
        ],
        [
          "2",
          "biayaDasar = 2×50000 + (3-2)×35000",
          "—",
          "135000.00"
        ],
        [
          "3",
          "hari == 2 ?",
          "2 == 2 → Benar",
          "-"
        ],
        [
          "4",
          "tambahanWeekend = biayaDasar × 0,25",
          "—",
          "33750.00"
        ],
        [
          "5",
          "subtotalPenggunaan = biayaDasar + tambahanWeekend",
          "—",
          "168750.00"
        ],
        [
          "6",
          "jenisPengguna == 1 ?",
          "1 == 1 → Benar",
          "-"
        ],
        [
          "7",
          "diskon = subtotalPenggunaan × 0,15",
          "—",
          "25312.50"
        ],
        [
          "8",
          "biayaSetelahDiskon = subtotalPenggunaan - diskon",
          "—",
          "143437.50"
        ],
        [
          "9",
          "statusKerusakan == 1 ?",
          "1 == 1 → Benar (denda ringan)",
          "100000.00"
        ],
        [
          "10",
          "totalBiaya = biayaSetelahDiskon + denda",
          "—",
          "243437.50"
        ]
      ],
      "traceLoopInfo": "Tiga putaran: Alpha (1; 3; 2; 1), Beta (2; 1,5; 1; 2), Gamma (1; 2; 1; 0). Nilai setelah setiap putaran selesai.",
      "traceLoop": [
        [
          "Awal",
          "-",
          "0",
          "0",
          "0.00",
          "0",
          "0",
          "0",
          "0.00",
          "0.00",
          "0.00"
        ],
        [
          "1",
          "y",
          "1",
          "0",
          "3.00",
          "1",
          "1",
          "0",
          "25312.50",
          "100000.00",
          "243437.50"
        ],
        [
          "2",
          "y",
          "1",
          "1",
          "4.50",
          "1",
          "1",
          "1",
          "25312.50",
          "600000.00",
          "818437.50"
        ],
        [
          "3",
          "n",
          "2",
          "1",
          "6.50",
          "1",
          "1",
          "1",
          "40312.50",
          "600000.00",
          "903437.50"
        ]
      ],
      "kesalahan": [
        [
          "Input huruf pada angka membuat cin gagal dan program berulang tanpa henti",
          "Tambah cin.clear() dan cin.ignore() pada setiap validasi angka"
        ],
        [
          "Nama kelompok kedua terlewat karena sisa Enter dari input sebelumnya",
          "Setelah membaca y/n, buang sisa baris dengan cin.ignore()"
        ],
        [
          "Denda sempat ikut terhitung dalam diskon",
          "Diskon hanya dihitung dari subtotalPenggunaan; denda ditambahkan setelah diskon"
        ],
        [
          "Durasi nol, negatif, atau tidak masuk akal diterima",
          "Validasi 0 < durasi <= 24 jam"
        ],
        [
          "Pilihan ulang selain y/n membuat proses berhenti tidak wajar",
          "Pilihan y/n divalidasi dengan perulangan sendiri"
        ]
      ]
    }
  },
  {
    "no": 9,
    "judul": "Sistem Pemeriksaan Anggaran Kegiatan Mahasiswa"
  },
  {
    "no": 10,
    "judul": "Sistem Monitoring Jejak Karbon Perjalanan Mahasiswa"
  }
];
