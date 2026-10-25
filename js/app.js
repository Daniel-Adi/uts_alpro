/**
 * Logika halaman: menampilkan beranda, daftar studi kasus, 
 * Form interaktif Modul A & B, serta Dokumentasi lengkap Studi Kasus 08.
 */

// ---------- Beranda ----------
function renderBeranda() {
    document.getElementById('subJudul').textContent = 'From Problem to Program · ' + IDENTITAS.mataKuliah;

    const kartu = document.getElementById('kartuIdentitas');
    const utama = STUDI_KASUS.find(k => k.utama);
    kartu.innerHTML = `
        <h3 style="margin-top:0">Studi Kasus ${String(utama.no).padStart(2, '0')}: ${utama.judul}</h3>
        <p>${utama.detail.ringkasan}</p>
        <div class="tablewrap">
            <table>
                <thead><tr><th>Anggota</th><th>NIM</th><th>Tanggung jawab utama</th></tr></thead>
                <tbody>
                    ${IDENTITAS.anggota.map(a => `<tr><td>${a.nama}</td><td>${a.nim}</td><td>${a.modul}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
        <p>Repository GitHub: <a href="${IDENTITAS.repository}" target="_blank">${IDENTITAS.repository}</a></p>
        <p class="aksi">
            <a class="btn utama" href="#kasus-${utama.no}">▶ Coba Program</a>
            <a class="btn" href="#kasus-${utama.no}/dokumentasi">📄 Dokumentasi</a>
        </p>
    `;

    const grid = document.getElementById('daftarKasus');
    grid.innerHTML = '';
    STUDI_KASUS.forEach(k => {
        const nomor = String(k.no).padStart(2, '0');
        if (k.detail) {
            grid.innerHTML += `<a class="kasus utama" href="#kasus-${k.no}"><span class="no">${nomor}</span><span><b>${k.judul}</b><small>Studi kasus kelompok ini · klik untuk mencoba program →</small></span></a>`;
        } else {
            grid.innerHTML += `<div class="kasus"><span class="no">${nomor}</span><span>${k.judul}</span></div>`;
        }
    });
}

// ---------- Program Interaktif Berbasis Form (Modul A & B) ----------
function renderProgram(wadah) {
    wadah.innerHTML = `
        <p>Masukkan data kelompok pengguna laboratorium sesuai urutan flowchart. Program akan memproses rincian biaya tiap kelompok dan mengakumulasikannya ke rekapitulasi akhir laboratorium.</p>
        
        <form class="card form-lab" id="formKelompok">
            <h3 style="margin-top:0">Modul A: Input Data Kelompok Pengguna</h3>
            
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Nama Kelompok:</label>
                <input type="text" id="inputNama" class="form-control" required placeholder="Contoh: Kelompok Alpha" style="width: 100%; padding: 8px;">
            </div>
            
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Jenis Pengguna:</label>
                <select id="inputJenis" class="form-control" style="width: 100%; padding: 8px;">
                    <option value="1">1 = Internal (Memperoleh diskon 15%)</option>
                    <option value="2">2 = Eksternal</option>
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Durasi Penggunaan (jam, maksimal 24):</label>
                <input type="number" id="inputDurasi" class="form-control" min="0.1" max="24" step="0.1" value="2" style="width: 100%; padding: 8px;">
            </div>
            
            <div class="form-group" style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Hari Penggunaan:</label>
                <select id="inputHari" class="form-control" style="width: 100%; padding: 8px;">
                    <option value="1">1 = Hari Kerja</option>
                    <option value="2">2 = Akhir Pekan (Dikenai tambahan 25%)</option>
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Status Kerusakan:</label>
                <select id="inputKerusakan" class="form-control" style="width: 100%; padding: 8px;">
                    <option value="0">0 = Tidak Ada (Rp0)</option>
                    <option value="1">1 = Ringan (Denda Rp100.000)</option>
                    <option value="2">2 = Berat (Denda Rp500.000)</option>
                </select>
            </div>

            <div class="aksi" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button type="submit" class="btn utama">Proses & Hitung Biaya Kelompok</button>
                <button type="button" class="btn" id="btnSelesai">Selesai & Tampilkan Rekapitulasi (Modul B)</button>
            </div>
        </form>

        <div id="hasilRincian"></div>
        <div id="hasilRekap" hidden></div>
    `;

    let rekapData = {
        jumlahInternal: 0, jumlahEksternal: 0, totalJam: 0, jumlahWeekend: 0,
        jumlahRusakRingan: 0, jumlahRusakBerat: 0, totalDiskon: 0, totalDenda: 0, totalPendapatan: 0
    };

    document.getElementById('formKelompok').addEventListener('submit', evt => {
        evt.preventDefault();
        const nama = document.getElementById('inputNama').value.trim();
        const jenis = parseInt(document.getElementById('inputJenis').value);
        const durasi = parseFloat(document.getElementById('inputDurasi').value);
        const hari = parseInt(document.getElementById('inputHari').value);
        const kerusakan = parseInt(document.getElementById('inputKerusakan').value);

        if (!nama) { alert('Nama kelompok tidak boleh kosong!'); return; }
        if (durasi <= 0 || durasi > 24) { alert('Durasi harus lebih dari 0 dan maksimal 24 jam!'); return; }

        const TARIF_JAM_AWAL = 50000.0;
        const TARIF_JAM_LANJUT = 35000.0;
        let biayaDasar = durasi <= 2 ? durasi * TARIF_JAM_AWAL : (2 * TARIF_JAM_AWAL) + ((durasi - 2) * TARIF_JAM_LANJUT);
        let tambahanWeekend = hari === 2 ? biayaDasar * 0.25 : 0;
        let subtotalPenggunaan = biayaDasar + tambahanWeekend;
        let diskon = jenis === 1 ? subtotalPenggunaan * 0.15 : 0;
        let biayaSetelahDiskon = subtotalPenggunaan - diskon;
        let denda = kerusakan === 1 ? 100000.0 : (kerusakan === 2 ? 500000.0 : 0);
        let totalBiaya = biayaSetelahDiskon + denda;

        if (jenis === 1) rekapData.jumlahInternal++; else rekapData.jumlahEksternal++;
        rekapData.totalJam += durasi;
        if (hari === 2) rekapData.jumlahWeekend++;
        if (kerusakan === 1) rekapData.jumlahRusakRingan++;
        if (kerusakan === 2) rekapData.jumlahRusakBerat++;
        rekapData.totalDiskon += diskon;
        rekapData.totalDenda += denda;
        rekapData.totalPendapatan += totalBiaya;

        document.getElementById('hasilRincian').innerHTML = `
            <div class="card" style="border-color: var(--accent); margin-top: 15px;">
                <h3>Rincian Biaya Kelompok: ${nama}</h3>
                <div class="tablewrap">
                    <table>
                        <tr><th>Komponen Rincian</th><th>Nilai / Keterangan</th></tr>
                        <tr><td>Jenis Pengguna</td><td>${jenis === 1 ? 'Internal (Diskon 15%)' : 'Eksternal'}</td></tr>
                        <tr><td>Durasi Penggunaan</td><td>${durasi.toFixed(2)} jam</td></tr>
                        <tr><td>Hari Penggunaan</td><td>${hari === 1 ? 'Hari Kerja' : 'Akhir Pekan (Tambahan 25%)'}</td></tr>
                        <tr><td>Status Kerusakan</td><td>${kerusakan === 0 ? 'Tidak Ada' : (kerusakan === 1 ? 'Ringan (Denda Rp100.000)' : 'Berat (Denda Rp500.000)')}</td></tr>
                        <tr><td>Biaya Dasar</td><td>Rp ${biayaDasar.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Tambahan Weekend (25%)</td><td>Rp ${tambahanWeekend.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Subtotal Penggunaan</td><td>Rp ${subtotalPenggunaan.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Diskon Internal (15%)</td><td>Rp ${diskon.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Biaya Setelah Diskon</td><td>Rp ${biayaSetelahDiskon.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Denda Kerusakan</td><td>Rp ${denda.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td><b>TOTAL BIAYA KELOMPOK</b></td><td><b>Rp ${totalBiaya.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</b></td></tr>
                    </table>
                </div>
                <p class="sub" style="margin-top: 10px; color: var(--ok); font-weight: 600;">✔ Data kelompok berhasil diproses dan dimasukkan ke rekapitulasi. Silakan isi form di atas untuk kelompok berikutnya atau klik tombol Selesai.</p>
            </div>
        `;

        document.getElementById('inputNama').value = '';
        document.getElementById('inputNama').focus();
    });

    document.getElementById('btnSelesai').addEventListener('click', () => {
        const divRekap = document.getElementById('hasilRekap');
        divRekap.hidden = false;
        divRekap.innerHTML = `
            <div class="card" style="background: var(--accent-soft); margin-top: 20px;">
                <h2>Modul B: Rekapitulasi Laboratorium</h2>
                <div class="tablewrap">
                    <table>
                        <tr><th>Parameter Rekapitulasi</th><th>Hasil Akhir</th></tr>
                        <tr><td>Jumlah Pengguna Internal</td><td>${rekapData.jumlahInternal}</td></tr>
                        <tr><td>Jumlah Pengguna Eksternal</td><td>${rekapData.jumlahEksternal}</td></tr>
                        <tr><td>Total Jam Penggunaan</td><td>${rekapData.totalJam.toFixed(2)} jam</td></tr>
                        <tr><td>Jumlah Penggunaan Weekend</td><td>${rekapData.jumlahWeekend}</td></tr>
                        <tr><td>Jumlah Kerusakan Ringan</td><td>${rekapData.jumlahRusakRingan}</td></tr>
                        <tr><td>Jumlah Kerusakan Berat</td><td>${rekapData.jumlahRusakBerat}</td></tr>
                        <tr><td>Total Diskon</td><td>Rp ${rekapData.totalDiskon.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td>Total Denda</td><td>Rp ${rekapData.totalDenda.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td></tr>
                        <tr><td><b>TOTAL PENDAPATAN</b></td><td><b>Rp ${rekapData.totalPendapatan.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</b></td></tr>
                    </table>
                </div>
                <p class="aksi" style="margin-top: 15px;">
                    <button class="btn" type="button" id="btnReset">🔄 Reset / Mulai Program Baru</button>
                </p>
            </div>
        `;
        document.getElementById('btnReset').addEventListener('click', () => location.reload());
        divRekap.scrollIntoView({ behavior: 'smooth' });
    });
}

// ---------- Render Dokumentasi Lengkap ----------
function renderDokumentasi(k, wadah) {
    const d = k.detail;
    wadah.innerHTML = `
        <h2>1. Analisis Masalah</h2>
        <p><b>Rumusan masalah: </b>${d.rumusan}</p>
        <h3>Ketentuan</h3>
        <div class="tablewrap">
            <table>
                <tr><th>Aturan</th><th>Ketentuan</th></tr>
                ${d.ketentuan.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('')}
            </table>
        </div>

        <h2>2. Algoritma Deskriptif</h2>
        <ol>${d.algoritma.map(item => `<li>${item}</li>`).join('')}</ol>

        <h2>3. Pseudocode</h2>
        <pre class="pseudo"><code>${d.pseudocode}</code></pre>

        <h2>4. Flowchart</h2>
        <pre class="mermaid">${d.flowchart}</pre>

        <h2>5. Source Code C++</h2>
        <pre><code>${d.kode}</code></pre>

        <h2>6. Tabel Pengujian</h2>
        <div class="tablewrap">
            <table>
                <tr><th>No.</th><th>Skenario & Data Masukan</th><th>Hasil Diharapkan</th><th>Hasil Aktual</th><th>Status</th></tr>
                ${d.pengujian.map(p => `<tr><td>${p.no}</td><td><b>${p.skenario}</b><br><small>${p.data}</small></td><td>${p.harapan}</td><td>${p.aktual}</td><td><span class="${p.ok ? 'ok' : 'bad'}">${p.ok ? 'Berhasil' : 'Gagal'}</span></td></tr>`).join('')}
            </table>
        </div>

        <h2>7. Daftar Kesalahan dan Perbaikan</h2>
        <div class="tablewrap">
            <table>
                <tr><th>Kesalahan yang Ditemukan</th><th>Perbaikan</th></tr>
                ${d.kesalahan.map(err => `<tr><td>${err[0]}</td><td>${err[1]}</td></tr>`).join('')}
            </table>
        </div>
    `;
    if (window.mermaid) {
        window.mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
        window.mermaid.run({ nodes: wadah.querySelectorAll('.mermaid') });
    }
}

// ---------- Navigasi Berdasarkan Hash ----------
function tampilkan() {
    const m = location.hash.match(/^#kasus-(\d+)(\/dokumentasi)?$/);
    const beranda = document.getElementById('beranda');
    const detail = document.getElementById('detail');
    const k = m && STUDI_KASUS.find(x => x.no === Number(m[1]) && x.detail);

    if (k) {
        beranda.hidden = true;
        detail.hidden = false;
        
        const isDokumentasi = !!m[2];
        detail.innerHTML = `
            <p><a href="#beranda">← Kembali ke daftar</a></p>
            <h1>Studi Kasus ${String(k.no).padStart(2, '0')}: ${k.judul}</h1>
            <p class="sub">Modul A (proses utama) + Modul B (rekapitulasi)</p>

            <div class="tabs">
                <a class="tab ${!isDokumentasi ? 'aktif' : ''}" href="#kasus-${k.no}">▶ Coba Program</a>
                <a class="tab ${isDokumentasi ? 'aktif' : ''}" href="#kasus-${k.no}/dokumentasi">📄 Dokumentasi</a>
            </div>

            <div class="isi-tab" id="kontenTab"></div>
        `;

        const kontenTab = document.getElementById('kontenTab');
        if (isDokumentasi) {
            renderDokumentasi(k, kontenTab);
        } else {
            renderProgram(kontenTab);
        }
        window.scrollTo(0, 0);
    } else {
        detail.hidden = true;
        beranda.hidden = false;
        if (location.hash === '#daftar') {
            document.getElementById('daftar').scrollIntoView();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBeranda();
    window.addEventListener('hashchange', tampilkan);
    tampilkan();
});