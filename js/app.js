/**
 * Logika halaman: menampilkan daftar studi kasus dan detail studi kasus 08.
 * Data berasal dari js/data.js (STUDI_KASUS dan IDENTITAS).
 */

// ---------- Helper ----------
function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;      // hanya untuk data milik sendiri
        else node.setAttribute(k, v);
    });
    [].concat(children || []).forEach(c => node.append(c));
    return node;
}
function judulBagian(teks) { return el('h2', {}, teks); }
function tabel(kepala, baris, kelasKolomStatus) {
    const t = el('table');
    t.append(el('thead', {}, el('tr', {}, kepala.map(k => el('th', {}, k)))));
    t.append(el('tbody', {}, baris.map(r => el('tr', {}, r.map(c => {
        return (c instanceof Node) ? el('td', {}, c) : el('td', {}, String(c));
    })))));
    return el('div', { class: 'tablewrap' }, t);
}
function daftar(items, ordered) {
    return el(ordered ? 'ol' : 'ul', {}, items.map(i => el('li', {}, i)));
}
function blokKode(teks, kelas) {
    return el('pre', { class: kelas || '' }, el('code', {}, teks));
}

// ---------- Beranda ----------
function renderBeranda() {
    document.getElementById('subJudul').textContent =
        'From Problem to Program · ' + IDENTITAS.mataKuliah;

    const kartu = document.getElementById('kartuIdentitas');
    const utama = STUDI_KASUS.find(k => k.utama);
    kartu.append(el('h3', { style: 'margin-top:0' }, 'Studi Kasus ' + String(utama.no).padStart(2, '0') + ': ' + utama.judul));
    kartu.append(el('p', {}, utama.detail.ringkasan));
    kartu.append(tabel(['Anggota', 'NIM', 'Tanggung jawab utama'],
        IDENTITAS.anggota.map(a => [a.nama, a.nim, a.modul])));
    kartu.append(el('p', {}, ['Repository GitHub: ', el('a', { href: IDENTITAS.repository }, IDENTITAS.repository)]));
    kartu.append(el('p', { class: 'aksi' }, [
        el('a', { class: 'btn utama', href: '#kasus-' + utama.no }, '\u25B6 Coba Program'),
        el('a', { class: 'btn', href: '#kasus-' + utama.no + '/dokumentasi' }, '\uD83D\uDCC4 Dokumentasi')
    ]));

    const grid = document.getElementById('daftarKasus');
    STUDI_KASUS.forEach(k => {
        const nomor = el('span', { class: 'no' }, String(k.no).padStart(2, '0'));
        if (k.detail) {
            const isi = el('span', {}, [el('b', {}, k.judul), el('small', {}, 'Studi kasus kelompok ini · klik untuk mencoba program →')]);
            grid.append(el('a', { class: 'kasus utama', href: '#kasus-' + k.no }, [nomor, isi]));
        } else {
            grid.append(el('div', { class: 'kasus' }, [nomor, el('span', {}, k.judul)]));
        }
    });
}

// ---------- Program interaktif ----------
const TAHAP = {
    mulai:     ['Memulai program', ''],
    nama:      ['Modul A \u00b7 Input \u00b7 nama kelompok', 'Teks bebas, tidak boleh kosong'],
    jenis:     ['Modul A \u00b7 Input \u00b7 jenis pengguna', '1 = Internal, 2 = Eksternal'],
    durasi:    ['Modul A \u00b7 Input \u00b7 durasi penggunaan', 'Angka lebih dari 0 sampai 24 (boleh desimal, mis. 1.5)'],
    hari:      ['Modul A \u00b7 Input \u00b7 hari penggunaan', '1 = Hari Kerja, 2 = Akhir Pekan'],
    kerusakan: ['Modul A \u00b7 Input \u00b7 status kerusakan', '0 = Tidak Ada, 1 = Ringan, 2 = Berat'],
    hitung:    ['Modul A \u00b7 Proses perhitungan biaya', ''],
    rincian:   ['Modul A \u00b7 Menampilkan rincian biaya', ''],
    rekap:     ['Modul B \u00b7 Memperbarui rekapitulasi', ''],
    ulang:     ['Pilihan mengulang atau mengakhiri', 'y = proses kelompok lain, n = selesai dan tampilkan rekapitulasi'],
    selesai:   ['Modul B \u00b7 Rekapitulasi selesai', 'Program selesai']
};

