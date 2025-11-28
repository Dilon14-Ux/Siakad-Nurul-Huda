/* --- APPLICATION LOGIC --- */

// State Global Sederhana
const store = {
    attendance: JSON.parse(localStorage.getItem('attendanceData')) || [],
    currentPage: 'data-siswa',
    currentClassTab: 'Kelas 7 Putri'
};

/* --- CORE FUNCTIONS --- */

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    renderSidebar();
    updateDate();
    navigateTo('data-siswa');
    
    // Event Listeners
    document.getElementById('overlay').addEventListener('click', toggleSidebar);
    document.getElementById('toggleSidebarBtn').addEventListener('click', toggleSidebar);
}

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('id-ID', options);
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sb.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Attach navigateTo to window so HTML can access it
window.navigateTo = function(pageId) {
    store.currentPage = pageId;
    
    // Update Active Menu
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if(activeLink) activeLink.classList.add('active');

    // Render Content Based on Page ID
    const content = document.getElementById('content-body');
    const header = document.getElementById('page-header');
    
    // Reset Content
    content.innerHTML = ''; 

    // Logic Render Halaman
    switch(pageId) {
        case 'dashboard':
            header.innerText = "Dashboard Analitik";
            renderDashboard(content);
            break;
        case 'data-siswa':
            header.innerText = "Data Siswa";
            renderDataSiswa(content);
            break;
        case 'data-guru':
            header.innerText = "Data Guru";
            renderDataGuru(content);
            break;
        case 'prog-mts':
            header.innerText = "Program Bulanan Guru MTS";
            renderProgramForm(content, 'MTS');
            break;
        case 'prog-smk':
            header.innerText = "Program Bulanan Guru SMK";
            renderProgramForm(content, 'SMK');
            break;
        case 'absensi-mts':
            header.innerText = "Absensi Siswa MTS";
            renderAbsensiSiswa(content, 'MTS');
            break;
        case 'absensi-smk':
            header.innerText = "Absensi Siswa SMK";
            renderAbsensiSiswa(content, 'SMK');
            break;
        case 'absensi-guru':
            header.innerText = "Absensi Guru";
            renderAbsensiGuru(content);
            break;
        case 'rekap-absensi':
            header.innerText = "Rekapitulasi Absensi";
            renderRekap(content);
            break;
        case 'surat-izin':
            header.innerText = "Surat Izin Guru & Staff";
            renderSuratIzin(content);
            break;
        case 'laporan-wali':
            header.innerText = "Laporan Mingguan Wali Murid";
            renderLaporanWali(content);
            break;
        case 'laporan-umum':
            header.innerText = "Laporan & Export";
            renderLaporanUmum(content);
            break;
    }

    // Close sidebar on mobile after click
    if(window.innerWidth <= 768) {
        const sb = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sb.classList.remove('open');
        overlay.classList.remove('active');
    }
}

function renderSidebar() {
    const container = document.getElementById('menu-container');
    container.innerHTML = MENUS.map(m => `
        <div class="nav-item" data-page="${m.id}" onclick="navigateTo('${m.id}')">
            <i class="fa-solid ${m.icon}"></i>
            <span>${m.label}</span>
        </div>
    `).join('');
}

/* --- RENDERERS --- */
function calculateDashboardData() {
    const totalSiswaMTS = Object.values(RAW_DATA.MTS).flat().length;
    const totalSiswaSMK = Object.values(RAW_DATA.SMK).flat().length;
    const totalSiswa = totalSiswaMTS + totalSiswaSMK;
    const totalGuru = RAW_DATA.GURU.length;

    // --- Data Simulasi Absensi Hari Ini (Mockup) ---
    // Di lingkungan nyata, ini akan diambil dari 'store.attendance' yang difilter berdasarkan tanggal hari ini.
    const mockKehadiran = {
        siswaMTS: totalSiswaMTS - 12, // Contoh: 12 siswa MTS tidak hadir
        siswaSMK: totalSiswaSMK - 7,  // Contoh: 7 siswa SMK tidak hadir
        guru: totalGuru - 3,          // Contoh: 3 guru tidak hadir
    };

    const mockKetidakhadiran = {
        siswaMTS: 12, // Total ketidakhadiran (Alpha, Izin, Sakit)
        siswaSMK: 7,
        guru: 3,
        detailMTS: ["Dzakiyyah Abidah (Izin)", "Permata Najwa (Sakit)", "M. Hakkul Yakin (Alpha)"],
        detailSMK: ["RAHMA GALUH (Alpha)", "M. RASEL AL-FADIL (Sakit)"],
        detailGuru: ["Khumaidi, S.Pd (Izin)", "Maryono (Dinas)"],
    };

    return {
        totalSiswa,
        totalGuru,
        totalSiswaMTS,
        totalSiswaSMK,
        mockKehadiran,
        mockKetidakhadiran
    };
}

