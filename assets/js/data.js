/* --- DATA MASTER SISWA, GURU & CONFIG MENU --- */

const RAW_DATA = {
    MTS: {
        "Kelas 7 Putri": ["Adila Faradisyah","Aisa Pramita","Asri Syabillah Fathona Putri","Celsi Uliasari","Dzakiyyah Abidah","Eza Daneska","Nabila Azzahra","Permata Najwa","Pratiiwi Ramadhona","VEGA MARYANTI","Zulfia Mawaddah","Annisa Safitri","Diana Shavri Wardini","Khayla Latifah","Nurin Nazua Faizah","Merly Aninur Ain'i"],
        "Kelas 8 Putri": ["Arneta Prisillia","Azzahra Syaila","Bais Nauratul Hasanah","Devita Dhini Sefiarani","Elfina Marsya Wijayanti","Fathina Uzma Putri","Juwita Pratiwi Azzahra","Meilia","Nurhidayah BR Panggabean","Nur sopiah Sitompul","Sella Anggraeni","Silvia Ariyanti Ramadhani","Susan Amelya","Ulan Mardiyah"],
        "Kelas 9 Putri": ["Aprilia Wulansari","Aqila Khoirunisa","Arina Dini Subianti","Ayatul Khusna","Ayu Safrini","Divani Gita Az Zuhruf","Dista Vilanda","Imel Aulia Lutvi Az Zahro","Mia Ardianti","Nadia Asyifa","Navela Vidia Arta","Naila Salsabila Al-Fadlillah","Reisya Qori Sefina","Salisa Rahma Nuraeni","Siti Fatimatus Zahro","Zhafira Malinda Putri"],
        "Kelas 7 Putra": ["Abdur Rohim","Muhammad Abdul Karim","Al-Faiz Daniansyah","M. Dimas Abi Nazar","Amsar Dodi Pratama","Bilal Pratama","Fadlan Ramadhon","M. Aska Pratama","Tora Maulana Zikro","Nizam Noval Ghifari. W","Rafa Setiawan","Rafiqi Hamlan","Syarif Hidayatullah","Danes Naufal El-Rafif","M. Zakir  Sujak","Yazidurrohmat Al Kafi","Muhamad Ravi Marjuansyah","M. Isi Al Sabil","M. Hakkul Yakin","Dzaki Abdur Rozak","Ary Yoga Saputra"],
        "Kelas 8 Putra": ["Ahmad Bayu Prayogo","Ahmad Raditya Pratama","Ahmad Rifqi Azhar","Ahzak Pratama","Alif Surya Dinata","Ananda Dwiqi Syaputra","Hasaoran Panggabean","Imam Al Ajilan","M. Fadil Annajmi","Muhammad Rizki Ufadil","Muhammad. Saum Arfaizi","M. Warid Ruzain","M. Raji Amwaludin","Muhammad Fadholi","Muhammad Qhadafi","Nawwa Thohal Arfi","Rafa Putra Pradana","Rahmat Ali Sya'bana","Risky  Anugrah Pratama","Try Elphandi","ALFIAN SHAID MAULANA","REYANSA"],
        "Kelas 9 Putra": ["Afif Fudin","M. Ali Ma'sum","M. Aditya","Muhammad Nur Ilham","Wildan Haikal"]
    },
    SMK: {
        "Kelas 10 OTKP": ["RAHMA GALUH","VIKA AYU"],
        "Kelas 11 OTKP": ["RIKA INAYAH TURROSIDA","DESTIANA IRAMA SAGITA","NAYLA ZAKIA","NURMA FADILA","SYARIFA INAYAH","AULIA NISA SUSANTI","NADA SYIFA","NAYLA SALSABILA","KEYLA AWALLYYAH","VIVI MARVIANA","AMALIA PRIANDINI","DECHA SHEILA MARCIANA","AASNAWATI"],
        "Kelas 12 OTKP": ["siti aminah","Laila Nurhayati","putri dwi aryani","ririn lilia rutpa","halimatul wirda"],
        "Kelas 10 MM": ["M. RIZKY","M. RASEL AL-FADIL","MARCEL","M. IRSYAD ZAKARIYA","M. BAGAS KURNIAWAN","HAFISH MAULANA AHMAD","AHMAD FATIR QODRI","M. MUZAKI FADLU ROSYID"],
        "Kelas 11 MM": ["RIZKI WISNU AJI","AKRIM WILDAN JAGANDI","SAHRIL ROMADON","M.IBNU ZIDANE ARDIANSYAH","TEGAR AVIAN PRATAMA","M. IDHAM JAUHARI","M. ZHAFIF NAZAMZI","AMIRUL SIDIK","YUDA RISKI ABRIANSYAH","REHAN SUKMA MAULANA","EGI RIANTO","RIKAL DANDA AFDAL FIRDAUS","HAJRIYANSA"],
        "Kelas 12 MM": ["Ahmad Ziqri","Muhammad Nur Kholis","Efran Adiwinata","Ahmad Willdan Pratama","Ibnu Delta Erlando","Muhammad Fadhil","Yopika Ardiansa","Al Fajri Chandra Nurrosid","Khanan Maulana Fiqri","Albi Salwi Nasabil","Juliando Praginda","Satria Febrian","April Saputra"]
    },
    GURU: [
        { nama: "Abdul Karim, S.Pd.I", jabatan: "Guru/Staff" },
        { nama: "Abdul Hadi, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Ahmad Afandi, S.Pd.I", jabatan: "Guru/Staff" },
        { nama: "Aidil Pajri", jabatan: "Guru/Staff" },
        { nama: "Deva Ariani, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Dewi Sartimaah, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Echy Novita Sari, S.Pd", jabatan: "Guru/Staff" },
        { nama: "ERNA Juliawati, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Fadila Saputra, S.Si", jabatan: "Guru/Staff" },
        { nama: "Hariyah", jabatan: "Guru/Staff" },
        { nama: "Ina Ambarwati S. Sos., M. A", jabatan: "Guru/Staff" },
        { nama: "Irma Windarti, S. Sos", jabatan: "Guru/Staff" },
        { nama: "Kevin Ms", jabatan: "Guru/Staff" },
        { nama: "Khofipa, S.Sos", jabatan: "Guru/Staff" },
        { nama: "Khoirul Umam S. Pd. I", jabatan: "Guru/Staff" },
        // Perubahan Jabatan (1)
        { nama: "Khumaidi, S.Pd", jabatan: "Kepala Sekolah" }, 
        { nama: "Luthvana Miftakhul Fu'adah", jabatan: "Guru/Staff" },
        { nama: "Maryono", jabatan: "Guru/Staff" },
        { nama: "Muhammad Fatih, S.Pd.I", jabatan: "Guru/Staff" },
        { nama: "Rahma Arisanti", jabatan: "Guru/Staff" },
        { nama: "Sari Yunita, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Siti Halimah, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Siti Umukulsum, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Suhardi, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Untung Purnomo", jabatan: "Guru/Staff" },
        { nama: "Uswatun Hasanah", jabatan: "Guru/Staff" },
        { nama: "Welly Rahma yuriska", jabatan: "Guru/Staff" },
        { nama: "Winta Yulfi Karisna, S.Sos", jabatan: "Guru/Staff" },
        { nama: "YULIANSI ISTIQOMAH S.Pd", jabatan: "Guru/Staff" },
        { nama: "Yuyun Yuniar, S.Pd", jabatan: "Guru/Staff" },
        { nama: "Zainal Muttaqin, S.Pd.I", jabatan: "Guru/Staff" },
        // Perubahan Jabatan (2)
        { nama: "Zuhro Iwatip, S.Pd", jabatan: "Kepala Sekolah" }, 
        { nama: "Zurpiana S.Pd", jabatan: "Guru/Staff" },
        { nama: "Atri", jabatan: "Guru/Staff" },
        { nama: "Ghozi, S.Pd.I", jabatan: "Guru/Staff" }
    ]
};

const MENUS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
    { id: 'data-siswa', label: 'Data Siswa', icon: 'fa-user-graduate' },
    { id: 'data-guru', label: 'Data Guru', icon: 'fa-chalkboard-teacher' },
    { id: 'prog-mts', label: 'Prog. Bulanan MTS', icon: 'fa-calendar-alt' },
    { id: 'prog-smk', label: 'Prog. Bulanan SMK', icon: 'fa-calendar-check' },
    { id: 'absensi-mts', label: 'Absensi MTS', icon: 'fa-clipboard-user' },
    { id: 'absensi-smk', label: 'Absensi SMK', icon: 'fa-clipboard-list' },
    { id: 'absensi-guru', label: 'Absensi Guru', icon: 'fa-user-clock' },
    { id: 'rekap-absensi', label: 'Rekap Absensi', icon: 'fa-chart-pie' },
    { id: 'surat-izin', label: 'Surat Izin Guru/Staff', icon: 'fa-envelope-open-text' },
    { id: 'laporan-wali', label: 'Lap. Mingguan Wali', icon: 'fa-file-signature' },
    { id: 'laporan-umum', label: 'Laporan Umum', icon: 'fa-folder-open' }
];