function renderProgram(wadah, k) {
    wadah.append(el('p', {}, 'Jalankan program sesuai rancangan di dokumentasi: ketik jawaban pada kolom di bawah lalu tekan Enter, seperti di console. Program memproses beberapa kelompok, lalu menampilkan rekapitulasi laboratorium.'));

    const status = el('div', { class: 'status-tahap' }, '');
    const keluaran = el('pre', { class: 'term-out', 'aria-live': 'polite' });
    const petunjuk = el('div', { class: 'term-hint' }, '');
    const kolom = el('input', { type: 'text', class: 'term-in', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Input program' });
    const kirim = el('button', { class: 'btn utama', type: 'submit' }, 'Kirim');
    const form = el('form', { class: 'term-form' }, [el('span', { class: 'term-prompt' }, '>'), kolom, kirim]);
    const ulangi = el('button', { class: 'btn', type: 'button' }, '\u21BB Jalankan ulang');
    const lanjut = el('a', { class: 'btn utama', href: '#kasus-' + k.no + '/dokumentasi', hidden: '' }, 'Lanjut ke dokumentasi \u2192');

    const terminal = el('div', { class: 'terminal' }, [keluaran, form]);
    wadah.append(status, terminal, petunjuk, el('p', { class: 'aksi' }, [ulangi, lanjut]));
    wadah.append(el('div', { class: 'note' }, 'Program ini berjalan di browser dan merupakan terjemahan baris-per-baris dari studi_kasus.cpp (urutan input, validasi, perhitungan, rincian, dan rekapitulasi sama). Untuk penilaian, program C++ tetap dikompilasi dan dijalankan secara lokal.'));

    let sesi = null;
    const gulir = () => { keluaran.scrollTop = keluaran.scrollHeight; };
    const tampilTahap = kode => {
        const [label, hint] = TAHAP[kode] || [kode, ''];
        status.textContent = 'Tahap: ' + label;
        petunjuk.textContent = hint ? 'Petunjuk: ' + hint : '';
    };
    const mulai = () => {
        keluaran.textContent = '';
        lanjut.hidden = true;
        kolom.disabled = false; kirim.disabled = false; kolom.value = '';
        sesi = mulaiSesi(t => { keluaran.append(document.createTextNode(t)); gulir(); }, tampilTahap);
        akhiriJikaSelesai();
        kolom.focus({ preventScroll: true });
    };
    const akhiriJikaSelesai = () => {
        if (sesi.selesai) { kolom.disabled = true; kirim.disabled = true; lanjut.hidden = false; }
    };
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!sesi || sesi.selesai) return;
        const baris = kolom.value;
        keluaran.append(el('span', { class: 'echo' }, baris + '\n'));   // gema ketikan, seperti di terminal
        kolom.value = '';
        sesi.kirim(baris);
        akhiriJikaSelesai();
        gulir();
    });
    ulangi.addEventListener('click', mulai);
    terminal.addEventListener('click', () => { if (!kolom.disabled) kolom.focus({ preventScroll: true }); });
    mulai();
}