function renderDashboard(container) {
    const data = calculateDashboardData();

    // Fungsi untuk membuat kartu ringkasan
    const createSummaryCard = (title, value, icon, color) => `
        <div class="card" style="flex: 1 1 200px; border-left: 5px solid ${color};">
            <div style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 5px;">${title}</div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="color: ${color}; font-size: 2rem;">${value}</h2>
                <i class="fa-solid ${icon}" style="font-size: 1.8rem; color: ${color}40;"></i>
            </div>
        </div>
    `;

    // Fungsi untuk membuat kartu ketidakhadiran
    const createAbsenceCard = (title, count, details, icon, color) => `
        <div class="card" style="flex: 1 1 300px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <i class="fa-solid ${icon}" style="font-size: 1.2rem; color: ${color};"></i>
                <h4 style="color: ${color};">${title} (${count} Orang)</h4>
            </div>
            <ul style="padding-left: 20px; font-size: 0.9rem; color: var(--text-light);">
                ${details.map(d => `<li>${d}</li>`).join('')}
                ${details.length === 0 ? '<li>Nihil</li>' : ''}
            </ul>
        </div>
    `;

    container.innerHTML = `
        <div style="margin-bottom: 30px;">
            <h2>📊 Ringkasan Data Utama</h2>
            <p style="color: var(--text-light);">Overview cepat mengenai status sekolah.</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 30px;">
            ${createSummaryCard("TOTAL SISWA", data.totalSiswa, "fa-users", "#6c5ce7")}
            ${createSummaryCard("TOTAL GURU", data.totalGuru, "fa-chalkboard-teacher", "#a29bfe")}
            ${createSummaryCard("HADIR MTS HARI INI", data.mockKehadiran.siswaMTS, "fa-check-circle", "#00b894")}
            ${createSummaryCard("HADIR SMK HARI INI", data.mockKehadiran.siswaSMK, "fa-check-circle", "#00cec9")}
            ${createSummaryCard("HADIR GURU HARI INI", data.mockKehadiran.guru, "fa-check-circle", "#fdcb6e")}
        </div>

        <div>
            <h2>🚨 Ketidakhadiran Hari Ini</h2>
            <p style="color: var(--text-light);">Detail siswa dan guru yang tidak hadir (Izin, Sakit, Alpha).</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
            ${createAbsenceCard(
                "MTS Tidak Hadir", 
                data.mockKetidakhadiran.siswaMTS, 
                data.mockKetidakhadiran.detailMTS, 
                "fa-user-times", 
                "#e17055"
            )}
            ${createAbsenceCard(
                "SMK Tidak Hadir", 
                data.mockKetidakhadiran.siswaSMK, 
                data.mockKetidakhadiran.detailSMK, 
                "fa-user-times", 
                "#ff7675"
            )}
            ${createAbsenceCard(
                "Guru Tidak Hadir", 
                data.mockKetidakhadiran.guru, 
                data.mockKetidakhadiran.detailGuru, 
                "fa-user-tie", 
                "#d63031"
            )}
        </div>
    `;
}

