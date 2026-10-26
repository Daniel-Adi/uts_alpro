#include <iostream>
#include <string>
#include <iomanip>
#include <limits>

using namespace std;

int main() {
    // ===== Konstanta ketentuan studi kasus =====
    const double TARIF_JAM_AWAL    = 50000.0;  // tarif per jam untuk 2 jam pertama
    const double TARIF_JAM_LANJUT  = 35000.0;  // tarif per jam setelah 2 jam pertama
    const double BATAS_JAM_AWAL    = 2.0;      // batas jam bertarif awal
    const double PERSEN_WEEKEND    = 0.25;     // tambahan akhir pekan 25%
    const double PERSEN_DISKON     = 0.15;     // diskon pengguna internal 15%
    const double DENDA_RINGAN      = 100000.0; // denda kerusakan ringan
    const double DENDA_BERAT       = 500000.0; // denda kerusakan berat
    const double BATAS_DURASI_MAKS = 24.0;     // batas logis durasi (1 hari)

    // ===== Variabel rekapitulasi (Modul B) =====
    int    jumlahInternal    = 0;
    int    jumlahEksternal   = 0;
    double totalJam          = 0.0;
    int    jumlahWeekend     = 0;
    int    jumlahRusakRingan = 0;
    int    jumlahRusakBerat  = 0;
    double totalDiskon       = 0.0;
    double totalDenda        = 0.0;
    double totalPendapatan   = 0.0;

    char ulang;

    cout << "==================================================\n";
    cout << "     SISTEM BIAYA PENGGUNAAN LABORATORIUM\n";
    cout << "==================================================\n";

    do {
        string namaKelompok;
        int    jenisPengguna, hari, statusKerusakan;
        double durasi;
        bool   valid;

        // ================= MODUL A : PROSES UTAMA =================
        cout << "\n--- INPUT DATA KELOMPOK ---\n";
        cout << "Nama Kelompok: ";
        getline(cin, namaKelompok);
        while (namaKelompok.empty()) {
            cout << "  [!] Nama kelompok tidak boleh kosong. Ulangi: ";
            getline(cin, namaKelompok);
        }

        valid = false;
        while (!valid) {
            cout << "Jenis Pengguna (1=Internal, 2=Eksternal): ";
            if (cin >> jenisPengguna) {
                if (jenisPengguna == 1 || jenisPengguna == 2) valid = true;
                else cout << "  [!] Pilihan harus 1 atau 2.\n";
            } else {
                cout << "  [!] Input harus berupa angka.\n";
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
            }
        }

        valid = false;
        while (!valid) {
            cout << "Durasi Penggunaan (jam, maksimal 24): ";
            if (cin >> durasi) {
                if (durasi > 0 && durasi <= BATAS_DURASI_MAKS) valid = true;
                else cout << "  [!] Durasi harus lebih dari 0 dan maksimal 24 jam.\n";
            } else {
                cout << "  [!] Input harus berupa angka.\n";
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
            }
        }

        valid = false;
        while (!valid) {
            cout << "Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): ";
            if (cin >> hari) {
                if (hari == 1 || hari == 2) valid = true;
                else cout << "  [!] Pilihan harus 1 atau 2.\n";
            } else {
                cout << "  [!] Input harus berupa angka.\n";
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
            }
        }

        valid = false;
        while (!valid) {
            cout << "Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): ";
            if (cin >> statusKerusakan) {
                if (statusKerusakan >= 0 && statusKerusakan <= 2) valid = true;
                else cout << "  [!] Pilihan harus 0, 1, atau 2.\n";
            } else {
                cout << "  [!] Input harus berupa angka.\n";
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
            }
        }

        // ----- Proses perhitungan biaya -----
        double biayaDasar;
        if (durasi <= BATAS_JAM_AWAL) {
            biayaDasar = durasi * TARIF_JAM_AWAL;
        } else {
            biayaDasar = (BATAS_JAM_AWAL * TARIF_JAM_AWAL)
                       + ((durasi - BATAS_JAM_AWAL) * TARIF_JAM_LANJUT);
        }

        // 2) Tambahan 25% jika dipakai pada akhir pekan
        double tambahanWeekend = 0;
        if (hari == 2) {
            tambahanWeekend = biayaDasar * PERSEN_WEEKEND;
        }
        double subtotalPenggunaan = biayaDasar + tambahanWeekend;

        // 3) Diskon 15% hanya untuk pengguna internal, dihitung dari biaya penggunaan
        double diskon = 0;
        if (jenisPengguna == 1) {
            diskon = subtotalPenggunaan * PERSEN_DISKON;
        }
        double biayaSetelahDiskon = subtotalPenggunaan - diskon;

        // 4) Denda kerusakan (TIDAK terkena diskon)
        double denda = 0;
        if (statusKerusakan == 1) {
            denda = DENDA_RINGAN;
        } else if (statusKerusakan == 2) {
            denda = DENDA_BERAT;
        }

        // 5) Total biaya = biaya setelah diskon + denda
        double totalBiaya = biayaSetelahDiskon + denda;

        // ----- Tampilkan rincian biaya -----
        cout << fixed << setprecision(2);
        cout << "\n==================================================\n";
        cout << "  RINCIAN BIAYA : " << namaKelompok << "\n";
        cout << "==================================================\n";
        cout << "Jenis Pengguna       : "
             << (jenisPengguna == 1 ? "Internal" : "Eksternal") << "\n";
        cout << "Durasi               : " << durasi << " jam\n";
        cout << "Hari                 : "
             << (hari == 1 ? "Hari Kerja" : "Akhir Pekan") << "\n";
        cout << "Status Kerusakan     : ";
        if (statusKerusakan == 0)      cout << "Tidak Ada\n";
        else if (statusKerusakan == 1) cout << "Ringan\n";
        else                           cout << "Berat\n";
        cout << "--------------------------------------------------\n";
        cout << "Biaya Dasar          : Rp " << biayaDasar         << "\n";
        cout << "Tambahan Weekend 25% : Rp " << tambahanWeekend    << "\n";
        cout << "Subtotal Penggunaan  : Rp " << subtotalPenggunaan << "\n";
        cout << "Diskon Internal 15%  : Rp " << diskon             << "\n";
        cout << "Biaya Setelah Diskon : Rp " << biayaSetelahDiskon << "\n";
        cout << "Denda Kerusakan      : Rp " << denda              << "\n";
        cout << "--------------------------------------------------\n";
        cout << "TOTAL BIAYA          : Rp " << totalBiaya         << "\n";
        cout << "==================================================\n";

        // ================= MODUL B : PENGUMPULAN DATA REKAPITULASI =================
        if (jenisPengguna == 1) jumlahInternal++;
        else                    jumlahEksternal++;

        totalJam = totalJam + durasi;

        if (hari == 2) jumlahWeekend++;

        if (statusKerusakan == 1)      jumlahRusakRingan++;
        else if (statusKerusakan == 2) jumlahRusakBerat++;

        totalDiskon     = totalDiskon     + diskon;
        totalDenda      = totalDenda      + denda;
        totalPendapatan = totalPendapatan + totalBiaya;

        valid = false;
        while (!valid) {
            cout << "\nProses kelompok lain? (y/n): ";
            if (cin >> ulang) {
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
                if (ulang == 'y' || ulang == 'Y' || ulang == 'n' || ulang == 'N') valid = true;
                else cout << "  [!] Masukkan 'y' atau 'n'.\n";
            } else {
                ulang = 'n';
                valid = true;
            }
        }
    } while (ulang == 'y' || ulang == 'Y');

    // ================= MODUL B : TAMPILKAN REKAPITULASI ================
    cout << fixed << setprecision(2);
    cout << "\n==================================================\n";
    cout << "         REKAPITULASI LABORATORIUM\n";
    cout << "==================================================\n";
    cout << "Jumlah Pengguna Internal  : " << jumlahInternal    << "\n";
    cout << "Jumlah Pengguna Eksternal : " << jumlahEksternal   << "\n";
    cout << "Total Jam Penggunaan      : " << totalJam          << " jam\n";
    cout << "Jumlah Penggunaan Weekend : " << jumlahWeekend     << "\n";
    cout << "Jumlah Kerusakan Ringan   : " << jumlahRusakRingan << "\n";
    cout << "Jumlah Kerusakan Berat    : " << jumlahRusakBerat  << "\n";
    cout << "--------------------------------------------------\n";
    cout << "Total Diskon              : Rp " << totalDiskon     << "\n";
    cout << "Total Denda               : Rp " << totalDenda      << "\n";
    cout << "TOTAL PENDAPATAN          : Rp " << totalPendapatan << "\n";
    cout << "==================================================\n";

    cout << "Program selesai. Terima kasih!\n";
    return 0;
}