// ---------- Detail studi kasus ----------
function renderDetail(k, tab) {
    const d = k.detail;
    const root = document.getElementById('detail');
    root.replaceChildren();
    const nomor = String(k.no).padStart(2, '0');

    root.append(el('p', {}, el('a', { href: '#beranda' }, '\u2190 Kembali ke daftar')));
    root.append(el('h1', {}, 'Studi Kasus ' + nomor + ': ' + k.judul));
    root.append(el('p', { class: 'sub' }, 'Modul A (proses utama) + Modul B (rekapitulasi) dalam satu program: studi_kasus.cpp'));

    root.append(el('div', { class: 'tabs' }, [
        el('a', { class: 'tab' + (tab === 'program' ? ' aktif' : ''), href: '#kasus-' + k.no }, '\u25B6 Coba Program'),
        el('a', { class: 'tab' + (tab === 'dokumentasi' ? ' aktif' : ''), href: '#kasus-' + k.no + '/dokumentasi' }, '\uD83D\uDCC4 Dokumentasi')
    ]));
    const isi = el('div', { class: 'isi-tab' });
    root.append(isi);

    if (tab === 'program') { renderProgram(isi, k); return; }

    // 1. Analisis masalah
    isi.append(el('div', { class: 'note' }, ['Rancangan di halaman ini sudah diimplementasikan menjadi program interaktif. ', el('a', { href: '#kasus-' + k.no }, 'Coba program \u2192')]));
    isi.append(judulBagian('1. Analisis Masalah'));
    isi.append(el('p', {}, [el('b', {}, 'Rumusan masalah: '), d.rumusan]));
    isi.append(el('h3', {}, 'Ketentuan'));
    isi.append(tabel(['Aturan', 'Ketentuan'], d.ketentuan));
    isi.append(el('div', { class: 'note' }, [el('b', {}, 'Asumsi kelompok (tidak disebut eksplisit di soal):'), daftar(d.asumsi)]));

    isi.append(el('h3', {}, 'Input - Process - Output'));
    isi.append(tabel(['Input', 'Proses', 'Output'], [[
        el('div', {}, daftar(d.ipo.input)), el('div', {}, daftar(d.ipo.proses)), el('div', {}, daftar(d.ipo.output))
    ]]));

    isi.append(el('h3', {}, 'Variabel dan tipe data'));
    isi.append(tabel(['Variabel / konstanta', 'Tipe data', 'Nilai awal', 'Kegunaan'], d.variabel));

    // 2. Algoritma, pseudocode, flowchart
    isi.append(judulBagian('2. Algoritma Deskriptif'));
    isi.append(daftar(d.algoritma, true));

    isi.append(judulBagian('3. Pseudocode'));
    isi.append(blokKode(d.pseudocode, 'pseudo'));

    isi.append(judulBagian('4. Flowchart'));
    const fc = el('pre', { class: 'mermaid' }, d.flowchart);
    isi.append(fc);
    isi.append(el('p', { class: 'sub', id: 'catatanFlow' }, ''));

    // 3. Source code
    isi.append(judulBagian('5. Source Code (Modul A + Modul B)'));
    const tombol = el('button', { class: 'btn', type: 'button' }, 'Salin kode');
    tombol.addEventListener('click', () => {
        navigator.clipboard.writeText(d.kode).then(() => {
            tombol.textContent = 'Tersalin!';
            setTimeout(() => (tombol.textContent = 'Salin kode'), 1800);
        }).catch(() => (tombol.textContent = 'Gagal menyalin'));
    });
    isi.append(el('p', {}, [el('a', { href: 'studi_kasus.cpp' }, 'studi_kasus.cpp'), ' · kompilasi: ', el('code', {}, 'g++ studi_kasus.cpp -o studi_kasus'), ' ', tombol]));
    isi.append(blokKode(d.kode));
    isi.append(daftar([
        'Validasi: setiap input dibaca dalam perulangan while; jika bukan angka, cin.clear() dan cin.ignore() membersihkan buffer sehingga program tidak berhenti.',
        'Tarif bertingkat: if-else memisahkan durasi sampai 2 jam dan lebih dari 2 jam.',
        'Urutan hitung: biaya dasar, tambahan akhir pekan, diskon (dari subtotal), baru denda ditambahkan sehingga denda tidak didiskon.',
        'Modul B: variabel akumulator diperbarui di setiap putaran do-while dan ditampilkan setelah perulangan selesai.'
    ]));

    // 4. Hasil eksekusi
    isi.append(judulBagian('6. Hasil Eksekusi'));
    isi.append(el('p', {}, 'Contoh tiga kelompok: Alpha (internal, 3 jam, akhir pekan, rusak ringan), Beta (eksternal, 1,5 jam, hari kerja, rusak berat), Gamma (internal, 2 jam, hari kerja, tanpa kerusakan).'));
    isi.append(blokKode(d.hasil));
    isi.append(el('div', { class: 'todo' }, 'Tempel tangkapan layar hasil eksekusi di sini (simpan di folder img/ lalu tambahkan tag <img>).'));

    // 5. Pengujian
    isi.append(judulBagian('7. Tabel Pengujian'));
    isi.append(tabel(['No.', 'Skenario & data masukan', 'Hasil yang diharapkan', 'Hasil aktual', 'Status'],
        d.pengujian.map(p => [
            String(p.no),
            el('span', {}, [el('b', {}, p.skenario), el('br'), el('small', {}, p.data)]),
            p.harapan, p.aktual,
            el('span', { class: p.ok ? 'ok' : 'bad' }, p.ok ? 'Berhasil' : 'Gagal')
        ])));

    // 6. Trace table
    isi.append(judulBagian('8. Trace Table'));
    isi.append(el('h3', {}, 'Trace table percabangan'));
    isi.append(el('p', {}, d.traceCabInfo));
    isi.append(tabel(['Langkah', 'Pernyataan', 'Kondisi / hasil kondisi', 'Nilai variabel'], d.traceCab));
    isi.append(el('h3', {}, 'Trace table perulangan'));
    isi.append(el('p', {}, d.traceLoopInfo));
    isi.append(tabel(['Putaran', 'ulang', 'jumlah Internal', 'jumlah Eksternal', 'total Jam', 'jumlah Weekend', 'rusak Ringan', 'rusak Berat', 'total Diskon', 'total Denda', 'total Pendapatan'], d.traceLoop));

    // 7. Kesalahan
    isi.append(judulBagian('9. Daftar Kesalahan dan Perbaikan'));
    isi.append(tabel(['Kesalahan yang ditemukan', 'Perbaikan'], d.kesalahan));
    isi.append(el('p', { class: 'sub' }, 'Sesuaikan daftar ini dengan kesalahan yang benar-benar dialami kelompok Anda.'));

    gambarFlowchart(fc);
}