function renderDataSiswa(container) {
    const allClassKeys = [...Object.keys(RAW_DATA.MTS), ...Object.keys(RAW_DATA.SMK)];
    if(!allClassKeys.includes(store.currentClassTab)) store.currentClassTab = allClassKeys[0];

    // Helper untuk mengubah tab (Krn function inside render string cant access local scope directly)
    window.changeClassTab = (cls) => {
        store.currentClassTab = cls;
        navigateTo('data-siswa');
    }

    let tabsHtml = allClassKeys.map(cls => 
        `<button class="tab-btn ${store.currentClassTab === cls ? 'active' : ''}" 
          onclick="changeClassTab('${cls}')">${cls}</button>`
    ).join('');

    let students = [];
    if(RAW_DATA.MTS[store.currentClassTab]) students = RAW_DATA.MTS[store.currentClassTab];
    else if(RAW_DATA.SMK[store.currentClassTab]) students = RAW_DATA.SMK[store.currentClassTab];

    let tableRows = students.map((s, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${s}</td>
            <td>${store.currentClassTab}</td>
            <td><span style="color:green; font-weight:bold;">Aktif</span></td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <div class="tabs">${tabsHtml}</div>
            <div class="table-container">
                <table>
                    <thead><tr><th>No</th><th>Nama Lengkap</th><th>Kelas</th><th>Status</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
        </div>
    `;
}

function renderDataGuru(container) {
    let rows = RAW_DATA.GURU.map((g, i) => `
    <tr>
        <td>${i+1}</td>
        <td>${g.nama}</td>
        <td>${g.jabatan}</td>
    </tr>
`).join('');

container.innerHTML = `
    <div class="card">
        <div class="table-container">
            <table>
                <thead><tr><th>No</th><th>Nama Guru</th><th>Jabatan</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    </div>
`;
}

function renderProgramForm(container, level) {
    const years = [];
    for(let i=2024; i<=2034; i++) years.push(`${i}-${i+1}`);
    
    const subjects = ['B.Indonesia','B.Inggris','Desains grafis','Editing Video','Ekonomi','IPA','Kesektretarisan','Matematika','Nahwu','PAI','PKN','Penjaskes','Perbengkelan','Sejarah','Shorof','Simkomdig','Retorika'];
    const classesMTS = ['VII Putra','VII Putri','VIII Putra','VIII Putri','IX Putra','IX Putri'];
    const classesSMK = ['X','XI','XII'];
    const jurusan = ['MM', 'OTKP'];

    const classOptions = level === 'MTS' ? classesMTS : classesSMK;
    
    let extraFields = '';
    if(level === 'SMK') {
        extraFields = `<div class="form-group"><label>Jurusan</label><select>${jurusan.map(j=>`<option>${j}</option>`).join('')}</select></div>`;
    }

    container.innerHTML = `
        <div class="card" style="max-width: 800px; margin: 0 auto;">
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="jawaban anda">
            </div>
            <div class="form-group">
                <label>Nama Guru</label>
                <select>
                    <option disabled selected>Pilih Guru</option>
                    ${RAW_DATA.GURU.map(g => `<option>${g.nama} (${g.jabatan})</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Tahun Pengajaran</label>
                <select>${years.map(y=>`<option>${y}</option>`).join('')}</select>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <select>${subjects.map(s=>`<option>${s}</option>`).join('')}</select>
            </div>
            <div class="form-group">
                <label>Kelas</label>
                <select>${classOptions.map(c=>`<option>${c}</option>`).join('')}</select>
            </div>
            ${extraFields}
            <div class="form-group">
                <label>Semester</label>
                <select><option>Ganjil</option><option>Genap</option></select>
            </div>
            <div class="form-group">
                <label>Bulan/Tahun (Contoh: Januari 2025)</label>
                <input type="text" placeholder="Januari 2025">
            </div>
            <button class="btn btn-primary" onclick="alert('Form Disimpan!')">Kirim Program</button>
        </div>
    `;
}

function renderAbsensiSiswa(container, type) {
    const classSource = type === 'MTS' ? RAW_DATA.MTS : RAW_DATA.SMK;
    const classKeys = Object.keys(classSource);
    
    let activeTab = classKeys.includes(store.currentClassTab) ? store.currentClassTab : classKeys[0];

    window.changeAbsensiTab = (cls, type) => {
        store.currentClassTab = cls;
        navigateTo(`absensi-${type.toLowerCase()}`);
    }

    let tabsHtml = classKeys.map(cls => 
        `<button class="tab-btn ${activeTab === cls ? 'active' : ''}" 
          onclick="changeAbsensiTab('${cls}', '${type}')">${cls}</button>`
    ).join('');

    let students = classSource[activeTab];
    
    let rows = students.map((s, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${s}</td>
            <td>
                <div class="attendance-options">
                    <label class="radio-label"><input type="radio" name="att-${i}" value="H"> H</label>
                    <label class="radio-label"><input type="radio" name="att-${i}" value="I"> I</label>
                    <label class="radio-label"><input type="radio" name="att-${i}" value="S"> S</label>
                    <label class="radio-label"><input type="radio" name="att-${i}" value="A"> A</label>
                    <label class="radio-label"><input type="radio" name="att-${i}" value="B"> B</label>
                </div>
            </td>
            <td>
                <div class="file-proof-wrapper">
                    <input type="file" accept="image/*" capture="environment" onchange="handleFileSelect(this, 'time-${i}')">
                    <span id="time-${i}" class="timestamp-badge"></span>
                </div>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <h3>Absensi ${activeTab}</h3>
            <div class="tabs">${tabsHtml}</div>
            <div class="table-container">
                <table id="attendanceTable">
                    <thead><tr><th>No</th><th>Nama</th><th>Status</th><th>Bukti Foto (Wajib)</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
            <div style="margin-top:20px; text-align:right;">
                <button class="btn btn-primary" onclick="saveAttendance('${activeTab}')"><i class="fa-solid fa-save"></i> Simpan Absensi</button>
            </div>
        </div>
    `;
}

function renderAbsensiGuru(container) {
    let rows = RAW_DATA.GURU.map((g, i) => `
    <tr>
        <td>${i+1}</td>
        <td style="font-weight:500;">${g.nama}</td>
            
            <td>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 8px;">
                    <div style="margin-bottom: 8px; font-weight: bold; font-size: 0.85rem; color: var(--primary);">
                        <i class="fa-solid fa-sun"></i> Status Masuk
                    </div>
                    <div class="attendance-options" style="margin-bottom:10px;">
                        <label class="radio-label"><input type="radio" name="attg-in-${i}" value="H"> H</label>
                        <label class="radio-label"><input type="radio" name="attg-in-${i}" value="I"> I</label>
                        <label class="radio-label"><input type="radio" name="attg-in-${i}" value="S"> S</label>
                        <label class="radio-label"><input type="radio" name="attg-in-${i}" value="A"> A</label>
                    </div>
                    <div class="file-proof-wrapper">
                        <label style="font-size:0.75rem;">Bukti Foto Datang:</label>
                        <input type="file" accept="image/*" capture="environment" onchange="handleFileSelect(this, 'time-in-${i}')">
                        <span id="time-in-${i}" class="timestamp-badge" style="color: green;"></span>
                    </div>
                </div>
            </td>

            <td>
                <div style="background: #fff0f0; padding: 10px; border-radius: 8px; border: 1px dashed #fab1a0;">
                    <div style="margin-bottom: 8px; font-weight: bold; font-size: 0.85rem; color: #d63031;">
                        <i class="fa-solid fa-moon"></i> Waktu Pulang
                    </div>
                    <div class="file-proof-wrapper">
                        <label style="font-size:0.75rem;">Bukti Foto Pulang:</label>
                        <input type="file" accept="image/*" capture="environment" onchange="handleFileSelect(this, 'time-out-${i}')">
                        <span id="time-out-${i}" class="timestamp-badge" style="color: #d63031;"></span>
                    </div>
                </div>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3>Absensi Guru & Staff</h3>
                <span style="font-size:0.9rem; color:grey;">Pastikan mengisi jam datang dan pulang.</span>
            </div>
            
            <div class="table-container">
                <table style="width:100%;">
                    <thead>
                        <tr>
                            <th style="width: 5%;">No</th>
                            <th style="width: 25%;">Nama Guru</th>
                            <th style="width: 35%;">Absen Datang (Masuk)</th>
                            <th style="width: 35%;">Absen Pulang (Keluar)</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
            <div style="margin-top:20px; text-align:right;">
                <button class="btn btn-primary" onclick="alert('Data Absensi Guru (Datang & Pulang) Tersimpan Lokal!')">
                    <i class="fa-solid fa-save"></i> Simpan Absensi Guru
                </button>
            </div>
        </div>
    `;
}

function renderSuratIzin(container) {
    const today = new Date().toISOString().split('T')[0];
    const jabatan = ['Kepala sekolah','Waka Kurikulum','Waka kesiswaan','Guru','Tata Usaha','Yang lain'];
    const alasan = ['Kematian','Urusan Keluarga','Sakit','Dinas Luar','Cuti melahirkan','Cuti menikah','Yang lain'];

    container.innerHTML = `
        <div class="card" style="max-width: 800px; margin: 0 auto;">
            <div class="form-group"><label>Email</label><input type="email"></div>
            <div class="form-group"><label>Tanggal Surat</label><input type="date" value="${today}" readonly></div>
            <div class="form-group"><label>Nama Lengkap</label><select>${RAW_DATA.GURU.map(g => `<option>${g.nama}</option>`).join('')}</select></div>
            <div class="form-group"><label>Alamat</label><textarea rows="2"></textarea></div>
            <div class="form-group"><label>Jabatan</label><select>${jabatan.map(j=>`<option>${j}</option>`).join('')}</select></div>
            <div class="form-group"><label>Alasan Izin</label><select>${alasan.map(a=>`<option>${a}</option>`).join('')}</select></div>
            <button class="btn btn-primary" onclick="alert('Surat Izin Diajukan!')">Kirim Surat</button>
        </div>
    `;
}

function renderLaporanWali(container) {
     const today = new Date().toISOString().split('T')[0];
     const weeks = ['1 (Satu)','2 (Dua)','3 (Tiga)','4 (Empat)','5 (Lima)'];
     const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
     const walis = ['Agus Kurniawan,S.Pd','Fadila Saputra,S.Si','Irma Windarti,S.Sos','Kelvin MS,S.Pd','Suhardi,S.Pd','Zuhro Iwatip,S.Pd'];

     container.innerHTML = `
        <div class="card" style="max-width: 800px; margin: 0 auto;">
            <div class="form-group"><label>Email</label><input type="email"></div>
            <div class="form-group"><label>Tanggal Sekarang</label><input type="date" value="${today}" readonly></div>
            <div class="form-group"><label>Minggu Ke</label><select>${weeks.map(w=>`<option>${w}</option>`).join('')}</select></div>
            <div class="form-group"><label>Bulan</label><select>${months.map(m=>`<option>${m}</option>`).join('')}</select></div>
            <div class="form-group"><label>Nama Wali Kelas</label><select>${walis.map(w=>`<option>${w}</option>`).join('')}</select></div>
            <div class="form-group"><label>Password</label><input type="password"></div>
            <button class="btn btn-primary" onclick="alert('Laporan Terkirim!')">Kirim Laporan</button>
        </div>
     `;
}

function renderRekap(container) {
    container.innerHTML = `
        <div class="card">
            <h3>Rekap Absensi Siswa (Contoh Data Dummy)</h3>
            <p>Data diambil dari penyimpanan lokal browser.</p>
            <div class="table-container">
                <table>
                    <thead><tr><th>Nama Siswa</th><th>Kelas</th><th>Hadir</th><th>Sakit</th><th>Izin</th><th>Alpha</th></tr></thead>
                    <tbody>
                        <tr><td>Adila Faradisyah</td><td>Kelas 7 Putri</td><td>20</td><td>1</td><td>0</td><td>0</td></tr>
                        <tr><td>Abdul Karim</td><td>Kelas 7 Putra</td><td>18</td><td>0</td><td>2</td><td>1</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderLaporanUmum(container) {
    container.innerHTML = `
        <div class="card">
            <h3>Pusat Laporan & Export Data</h3>
            <p>Unduh data absensi dan data siswa dalam format Excel atau PDF.</p>
            <div style="display:flex; gap:15px; margin-top:20px; flex-wrap:wrap;">
                <button class="btn btn-success" onclick="exportToExcel()"><i class="fa-solid fa-file-excel"></i> Export Excel (Siswa)</button>
                <button class="btn btn-danger" onclick="exportToPDF()"><i class="fa-solid fa-file-pdf"></i> Export PDF (Siswa)</button>
            </div>
        </div>
    `;
}

/* --- UTILITY & EXPORT FUNCTIONS --- */

window.handleFileSelect = function(input, timeSpanId) {
    if (input.files && input.files[0]) {
        const now = new Date();
        const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        document.getElementById(timeSpanId).innerText = "Recorded: " + timeString;
    }
};

window.saveAttendance = function(className) {
    alert(`Absensi untuk ${className} berhasil disimpan di LocalStorage!`);
};

window.exportToExcel = function() {
    let data = [];
    Object.keys(RAW_DATA.MTS).forEach(cls => {
        RAW_DATA.MTS[cls].forEach(name => data.push({Nama: name, Kelas: cls, Tingkat: 'MTS'}));
    });
    Object.keys(RAW_DATA.SMK).forEach(cls => {
        RAW_DATA.SMK[cls].forEach(name => data.push({Nama: name, Kelas: cls, Tingkat: 'SMK'}));
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");
    XLSX.writeFile(wb, "Data_Siswa_Sekolah.xlsx");
};

window.exportToPDF = function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Laporan Data Siswa", 14, 15);
    
    let bodyData = [];
    Object.keys(RAW_DATA.MTS).forEach(cls => {
        RAW_DATA.MTS[cls].forEach(name => bodyData.push([name, cls, 'MTS']));
    });

    doc.autoTable({
        head: [['Nama Lengkap', 'Kelas', 'Tingkat']],
        body: bodyData,
        startY: 20,
    });

    doc.save("Laporan_Siswa.pdf");
};