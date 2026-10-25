const TARIF_JAM_AWAL = 50000.0;
const TARIF_JAM_LANJUT = 35000.0;
const BATAS_JAM_AWAL = 2.0;
const PERSEN_WEEKEND = 0.25;
const PERSEN_DISKON = 0.15;
const DENDA_RINGAN = 100000.0;
const DENDA_BERAT = 500000.0;
const BATAS_DURASI_MAKS = 24.0;

// Format angka seperti cout << fixed << setprecision(2) (pembulatan half-even pada nilai biner eksak)
function fmt2(x) {
    const neg = x < 0 || Object.is(x, -0);
    const s = Math.abs(x).toFixed(60);
    const [ip, fp] = s.split('.');
    let digits = ip + fp.slice(0, 2);
    const rest = fp.slice(2);
    let up = false;
    if (rest[0] > '5') up = true;
    else if (rest[0] === '5') {
        if (/[1-9]/.test(rest.slice(1))) up = true;
        else up = (Number(digits[digits.length - 1]) % 2 === 1);   // tepat di tengah: genap terdekat
    }
    if (up) {
        const n = (BigInt(digits) + 1n).toString().padStart(3, '0');
        digits = n;
    }
    const out = digits.slice(0, -2) + '.' + digits.slice(-2);
    return (neg ? '-' : '') + out;
}

// ---------- Penyangga input yang meniru std::cin ----------
class Cin {
    constructor() { this.buf = ''; this.pos = 0; }
    push(baris) { this.buf += baris + '\n'; }
    *tungguSampaiAdaData() {
        while (true) {
            while (this.pos < this.buf.length && /\s/.test(this.buf[this.pos])) this.pos++;
            if (this.pos < this.buf.length) return;
            yield 'input';
        }
    }
    *bacaAngka(regex, ubah) {            // meniru cin >> int / double; return {ok, nilai}
        yield* this.tungguSampaiAdaData();
        const m = regex.exec(this.buf.slice(this.pos));
        if (!m) return { ok: false, nilai: 0 };
        this.pos += m[0].length;
        const nilai = ubah(m[0]);
        return nilai === null ? { ok: false, nilai: 0 } : { ok: true, nilai };
    }
    *bacaInt() {
        return yield* this.bacaAngka(/^[+-]?\d+/, t => {
            const n = Number(t);
            return (n >= -2147483648 && n <= 2147483647) ? n : null;
        });
    }
    *bacaDouble() {
        // cin >> double: eksponen yang tidak lengkap (mis. "1e" atau "1e+") ikut terbaca lalu gagal
        yield* this.tungguSampaiAdaData();
        const rusak = /^[+-]?(\d+\.?\d*|\.\d+)[eE][+-]?(?![\d])/.exec(this.buf.slice(this.pos));
        if (rusak) { this.pos += rusak[0].length; return { ok: false, nilai: 0 }; }
        return yield* this.bacaAngka(/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/, t => {
            const n = Number(t);
            return Number.isFinite(n) ? n : null;
        });
    }
    *bacaChar() {                          // cin >> char
        yield* this.tungguSampaiAdaData();
        return this.buf[this.pos++];
    }
    *getline() {
        while (true) {
            const i = this.buf.indexOf('\n', this.pos);
            if (i >= 0) { const s = this.buf.slice(this.pos, i); this.pos = i + 1; return s; }
            yield 'input';
        }
    }
    *ignoreSampaiBarisBaru() {             // cin.ignore(max, '\n')
        while (true) {
            const i = this.buf.indexOf('\n', this.pos);
            if (i >= 0) { this.pos = i + 1; return; }
            yield 'input';
        }
    }
}