// Flowchart memakai Mermaid dari CDN; jika gagal dimuat, teks flowchart tetap tampil.
function gambarFlowchart(node) {
    const catatan = document.getElementById('catatanFlow');
    const jalankan = () => {
        try {
            window.mermaid.initialize({ startOnLoad: false, theme: 'neutral', flowchart: { htmlLabels: true, curve: 'basis' } });
            window.mermaid.run({ nodes: [node] });
        } catch (e) { catatan.textContent = 'Flowchart gagal digambar; teks sumber ditampilkan.'; }
    };
    if (window.mermaid) { jalankan(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
    s.onload = jalankan;
    s.onerror = () => { catatan.textContent = 'Flowchart tidak dapat dimuat (periksa koneksi internet); teks sumber ditampilkan.'; };
    document.head.append(s);
}

// ---------- Navigasi berdasarkan hash ----------
function tampilkan() {
    const m = location.hash.match(/^#kasus-(\d+)(\/dokumentasi)?$/);
    const beranda = document.getElementById('beranda');
    const detail = document.getElementById('detail');
    const k = m && STUDI_KASUS.find(x => x.no === Number(m[1]) && x.detail);
    if (k) {
        beranda.hidden = true; detail.hidden = false;
        renderDetail(k, m[2] ? 'dokumentasi' : 'program');
        window.scrollTo(0, 0);
    } else {
        detail.hidden = true; beranda.hidden = false;
        if (location.hash === '#daftar') document.getElementById('daftar').scrollIntoView();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBeranda();
    window.addEventListener('hashchange', tampilkan);
    tampilkan();
});
