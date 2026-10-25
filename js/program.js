/**
 * Logika program Studi Kasus 08: Sistem Biaya Penggunaan Laboratorium (JavaScript).
 * Berisi aturan biaya, validasi input, perhitungan biaya (Modul A), dan rekapitulasi (Modul B).
 * Tampilan form dan hasil ada di js/app.js.
 */

// ---------- Aturan sesuai soal ----------
const ATURAN = {
    tarifAwal: 50000,        // 2 jam pertama, per jam
    tarifLanjut: 35000,      // jam berikutnya, per jam
    batasJamAwal: 2,
    persenWeekend: 0.25,     // tambahan akhir pekan
    persenDiskon: 0.15,      // diskon pengguna internal (tidak berlaku pada denda)
    dendaRingan: 100000,
    dendaBerat: 500000,
    durasiMaks: 24           // batas logis durasi per kelompok (jam)
};

// ---------- Format angka ----------
// Dua desimal dengan pembulatan yang sama seperti cout << fixed << setprecision(2) pada C++
function fmt2(x) {
    const neg = x < 0 || Object.is(x, -0);
    const [ip, fp] = Math.abs(x).toFixed(60).split('.');
    let digits = ip + fp.slice(0, 2);
    const sisa = fp.slice(2);
    let naik = false;
    if (sisa[0] > '5') naik = true;
    else if (sisa[0] === '5') naik = /[1-9]/.test(sisa.slice(1)) ? true : Number(digits[digits.length - 1]) % 2 === 1;
    if (naik) digits = (BigInt(digits) + 1n).toString().padStart(3, '0');
    return (neg ? '-' : '') + digits.slice(0, -2) + '.' + digits.slice(-2);
}
// Contoh: 243437.5 -> "Rp 243.437,50"
function rupiah(x) {
    const [bulat, desimal] = fmt2(x).split('.');
    return 'Rp ' + bulat.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + desimal;
}

// ---------- MODUL A (1): validasi input ----------
// masukan: {nama, jenis, durasi, hari, kerusakan} (semua berupa teks dari form)
// return: {valid, galat:{nama, jenis, durasi, hari, kerusakan}, data}
function validasiInput(masukan) {
    const galat = {};
    const pilihan = (nilai, boleh) => {
        const teks = String(nilai === undefined || nilai === null ? '' : nilai).trim();
        return (teks !== '' && boleh.includes(Number(teks))) ? Number(teks) : null;
    };

    const nama = String(masukan.nama || '').trim();
    if (nama === '') galat.nama = 'Nama kelompok tidak boleh kosong.';

    const jenis = pilihan(masukan.jenis, [1, 2]);
    if (jenis === null) galat.jenis = 'Pilih jenis pengguna (Internal atau Eksternal).';

    let durasi = null;
    const teksDurasi = String(masukan.durasi || '').trim().replace(',', '.');
    if (teksDurasi === '') galat.durasi = 'Durasi wajib diisi.';
    else if (/^-/.test(teksDurasi) && /^-(\d+\.?\d*|\.\d+)$/.test(teksDurasi)) galat.durasi = 'Durasi tidak boleh negatif.';
    else if (!/^(\d+\.?\d*|\.\d+)$/.test(teksDurasi)) galat.durasi = 'Durasi harus berupa angka (contoh: 2 atau 1.5).';
    else {
        durasi = Number(teksDurasi);
        if (durasi <= 0) { galat.durasi = 'Durasi harus lebih dari 0.'; durasi = null; }
        else if (durasi > ATURAN.durasiMaks) { galat.durasi = 'Durasi maksimal ' + ATURAN.durasiMaks + ' jam.'; durasi = null; }
    }

    const hari = pilihan(masukan.hari, [1, 2]);
    if (hari === null) galat.hari = 'Pilih hari penggunaan (Hari Kerja atau Akhir Pekan).';

    const kerusakan = pilihan(masukan.kerusakan, [0, 1, 2]);
    if (kerusakan === null) galat.kerusakan = 'Pilih status kerusakan.';

    return { valid: Object.keys(galat).length === 0, galat, data: { nama, jenis, durasi, hari, kerusakan } };
}

// ---------- MODUL A (2): perhitungan biaya ----------
// data: {jenis (1 internal, 2 eksternal), durasi (jam), hari (1 kerja, 2 akhir pekan), kerusakan (0, 1, 2)}
function hitungBiaya(data) {
    // 1) Biaya dasar: 2 jam pertama Rp50.000/jam, jam berikutnya Rp35.000/jam
    let biayaDasar;
    if (data.durasi <= ATURAN.batasJamAwal) {
        biayaDasar = data.durasi * ATURAN.tarifAwal;
    } else {
        biayaDasar = (ATURAN.batasJamAwal * ATURAN.tarifAwal) + ((data.durasi - ATURAN.batasJamAwal) * ATURAN.tarifLanjut);
    }

    // 2) Tambahan akhir pekan 25%
    let tambahanWeekend = 0;
    if (data.hari === 2) tambahanWeekend = biayaDasar * ATURAN.persenWeekend;
    const subtotal = biayaDasar + tambahanWeekend;

    // 3) Diskon internal 15% (hanya dari biaya penggunaan)
    let diskon = 0;
    if (data.jenis === 1) diskon = subtotal * ATURAN.persenDiskon;
    const setelahDiskon = subtotal - diskon;

    // 4) Denda kerusakan (tidak terkena diskon)
    let denda = 0;
    if (data.kerusakan === 1) denda = ATURAN.dendaRingan;
    else if (data.kerusakan === 2) denda = ATURAN.dendaBerat;

    // 5) Total biaya
    const total = setelahDiskon + denda;
    return { biayaDasar, tambahanWeekend, subtotal, diskon, setelahDiskon, denda, total };
}

// ---------- MODUL B: rekapitulasi ----------
function buatRekap() {
    return { internal: 0, eksternal: 0, totalJam: 0, weekend: 0, rusakRingan: 0, rusakBerat: 0,
             totalDiskon: 0, totalDenda: 0, totalPendapatan: 0 };
}
function perbaruiRekap(rekap, data, hasil) {
    if (data.jenis === 1) rekap.internal++;
    else rekap.eksternal++;

    rekap.totalJam = rekap.totalJam + data.durasi;

    if (data.hari === 2) rekap.weekend++;

    if (data.kerusakan === 1) rekap.rusakRingan++;
    else if (data.kerusakan === 2) rekap.rusakBerat++;

    rekap.totalDiskon = rekap.totalDiskon + hasil.diskon;
    rekap.totalDenda = rekap.totalDenda + hasil.denda;
    rekap.totalPendapatan = rekap.totalPendapatan + hasil.total;
    return rekap;
}

if (typeof module !== 'undefined') module.exports = { ATURAN, fmt2, rupiah, validasiInput, hitungBiaya, buatRekap, perbaruiRekap };