// ---------- Program utama (padanan int main() di studi_kasus.cpp) ----------
// io.print(teks) menampilkan keluaran; io.tahap(kode) memberi tahu tahap/prompt yang sedang aktif.
function* programLaboratorium(io, cin) {
    const cout = t => io.print(t);

    // Variabel rekapitulasi (Modul B)
    let jumlahInternal = 0, jumlahEksternal = 0, totalJam = 0.0, jumlahWeekend = 0;
    let jumlahRusakRingan = 0, jumlahRusakBerat = 0;
    let totalDiskon = 0.0, totalDenda = 0.0, totalPendapatan = 0.0;
    let ulang;

    cout('==================================================\n');
    cout('     SISTEM BIAYA PENGGUNAAN LABORATORIUM\n');
    cout('==================================================\n');

    do {
        let namaKelompok, jenisPengguna, durasi, hari, statusKerusakan, valid;

        // ================= MODUL A : PROSES UTAMA =================
        cout('\n--- INPUT DATA KELOMPOK ---\n');
        cout('Nama Kelompok: ');
        io.tahap('nama');
        namaKelompok = yield* cin.getline();
        while (namaKelompok.length === 0) {
            cout('  [!] Nama kelompok tidak boleh kosong. Ulangi: ');
            namaKelompok = yield* cin.getline();
        }

        valid = false;
        while (!valid) {
            cout('Jenis Pengguna (1=Internal, 2=Eksternal): ');
            io.tahap('jenis');
            const r = yield* cin.bacaInt();
            if (r.ok) {
                jenisPengguna = r.nilai;
                if (jenisPengguna === 1 || jenisPengguna === 2) valid = true;
                else cout('  [!] Pilihan harus 1 atau 2.\n');
            } else {
                cout('  [!] Input harus berupa angka.\n');
                yield* cin.ignoreSampaiBarisBaru();
            }
        }

        valid = false;
        while (!valid) {
            cout('Durasi Penggunaan (jam, maksimal 24): ');
            io.tahap('durasi');
            const r = yield* cin.bacaDouble();
            if (r.ok) {
                durasi = r.nilai;
                if (durasi > 0 && durasi <= BATAS_DURASI_MAKS) valid = true;
                else cout('  [!] Durasi harus lebih dari 0 dan maksimal 24 jam.\n');
            } else {
                cout('  [!] Input harus berupa angka.\n');
                yield* cin.ignoreSampaiBarisBaru();
            }
        }

        valid = false;
        while (!valid) {
            cout('Hari Penggunaan (1=Hari Kerja, 2=Akhir Pekan): ');
            io.tahap('hari');
            const r = yield* cin.bacaInt();
            if (r.ok) {
                hari = r.nilai;
                if (hari === 1 || hari === 2) valid = true;
                else cout('  [!] Pilihan harus 1 atau 2.\n');
            } else {
                cout('  [!] Input harus berupa angka.\n');
                yield* cin.ignoreSampaiBarisBaru();
            }
        }

        valid = false;
        while (!valid) {
            cout('Status Kerusakan (0=Tidak Ada, 1=Ringan, 2=Berat): ');
            io.tahap('kerusakan');
            const r = yield* cin.bacaInt();
            if (r.ok) {
                statusKerusakan = r.nilai;
                if (statusKerusakan >= 0 && statusKerusakan <= 2) valid = true;
                else cout('  [!] Pilihan harus 0, 1, atau 2.\n');
            } else {
                cout('  [!] Input harus berupa angka.\n');
                yield* cin.ignoreSampaiBarisBaru();
            }
        }

        // ----- Proses perhitungan biaya -----
        io.tahap('hitung');
        let biayaDasar;
        if (durasi <= BATAS_JAM_AWAL) {
            biayaDasar = durasi * TARIF_JAM_AWAL;
        } else {
            biayaDasar = (BATAS_JAM_AWAL * TARIF_JAM_AWAL) + ((durasi - BATAS_JAM_AWAL) * TARIF_JAM_LANJUT);
        }

        let tambahanWeekend = 0;
        if (hari === 2) tambahanWeekend = biayaDasar * PERSEN_WEEKEND;
        const subtotalPenggunaan = biayaDasar + tambahanWeekend;

        let diskon = 0;
        if (jenisPengguna === 1) diskon = subtotalPenggunaan * PERSEN_DISKON;
        const biayaSetelahDiskon = subtotalPenggunaan - diskon;

        let denda = 0;
        if (statusKerusakan === 1) denda = DENDA_RINGAN;
        else if (statusKerusakan === 2) denda = DENDA_BERAT;

        const totalBiaya = biayaSetelahDiskon + denda;

        // ----- Tampilkan rincian biaya -----
        io.tahap('rincian');
        cout('\n==================================================\n');
        cout('  RINCIAN BIAYA : ' + namaKelompok + '\n');
        cout('==================================================\n');
        cout('Jenis Pengguna       : ' + (jenisPengguna === 1 ? 'Internal' : 'Eksternal') + '\n');
        cout('Durasi               : ' + fmt2(durasi) + ' jam\n');
        cout('Hari                 : ' + (hari === 1 ? 'Hari Kerja' : 'Akhir Pekan') + '\n');
        cout('Status Kerusakan     : ');
        if (statusKerusakan === 0) cout('Tidak Ada\n');
        else if (statusKerusakan === 1) cout('Ringan\n');
        else cout('Berat\n');
        cout('--------------------------------------------------\n');
        cout('Biaya Dasar          : Rp ' + fmt2(biayaDasar) + '\n');
        cout('Tambahan Weekend 25% : Rp ' + fmt2(tambahanWeekend) + '\n');
        cout('Subtotal Penggunaan  : Rp ' + fmt2(subtotalPenggunaan) + '\n');
        cout('Diskon Internal 15%  : Rp ' + fmt2(diskon) + '\n');
        cout('Biaya Setelah Diskon : Rp ' + fmt2(biayaSetelahDiskon) + '\n');
        cout('Denda Kerusakan      : Rp ' + fmt2(denda) + '\n');
        cout('--------------------------------------------------\n');
        cout('TOTAL BIAYA          : Rp ' + fmt2(totalBiaya) + '\n');
        cout('==================================================\n');

        // ================= MODUL B : PENGUMPULAN DATA REKAPITULASI =================
        io.tahap('rekap');
        if (jenisPengguna === 1) jumlahInternal++;
        else jumlahEksternal++;
        totalJam = totalJam + durasi;
        if (hari === 2) jumlahWeekend++;
        if (statusKerusakan === 1) jumlahRusakRingan++;
        else if (statusKerusakan === 2) jumlahRusakBerat++;
        totalDiskon = totalDiskon + diskon;
        totalDenda = totalDenda + denda;
        totalPendapatan = totalPendapatan + totalBiaya;

        // ----- Pilihan mengulang atau mengakhiri -----
        valid = false;
        while (!valid) {
            cout('\nProses kelompok lain? (y/n): ');
            io.tahap('ulang');
            ulang = yield* cin.bacaChar();
            yield* cin.ignoreSampaiBarisBaru();
            if (ulang === 'y' || ulang === 'Y' || ulang === 'n' || ulang === 'N') valid = true;
            else cout("  [!] Masukkan 'y' atau 'n'.\n");
        }
    } while (ulang === 'y' || ulang === 'Y');

    // ================= MODUL B : TAMPILKAN REKAPITULASI =================
    io.tahap('selesai');
    cout('\n==================================================\n');
    cout('         REKAPITULASI LABORATORIUM\n');
    cout('==================================================\n');
    cout('Jumlah Pengguna Internal  : ' + jumlahInternal + '\n');
    cout('Jumlah Pengguna Eksternal : ' + jumlahEksternal + '\n');
    cout('Total Jam Penggunaan      : ' + fmt2(totalJam) + ' jam\n');
    cout('Jumlah Penggunaan Weekend : ' + jumlahWeekend + '\n');
    cout('Jumlah Kerusakan Ringan   : ' + jumlahRusakRingan + '\n');
    cout('Jumlah Kerusakan Berat    : ' + jumlahRusakBerat + '\n');
    cout('--------------------------------------------------\n');
    cout('Total Diskon              : Rp ' + fmt2(totalDiskon) + '\n');
    cout('Total Denda               : Rp ' + fmt2(totalDenda) + '\n');
    cout('TOTAL PENDAPATAN          : Rp ' + fmt2(totalPendapatan) + '\n');
    cout('==================================================\n');
    cout('Program selesai. Terima kasih!\n');
}

// ---------- Penjalan program (dipakai halaman web dan pengujian) ----------
// Mengembalikan objek sesi: kirim(baris) untuk mengirim satu baris input.
function mulaiSesi(onPrint, onTahap) {
    const cin = new Cin();
    const sesi = { selesai: false, tahap: 'mulai' };
    const io = {
        print: t => onPrint && onPrint(t),
        tahap: k => { sesi.tahap = k; onTahap && onTahap(k); }
    };
    const gen = programLaboratorium(io, cin);
    const maju = () => { const r = gen.next(); if (r.done) { sesi.selesai = true; sesi.tahap = 'selesai'; onTahap && onTahap('selesai'); } };
    sesi.kirim = baris => { if (sesi.selesai) return; cin.push(baris); maju(); };
    maju();
    return sesi;
}

if (typeof module !== 'undefined') module.exports = { mulaiSesi, fmt2 };

