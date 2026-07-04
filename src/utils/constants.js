// Brand & Colors
export const BRAND_COLOR = '#388e3c'
export const BRAND_LIGHT = '#c8e6c9'
export const BRAND_DARK = '#2e7d32'
export const BRAND_CONTRAST = '#ffffff'
export const SECONDARY_COLOR = '#81c784'
export const BG_LIGHT = '#e8f5e9'
export const BG_DEFAULT = '#c8e6c9'
export const BG_PAPER = '#ffffff'
export const BORDER_COLOR = '#d4ead5'
export const BORDER_HOVER = '#c5e0c6'
export const TEXT_SECONDARY = '#555'
export const TEXT_DARK = '#1a1a1a'
export const TEXT_DISABLED = '#ca8a04'

// Table Configuration
export const ROWS_PER_PAGE = 10
export const TABLE_COLUMNS = ['ID', 'Kategori', 'Berat (Kg)', 'Tanggal', 'Koin']

// Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD_LENGTH = 6

// Routes
export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  TAMBAH: '/tambah',
}

// Messages
export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'E-mail wajib diisi.',
  EMAIL_INVALID: 'Format e-mail tidak valid.',
  PASSWORD_REQUIRED: 'Kata sandi wajib diisi.',
  PASSWORD_TOO_SHORT: 'Kata sandi minimal 6 karakter.',
  NAME_REQUIRED: 'Nama wajib diisi.',
  VERIFY_REQUIRED: 'Verifikasi kata sandi wajib diisi.',
  VERIFY_MISMATCH: 'Kata sandi tidak cocok.',
  LOGIN_FAILED: 'Email atau kata sandi tidak valid.',
}

// Button Labels
export const BUTTON_LABELS = {
  LOGIN: 'Login',
  LOADING_LOGIN: 'Masuk...',
  REGISTER: 'Daftar',
  LOADING_REGISTER: 'Mendaftar...',
  SUBMIT: 'Submit',
  LOADING_SUBMIT: 'Menyimpan...',
  LOGOUT: 'Keluar',
  TAKE: 'Ambil',
  CHANGE_IMAGE: 'Klik untuk ganti gambar',
  CANCEL: 'Batal',
  SEND: 'Kirim',
}

// Confirmation Dialogs
export const DIALOG_CONTENT = {
  SUBMIT: {
    TITLE: 'Konfirmasi',
    BODY: 'Apakah Anda yakin data yang dimasukkan sudah benar? Pastikan tidak ada kolom yang terlewat sebelum menyimpan formulir ini.',
    CONFIRM: 'Kirim',
    CANCEL: 'Batal',
  },
  LOGOUT: {
    TITLE: 'Konfirmasi Keluar',
    BODY: 'Apakah Anda yakin ingin keluar dari akun Anda?',
    CONFIRM: 'Keluar',
    CANCEL: 'Batal',
  },
}

// Page Titles
export const PAGE_TITLES = {
  LOGIN: 'Selamat datang',
  REGISTER: 'Registrasi',
  HOME: 'Beranda',
  TAMBAH: 'Tambah Sampah',
}

// Form Labels
export const FORM_LABELS = {
  EMAIL: 'E-mail',
  PASSWORD: 'Kata sandi',
  SHOW_PASSWORD: 'Tampilkan kata sandi',
  NAME: 'Nama',
  VERIFY_PASSWORD: 'Verifikasi kata sandi',
  TITLE: 'Judul',
  WEIGHT: 'Berat',
  LOCATION: 'Lokasi',
  NOTE: 'Catatan tambahan',
}

// Text Content
export const TEXT_CONTENT = {
  NOT_REGISTERED: 'Belum daftar akun?',
  REGISTER_NOW: 'Daftar sekarang',
  ALREADY_REGISTERED: 'Sudah punya akun?',
  LOGIN_NOW: 'Login sekarang',
  EARN_COINS: 'Dapatkan koin untuk tentukan jenis sampah',
  PREPARE_CAMERA: 'Siapkan file gambar atau kamera anda',
  EMPTY_LIST: 'Daftar sampah anda kosong',
  EMPTY_HINT: 'Silahkan anda tambahkan sampah',
  UPLOAD_PHOTO: 'Ambil foto langsung',
  ADD_FILE: 'tambah file gambar anda',
  SUCCESS_MESSAGE: 'Sampah berhasil ditambahkan!',
}

// Timeouts
export const TIMEOUTS = {
  LOGIN_DELAY: 700,
  REGISTER_DELAY: 700,
  SUBMIT_DELAY: 800,
  SUCCESS_DELAY: 1200,
}

// Misc
export const DEFAULT_USERNAME = 'User'
