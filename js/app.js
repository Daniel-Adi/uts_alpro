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
    kartu.append(el('p', {}, el('a', { href: '#kasus-' + utama.no }, 'Buka dokumentasi studi kasus ' + String(utama.no).padStart(2, '0') + ' →')));

    const grid = document.getElementById('daftarKasus');
    STUDI_KASUS.forEach(k => {
        const nomor = el('span', { class: 'no' }, String(k.no).padStart(2, '0'));
        if (k.detail) {
            const isi = el('span', {}, [el('b', {}, k.judul), el('small', {}, 'Studi kasus kelompok ini · buka dokumentasi →')]);
            grid.append(el('a', { class: 'kasus utama', href: '#kasus-' + k.no }, [nomor, isi]));
        } else {
            grid.append(el('div', { class: 'kasus' }, [nomor, el('span', {}, k.judul)]));
        }
    });
}

// ---------- Detail studi kasus ----------
function renderDetail(k) {
    const d = k.detail;
    const root = document.getElementById('detail');
    root.replaceChildren();

    root.append(el('p', {}, el('a', { href: '#beranda' }, '← Kembali ke daftar')));
    root.append(el('h1', {}, 'Studi Kasus ' + String(k.no).padStart(2, '0') + ': ' + k.judul));
    root.append(el('p', { class: 'sub' }, 'Modul A (proses utama) + Modul B (rekapitulasi) dalam satu program: studi_kasus.cpp'));

    // 1. Analisis masalah
    root.append(judulBagian('1. Analisis Masalah'));
    root.append(el('p', {}, [el('b', {}, 'Rumusan masalah: '), d.rumusan]));
    root.append(el('h3', {}, 'Ketentuan'));
    root.append(tabel(['Aturan', 'Ketentuan'], d.ketentuan));
    root.append(el('div', { class: 'note' }, [el('b', {}, 'Asumsi kelompok (tidak disebut eksplisit di soal):'), daftar(d.asumsi)]));

    root.append(el('h3', {}, 'Input - Process - Output'));
    root.append(tabel(['Input', 'Proses', 'Output'], [[
        el('div', {}, daftar(d.ipo.input)), el('div', {}, daftar(d.ipo.proses)), el('div', {}, daftar(d.ipo.output))
    ]]));

    root.append(el('h3', {}, 'Variabel dan tipe data'));
    root.append(tabel(['Variabel / konstanta', 'Tipe data', 'Nilai awal', 'Kegunaan'], d.variabel));

    // 2. Algoritma, pseudocode, flowchart
    root.append(judulBagian('2. Algoritma Deskriptif'));
    root.append(daftar(d.algoritma, true));

    root.append(judulBagian('3. Pseudocode'));
    root.append(blokKode(d.pseudocode, 'pseudo'));

    root.append(judulBagian('4. Flowchart'));
    const fc = el('pre', { class: 'mermaid' }, d.flowchart);
    root.append(fc);
    root.append(el('p', { class: 'sub', id: 'catatanFlow' }, ''));

    // 3. Source code
    root.append(judulBagian('5. Source Code (Modul A + Modul B)'));
    const tombol = el('button', { class: 'btn', type: 'button' }, 'Salin kode');
    tombol.addEventListener('click', () => {
        navigator.clipboard.writeText(d.kode).then(() => {
            tombol.textContent = 'Tersalin!';
            setTimeout(() => (tombol.textContent = 'Salin kode'), 1800);
        }).catch(() => (tombol.textContent = 'Gagal menyalin'));
    });
    root.append(el('p', {}, [el('a', { href: 'studi_kasus.cpp' }, 'studi_kasus.cpp'), ' · kompilasi: ', el('code', {}, 'g++ studi_kasus.cpp -o studi_kasus'), ' ', tombol]));
    root.append(blokKode(d.kode));
    root.append(daftar([
        'Validasi: setiap input dibaca dalam perulangan while; jika bukan angka, cin.clear() dan cin.ignore() membersihkan buffer sehingga program tidak berhenti.',
        'Tarif bertingkat: if-else memisahkan durasi sampai 2 jam dan lebih dari 2 jam.',
        'Urutan hitung: biaya dasar, tambahan akhir pekan, diskon (dari subtotal), baru denda ditambahkan sehingga denda tidak didiskon.',
        'Modul B: variabel akumulator diperbarui di setiap putaran do-while dan ditampilkan setelah perulangan selesai.'
    ]));

    // 4. Hasil eksekusi
    root.append(judulBagian('6. Hasil Eksekusi'));
    root.append(el('p', {}, 'Contoh tiga kelompok: Alpha (internal, 3 jam, akhir pekan, rusak ringan), Beta (eksternal, 1,5 jam, hari kerja, rusak berat), Gamma (internal, 2 jam, hari kerja, tanpa kerusakan).'));
    root.append(blokKode(d.hasil));
    root.append(el('div', { class: 'todo' }, 'Tempel tangkapan layar hasil eksekusi di sini (simpan di folder img/ lalu tambahkan tag <img>).'));

    // 5. Pengujian
    root.append(judulBagian('7. Tabel Pengujian'));
    root.append(tabel(['No.', 'Skenario & data masukan', 'Hasil yang diharapkan', 'Hasil aktual', 'Status'],
        d.pengujian.map(p => [
            String(p.no),
            el('span', {}, [el('b', {}, p.skenario), el('br'), el('small', {}, p.data)]),
            p.harapan, p.aktual,
            el('span', { class: p.ok ? 'ok' : 'bad' }, p.ok ? 'Berhasil' : 'Gagal')
        ])));

    // 6. Trace table
    root.append(judulBagian('8. Trace Table'));
    root.append(el('h3', {}, 'Trace table percabangan'));
    root.append(el('p', {}, d.traceCabInfo));
    root.append(tabel(['Langkah', 'Pernyataan', 'Kondisi / hasil kondisi', 'Nilai variabel'], d.traceCab));
    root.append(el('h3', {}, 'Trace table perulangan'));
    root.append(el('p', {}, d.traceLoopInfo));
    root.append(tabel(['Putaran', 'ulang', 'jumlah Internal', 'jumlah Eksternal', 'total Jam', 'jumlah Weekend', 'rusak Ringan', 'rusak Berat', 'total Diskon', 'total Denda', 'total Pendapatan'], d.traceLoop));

    // 7. Kesalahan
    root.append(judulBagian('9. Daftar Kesalahan dan Perbaikan'));
    root.append(tabel(['Kesalahan yang ditemukan', 'Perbaikan'], d.kesalahan));
    root.append(el('p', { class: 'sub' }, 'Sesuaikan daftar ini dengan kesalahan yang benar-benar dialami kelompok Anda.'));

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
    const m = location.hash.match(/^#kasus-(\d+)$/);
    const beranda = document.getElementById('beranda');
    const detail = document.getElementById('detail');
    const k = m && STUDI_KASUS.find(x => x.no === Number(m[1]) && x.detail);
    if (k) {
        beranda.hidden = true; detail.hidden = false;
        renderDetail(k);
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
