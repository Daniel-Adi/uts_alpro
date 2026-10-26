/**
 * Logika halaman: beranda, program berbasis form (Modul A + B), dan dokumentasi.
 * Perhitungan ada di js/program.js; file ini hanya mengurus tampilan.
 */

// Mengamankan teks agar karakter seperti < dan > tidak dianggap tag HTML
function esc(teks) {
    return String(teks).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- Beranda ----------
function renderBeranda() {
    document.getElementById('subJudul').textContent = 'From Problem to Program · ' + IDENTITAS.mataKuliah;

    const utama = STUDI_KASUS.find(k => k.utama);
    document.getElementById('kartuIdentitas').innerHTML = `
        <h3 style="margin-top:0">Studi Kasus ${String(utama.no).padStart(2, '0')}: ${esc(utama.judul)}</h3>
        <p>${esc(utama.detail.ringkasan)}</p>
        <div class="tablewrap">
            <table>
                <thead><tr><th>Anggota</th><th>NIM</th><th>Tanggung jawab utama</th></tr></thead>
                <tbody>
                    ${IDENTITAS.anggota.map(a => `<tr><td>${esc(a.nama)}</td><td>${esc(a.nim)}</td><td>${esc(a.modul)}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
        <p>Repository GitHub: <a href="${IDENTITAS.repository}" target="_blank" rel="noopener">${IDENTITAS.repository}</a></p>
        <p class="aksi">
            <a class="btn utama" href="#kasus-${utama.no}">▶ Coba Program</a>
            <a class="btn" href="#kasus-${utama.no}/dokumentasi">📄 Dokumentasi</a>
        </p>`;

    document.getElementById('daftarKasus').innerHTML = STUDI_KASUS.map(k => {
        const no = String(k.no).padStart(2, '0');
        return k.detail
            ? `<a class="kasus utama" href="#kasus-${k.no}"><span class="no">${no}</span><span><b>${esc(k.judul)}</b><small>Studi kasus kelompok ini · klik untuk mencoba program →</small></span></a>`
            : `<div class="kasus"><span class="no">${no}</span><span>${esc(k.judul)}</span></div>`;
    }).join('');
}

// ---------- Program interaktif (form) ----------
function barisRincian(label, nilai, tebal) {
    return `<tr><td>${tebal ? '<b>' + label + '</b>' : label}</td><td>${tebal ? '<b>' + nilai + '</b>' : nilai}</td></tr>`;
}

function renderProgram(wadah) {
    wadah.innerHTML = `
        <p>Isi data satu kelompok, tekan <b>Proses</b>, lalu isi kelompok berikutnya. Jika semua kelompok sudah dimasukkan, tekan <b>Selesai</b> untuk melihat rekapitulasi.</p>
        <form class="card form-lab" id="formKelompok" novalidate>
            <h3 style="margin-top:0">Data kelompok pengguna</h3>
            <div class="field">
                <label for="inputNama">Nama kelompok</label>
                <input type="text" id="inputNama" placeholder="Contoh: Kelompok Alpha" autocomplete="off">
                <p class="galat" id="galatNama"></p>
            </div>
            <div class="field">
                <label for="inputJenis">Jenis pengguna</label>
                <select id="inputJenis">
                    <option value="">-- pilih --</option>
                    <option value="1">1 = Internal (diskon 15%)</option>
                    <option value="2">2 = Eksternal</option>
                </select>
                <p class="galat" id="galatJenis"></p>
            </div>
            <div class="field">
                <label for="inputDurasi">Durasi penggunaan (jam, maksimal 24)</label>
                <input type="text" inputmode="decimal" id="inputDurasi" placeholder="Contoh: 2 atau 1.5" autocomplete="off">
                <p class="galat" id="galatDurasi"></p>
            </div>
            <div class="field">
                <label for="inputHari">Hari penggunaan</label>
                <select id="inputHari">
                    <option value="">-- pilih --</option>
                    <option value="1">1 = Hari kerja</option>
                    <option value="2">2 = Akhir pekan (tambahan 25%)</option>
                </select>
                <p class="galat" id="galatHari"></p>
            </div>
            <div class="field">
                <label for="inputKerusakan">Status kerusakan</label>
                <select id="inputKerusakan">
                    <option value="">-- pilih --</option>
                    <option value="0">0 = Tidak ada</option>
                    <option value="1">1 = Ringan (denda Rp100.000)</option>
                    <option value="2">2 = Berat (denda Rp500.000)</option>
                </select>
                <p class="galat" id="galatKerusakan"></p>
            </div>
            <div class="aksi">
                <button type="submit" class="btn utama">Proses kelompok</button>
                <button type="button" class="btn" id="btnSelesai">Selesai &amp; lihat rekapitulasi</button>
            </div>
            <p class="galat" id="galatUmum"></p>
        </form>
        <div id="hasilRincian"></div>
        <div id="hasilRekap" hidden></div>`;

    let rekap = buatRekap();
    let jumlahKelompok = 0;
    const ambil = id => document.getElementById(id);
    const kolom = { nama: 'galatNama', jenis: 'galatJenis', durasi: 'galatDurasi', hari: 'galatHari', kerusakan: 'galatKerusakan' };

    function bersihkanGalat() {
        Object.values(kolom).forEach(id => { ambil(id).textContent = ''; });
        ambil('galatUmum').textContent = '';
    }

    ambil('formKelompok').addEventListener('submit', evt => {
        evt.preventDefault();
        bersihkanGalat();
        const cek = validasiInput({
            nama: ambil('inputNama').value,
            jenis: ambil('inputJenis').value,
            durasi: ambil('inputDurasi').value,
            hari: ambil('inputHari').value,
            kerusakan: ambil('inputKerusakan').value
        });
        if (!cek.valid) {
            for (const k in cek.galat) ambil(kolom[k]).textContent = cek.galat[k];
            return;
        }

        const d = cek.data;
        const h = hitungBiaya(d);
        perbaruiRekap(rekap, d, h);
        jumlahKelompok++;

        const teksKerusakan = ['Tidak ada', 'Ringan', 'Berat'][d.kerusakan];
        ambil('hasilRincian').innerHTML = `
            <div class="card hasil">
                <h3 style="margin-top:0">Rincian biaya: ${esc(d.nama)}</h3>
                <div class="tablewrap"><table>
                    <tr><th>Komponen</th><th>Nilai</th></tr>
                    ${barisRincian('Jenis pengguna', d.jenis === 1 ? 'Internal' : 'Eksternal')}
                    ${barisRincian('Durasi', fmt2(d.durasi) + ' jam')}
                    ${barisRincian('Hari', d.hari === 1 ? 'Hari kerja' : 'Akhir pekan')}
                    ${barisRincian('Kerusakan', teksKerusakan)}
                    ${barisRincian('Biaya dasar', rupiah(h.biayaDasar))}
                    ${barisRincian('Tambahan akhir pekan', rupiah(h.tambahanWeekend))}
                    ${barisRincian('Subtotal', rupiah(h.subtotal))}
                    ${barisRincian('Diskon internal', '- ' + rupiah(h.diskon))}
                    ${barisRincian('Biaya setelah diskon', rupiah(h.setelahDiskon))}
                    ${barisRincian('Denda kerusakan', rupiah(h.denda))}
                    ${barisRincian('TOTAL BIAYA', rupiah(h.total), true)}
                </table></div>
                <p class="sukses">Kelompok ke-${jumlahKelompok} masuk ke rekapitulasi. Isi form lagi untuk kelompok berikutnya, atau tekan Selesai.</p>
            </div>`;

        ambil('hasilRekap').hidden = true;
        ambil('formKelompok').reset();
        ambil('inputNama').focus();
    });

    ambil('btnSelesai').addEventListener('click', () => {
        bersihkanGalat();
        const box = ambil('hasilRekap');
        if (jumlahKelompok === 0) {
            ambil('galatUmum').textContent = 'Belum ada kelompok yang diproses. Isi dan proses minimal satu kelompok dulu.';
            return;
        }
        box.hidden = false;
        box.innerHTML = `
            <div class="card hasil">
                <h2 style="margin-top:0">Rekapitulasi laboratorium</h2>
                <div class="tablewrap"><table>
                    <tr><th>Keterangan</th><th>Hasil</th></tr>
                    ${barisRincian('Jumlah kelompok diproses', jumlahKelompok)}
                    ${barisRincian('Pengguna internal', rekap.internal)}
                    ${barisRincian('Pengguna eksternal', rekap.eksternal)}
                    ${barisRincian('Total jam penggunaan', fmt2(rekap.totalJam) + ' jam')}
                    ${barisRincian('Penggunaan akhir pekan', rekap.weekend)}
                    ${barisRincian('Kerusakan ringan', rekap.rusakRingan)}
                    ${barisRincian('Kerusakan berat', rekap.rusakBerat)}
                    ${barisRincian('Total diskon', rupiah(rekap.totalDiskon))}
                    ${barisRincian('Total denda', rupiah(rekap.totalDenda))}
                    ${barisRincian('TOTAL PENDAPATAN', rupiah(rekap.totalPendapatan), true)}
                </table></div>
                <p class="aksi"><button class="btn" type="button" id="btnReset">Mulai dari awal</button></p>
            </div>`;
        ambil('btnReset').addEventListener('click', () => {
            rekap = buatRekap();
            jumlahKelompok = 0;
            box.hidden = true;
            ambil('hasilRincian').innerHTML = '';
            ambil('formKelompok').reset();
            bersihkanGalat();
            window.scrollTo(0, 0);
        });
        box.scrollIntoView({ behavior: 'smooth' });
    });
}

// ---------- Mermaid (dimuat hanya saat halaman dokumentasi dibuka) ----------
function gambarFlowchart(wadah) {
    const target = wadah.querySelector('.mermaid');
    if (!target) return;
    const gambar = () => {
        window.mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
        window.mermaid.run({ nodes: [target] }).catch(() => { target.classList.add('gagal'); });
    };
    if (window.mermaid) { gambar(); return; }
    const sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
    sc.onload = gambar;
    sc.onerror = () => { target.insertAdjacentHTML('afterend', '<p class="galat">Flowchart gagal dimuat (cek koneksi internet). Teks flowchart tetap tersedia di atas.</p>'); };
    document.head.appendChild(sc);
}

// ---------- Dokumentasi ----------
function tabel(header, baris) {
    return `<div class="tablewrap"><table>
        <tr>${header.map(h => `<th>${h}</th>`).join('')}</tr>
        ${baris.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}
    </table></div>`;
}

function daftar(arr) { return '<ul>' + arr.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>'; }

function renderDokumentasi(k, wadah) {
    const d = k.detail;
    wadah.innerHTML = `
        <h2>1. Analisis Masalah</h2>
        <p><b>Latar belakang.</b> ${esc(d.latarBelakang)}</p>
        <h3>Rumusan masalah</h3>${daftar(d.rumusanMasalah)}
        <h3>Tujuan program</h3>${daftar(d.tujuanProgram)}
        <p><b>Pengguna program.</b> ${esc(d.penggunaProgram)}</p>
        <h3>Ketentuan</h3>${tabel(['Aturan', 'Ketentuan'], d.ketentuan)}
        <h3>Asumsi</h3>${daftar(d.asumsi)}

        <h2>2. Rancangan</h2>
        <h3>Input, Proses, Output</h3>
        <div class="tablewrap"><table>
            <tr><th>Input</th><th>Proses</th><th>Output</th></tr>
            <tr><td>${daftar(d.ipo.input)}</td><td>${daftar(d.ipo.proses)}</td><td>${daftar(d.ipo.output)}</td></tr>
        </table></div>
        <h3>Daftar variabel</h3>${tabel(['Variabel', 'Tipe', 'Nilai awal', 'Keterangan'], d.variabel)}
        <h3>Algoritma deskriptif</h3>
        <ol>${d.algoritma.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
        <h3>Pseudocode</h3>
        <pre class="pseudo"><code>${esc(d.pseudocode)}</code></pre>
        <h3>Flowchart</h3>
        <pre class="mermaid">${esc(d.flowchart)}</pre>

        <h2>3. Implementasi</h2>
        <p>Versi web (JavaScript) ada di <code>js/program.js</code> dan <code>js/app.js</code>; versi console C++ ada di <code>studi_kasus.cpp</code>.</p>
        <pre><code>${esc(d.kode)}</code></pre>

        <h2>4. Pengujian</h2>
        <div class="tablewrap"><table>
            <tr><th>No.</th><th>Skenario &amp; masukan</th><th>Diharapkan</th><th>Aktual</th><th>Status</th></tr>
            ${d.pengujian.map(p => `<tr><td>${p.no}</td><td><b>${esc(p.skenario)}</b><br><small>${esc(p.data)}</small></td><td>${esc(p.harapan)}</td><td>${esc(p.aktual)}</td><td><span class="${p.ok ? 'ok' : 'bad'}">${p.ok ? 'Sesuai' : 'Tidak sesuai'}</span></td></tr>`).join('')}
        </table></div>
        <h3>Tabel penelusuran (trace): percabangan</h3>
        <p>${esc(d.traceCabInfo)}</p>
        ${tabel(['Langkah', 'Pernyataan / kondisi', 'Evaluasi', 'Nilai'], d.traceCab)}
        <h3>Tabel penelusuran (trace): perulangan kelompok</h3>
        <p>${esc(d.traceLoopInfo)}</p>
               ${tabel(['Langkah', 'Pernyataan / kondisi', 'Evaluasi', 'Nilai'], d.traceCab)}
        <figure class="gambar-hasil">
            <img src="img/hasil-program.png" alt="Tangkapan layar hasil menjalankan program">
            <figcaption>Gambar: hasil menjalankan program</figcaption>
        </figure>

        <h2>5. Kesalahan yang Ditemukan dan Perbaikan</h2>
        ${tabel(['Kesalahan', 'Perbaikan'], d.kesalahan)}`;
    gambarFlowchart(wadah);
}

// ---------- Navigasi berdasarkan hash ----------
function tampilkan() {
    const m = location.hash.match(/^#kasus-(\d+)(\/dokumentasi)?$/);
    const beranda = document.getElementById('beranda');
    const detail = document.getElementById('detail');
    const k = m && STUDI_KASUS.find(x => x.no === Number(m[1]) && x.detail);

    if (k) {
        beranda.hidden = true;
        detail.hidden = false;
        const dok = !!m[2];
        detail.innerHTML = `
            <p><a href="#beranda">← Kembali ke daftar</a></p>
            <h1>Studi Kasus ${String(k.no).padStart(2, '0')}: ${esc(k.judul)}</h1>
            <div class="tabs">
                <a class="tab ${dok ? '' : 'aktif'}" href="#kasus-${k.no}">▶ Coba Program</a>
                <a class="tab ${dok ? 'aktif' : ''}" href="#kasus-${k.no}/dokumentasi">📄 Dokumentasi</a>
            </div>
            <div id="kontenTab"></div>`;
        const isi = document.getElementById('kontenTab');
        if (dok) renderDokumentasi(k, isi); else renderProgram(isi);
        window.scrollTo(0, 0);
    } else {
        detail.hidden = true;
        beranda.hidden = false;
        if (location.hash === '#daftar') document.getElementById('daftar').scrollIntoView();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBeranda();
    window.addEventListener('hashchange', tampilkan);
    tampilkan();
});