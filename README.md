# 🌿 Pilah Pinter

> Aplikasi web pemilahan sampah cerdas — bantu pengguna mengelola dan mengidentifikasi jenis sampah untuk mendapatkan **koin reward**.

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Tech Stack](#-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Panduan Memulai (Step by Step)](#-panduan-memulai-step-by-step)
- [Halaman (Pages)](#-halaman-pages)
  - [LoginPage](#1-loginpage)
  - [RegisterPage](#2-registerpage)
  - [HomePage](#3-homepage)
  - [TambahSampahPage](#4-tambahsampahpage)
- [Komponen (Components)](#-komponen-components)
  - [AppNavbar](#1-appnavbar)
  - [ConfirmDialog](#2-confirmdialog)
  - [Logo](#3-logo)
- [Utilities](#-utilities)
  - [constants.js](#1-constantsjs)
  - [dummy.js](#2-dummyjs)
- [Konfigurasi Tema (Theme)](#-konfigurasi-tema)
- [Routing & Layout](#-routing--layout)
- [Cara Kerja Alur Aplikasi](#-cara-kerja-alur-aplikasi)
- [Scripts yang Tersedia](#-scripts-yang-tersedia)

---

## 🧐 Tentang Proyek

**Pilah Pinter** adalah aplikasi berbasis web yang memungkinkan pengguna untuk:

1. **Login / Registrasi** — Masuk atau mendaftarkan akun baru.
2. **Melihat daftar sampah** — Menampilkan riwayat sampah yang telah diunggah beserta koin yang diperoleh.
3. **Menambah data sampah** — Mengunggah foto sampah, mengisi detail (judul, berat, lokasi, catatan), dan menerima koin sebagai reward.
4. **Mendapatkan koin** — Setiap sampah yang diidentifikasi memberikan koin yang ditampilkan di navbar.

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **React** | ^19.2.7 | Library UI utama |
| **React Router DOM** | ^7.18.0 | Routing antar halaman (SPA) |
| **Material UI (MUI)** | ^9.1.2 | Komponen UI siap pakai (Button, Card, Table, dll.) |
| **Emotion** | ^11.14.0 | CSS-in-JS engine untuk MUI |
| **MUI Icons Material** | ^9.1.1 | Ikon Material Design |
| **Tailwind CSS** | ^3.4.19 | Utility-first CSS untuk styling tambahan |
| **Vite** | ^8.1.0 | Build tool & dev server |
| **ESLint** | ^9.27.0 | Linter untuk menjaga kualitas kode |

---

## 📁 Struktur Folder

```
pilah-pinter/
├── public/
│   ├── favicon.svg             # Favicon aplikasi
│   └── icons.svg               # Sprite icons SVG
├── src/
│   ├── assets/
│   │   ├── hero.png            # Gambar hero (banner)
│   │   ├── logo.svg            # Logo Pilah Pinter (SVG)
│   │   └── vite.svg            # Logo Vite bawaan
│   ├── components/
│   │   ├── AppNavbar.jsx       # Navigasi bar atas (responsive)
│   │   ├── ConfirmDialog.jsx   # Dialog konfirmasi reusable
│   │   └── Logo.jsx            # Komponen logo
│   ├── pages/
│   │   ├── LoginPage.jsx       # Halaman login
│   │   ├── RegisterPage.jsx    # Halaman registrasi
│   │   ├── HomePage.jsx        # Halaman beranda (daftar sampah)
│   │   └── TambahSampahPage.jsx# Halaman tambah data sampah
│   ├── utils/
│   │   ├── constants.js        # Semua konstanta (warna, routes, pesan error, dll.)
│   │   └── dummy.js            # Data dummy untuk tabel sampah
│   ├── App.jsx                 # Root component (routing & layout)
│   ├── main.jsx                # Entry point React
│   ├── theme.js                # Konfigurasi MUI theme
│   └── index.css               # Global CSS (Tailwind + Google Fonts)
├── index.html                  # HTML template utama
├── vite.config.js              # Konfigurasi Vite
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── package.json                # Dependensi & scripts
└── eslint.config.js            # Konfigurasi ESLint (flat config)
```

---

## 🚀 Panduan Memulai (Step by Step)

### Prasyarat

Pastikan sudah terinstal di komputer Anda:

- **Node.js** versi 18 atau lebih baru — [Download Node.js](https://nodejs.org/)
- **npm** (sudah bundled dengan Node.js)
- **Git** (opsional, untuk clone repo)

### Langkah 1 — Clone Repository

```bash
git clone <url-repository>
cd pilah-pinter
```

### Langkah 2 — Install Dependencies

```bash
npm install
```

Perintah ini akan menginstal semua dependensi yang tercantum di `package.json`, termasuk:
- React, React DOM, React Router DOM
- Material UI & Emotion
- Tailwind CSS
- Vite & ESLint

### Langkah 3 — Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan akses URL yang ditampilkan (biasanya `http://localhost:5173`).

> **Hot Module Replacement (HMR)** aktif — setiap perubahan kode akan langsung ter-update di browser tanpa perlu reload manual.

### Langkah 4 — Build untuk Produksi

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`. File-file ini sudah di-minify dan siap untuk di-deploy.

### Langkah 5 — Preview Hasil Build

```bash
npm run preview
```

Menjalankan server lokal untuk melihat hasil build produksi sebelum di-deploy.

### Langkah 6 — Linting

```bash
npm run lint
```

Menjalankan **ESLint** untuk memeriksa kualitas kode dan menemukan potensi error.

---

## 📄 Halaman (Pages)

### 1. LoginPage

**File:** `src/pages/LoginPage.jsx`
**Route:** `/login`

#### Deskripsi
Halaman pertama yang dilihat pengguna. Menampilkan form login dengan validasi di sisi klien.

#### Tampilan
- Logo "Pilah Pinter" di bagian atas
- Heading "Selamat datang"
- Form dengan 2 field:
  - **E-mail** — tipe email, dengan validasi format
  - **Kata sandi** — tipe password, dengan toggle visibility (ikon mata)
- Tombol **"Login"** (berubah menjadi "Masuk..." saat loading)
- Link ke halaman registrasi: *"Belum daftar akun? Daftar sekarang"*

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `form` | `{ email, password }` | Nilai input form |
| `errors` | `object` | Pesan error per field |
| `showPassword` | `boolean` | Toggle tampilkan/sembunyikan password |
| `loading` | `boolean` | Status loading saat submit |
| `error` | `string` | Pesan error umum (login gagal) |

#### Validasi
| Aturan | Pesan Error |
|---|---|
| Email kosong | "E-mail wajib diisi." |
| Format email tidak valid | "Format e-mail tidak valid." |
| Password kosong | "Kata sandi wajib diisi." |
| Password < 6 karakter | "Kata sandi minimal 6 karakter." |

#### Alur
1. User mengisi email dan password
2. Klik tombol "Login"
3. Validasi dijalankan — jika gagal, tampilkan pesan error di bawah field
4. Jika valid, simulasi delay 700ms (mock API call)
5. Redirect ke `/home`

#### Props
Tidak menerima props — standalone page.

#### TODO
- [ ] `handleLogin` — Implementasi API backend untuk login (saat ini menggunakan `setTimeout` simulasi)

---

### 2. RegisterPage

**File:** `src/pages/RegisterPage.jsx`
**Route:** `/register`

#### Deskripsi
Halaman pendaftaran akun baru dengan 4 field input dan validasi lengkap.

#### Tampilan
- Heading "Registrasi"
- Form dengan 4 field:
  - **Nama** — tipe teks
  - **E-mail** — tipe email
  - **Kata sandi** — tipe password, dengan toggle visibility
  - **Verifikasi kata sandi** — tipe password, pencocokan dengan password utama
- Tombol **"Daftar"** (berubah menjadi "Mendaftar..." saat loading)
- Link ke halaman login: *"Sudah punya akun? Login sekarang"*

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `form` | `{ nama, email, password, verify }` | Nilai input form |
| `errors` | `object` | Pesan error per field |
| `showPassword` | `boolean` | Toggle tampilkan/sembunyikan password |
| `loading` | `boolean` | Status loading saat submit |
| `error` | `string` | Pesan error umum |

#### Validasi
| Aturan | Pesan Error |
|---|---|
| Nama kosong | "Nama wajib diisi." |
| Email kosong | "E-mail wajib diisi." |
| Format email tidak valid | "Format e-mail tidak valid." |
| Password kosong | "Kata sandi wajib diisi." |
| Password < 6 karakter | "Kata sandi minimal 6 karakter." |
| Verifikasi kosong | "Verifikasi kata sandi wajib diisi." |
| Verifikasi tidak cocok | "Kata sandi tidak cocok." |

#### Alur
1. User mengisi semua field
2. Klik tombol "Daftar"
3. Validasi dijalankan — jika gagal, tampilkan error
4. Jika valid, simulasi delay 700ms
5. Redirect ke `/login`

#### TODO
- [ ] `handleRegister` — Implementasi API backend untuk register (saat ini menggunakan `setTimeout` simulasi)

---

### 3. HomePage

**File:** `src/pages/HomePage.jsx`
**Route:** `/home`

#### Deskripsi
Halaman utama setelah login. Menampilkan daftar sampah dalam tabel (desktop) atau kartu bertumpuk (mobile) dengan pagination.

#### Tampilan

**Banner CTA (Call to Action)**
- Ikon upload hijau di dalam avatar
- Teks: *"Dapatkan koin untuk tentukan jenis sampah"*
- Sub-teks: *"Siapkan file gambar atau kamera anda"*
- Tombol **"Ambil"** → navigasi ke `/tambah`

**Tabel Data Sampah (Desktop — `md` ke atas)**
- Kolom: ID, Judul, Jenis Sampah, Tanggal, Koin
- Data dari `DUMMY_DATA` (13 entri)
- Pagination: 10 baris per halaman

**Kartu Bertumpuk (Mobile — di bawah `md`)**
- Setiap item menampilkan:
  - Judul + koin (bersebelahan)
  - Badge jenis sampah + ID
  - Tanggal
- Dipisahkan oleh `<Divider />`

**Empty State**
- Ditampilkan jika `DUMMY_DATA` kosong
- Ikon upload besar + pesan *"Daftar sampah anda kosong"*

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `page` | `number` | Halaman pagination saat ini (dimulai dari 0) |

#### Konfigurasi
- `ROWS_PER_PAGE = 10` (dari `constants.js`)
- Pagination menggunakan `<TablePagination>` dari MUI

#### TODO
- [ ] Implementasi API backend untuk mengambil daftar sampah (saat ini menggunakan `DUMMY_DATA`)

---

### 4. TambahSampahPage

**File:** `src/pages/TambahSampahPage.jsx`
**Route:** `/tambah`

#### Deskripsi
Halaman untuk menambahkan data sampah baru. Terdiri dari area upload gambar dan form input detail sampah.

#### Tampilan

**Banner CTA**
- Sama dengan banner di HomePage
- Tombol "Ambil" → navigasi kembali ke `/home`

**Area Upload Gambar (kiri pada desktop)**
- Drag & drop area dengan border putus-putus hijau
- Ikon `AddPhotoAlternateIcon`
- Teks: *"Ambil foto langsung"* dan *"atau tambah file gambar anda"*
- Klik untuk membuka file picker
- Setelah gambar dipilih: tampilkan preview full-cover
- Teks *"Klik untuk ganti gambar"* muncul di bawah preview

**Form Input (kanan pada desktop)**
- 4 field input:
  - **Judul** — nama/judul sampah
  - **Berat** — berat sampah
  - **Lokasi** — lokasi pengambilan
  - **Catatan tambahan** — informasi tambahan
- Tombol **"Submit"** (berubah menjadi "Menyimpan..." saat loading)
- Setelah berhasil: alert sukses *"Sampah berhasil ditambahkan!"*

**Dialog Konfirmasi**
- Muncul setelah klik "Submit" dan semua field valid
- Judul: *"Konfirmasi"*
- Body: *"Apakah Anda yakin data yang dimasukkan sudah benar?..."*
- Tombol "Batal" dan "Kirim"

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `preview` | `string \| null` | Data URL preview gambar |
| `form` | `{ judul, berat, lokasi, catatan }` | Nilai input form |
| `errors` | `object` | Pesan error per field |
| `loading` | `boolean` | Status loading saat submit |
| `success` | `string` | Pesan sukses |
| `confirmOpen` | `boolean` | Status buka/tutup dialog konfirmasi |

#### Validasi
Semua 4 field wajib diisi. Jika kosong, tampilkan pesan: `"<Label> wajib diisi."`

#### Alur
1. User (opsional) upload gambar via klik atau drag & drop
2. User mengisi semua field form
3. Klik "Submit"
4. Validasi — jika gagal, tampilkan error per field
5. Jika valid, dialog konfirmasi muncul
6. User klik "Kirim" → simulasi delay 800ms → alert sukses
7. Setelah 1200ms, redirect otomatis ke `/home`

#### TODO
- [ ] `readImage` — Implementasi API backend untuk upload gambar dan hasil AI untuk mengetahui jenis sampah
- [ ] `handleSubmit` — Implementasi API backend untuk list sampah
- [ ] `handleConfirm` — Implementasi API backend untuk submit data sampah (saat ini menggunakan `setTimeout` simulasi)

---

## 🧩 Komponen (Components)

### 1. AppNavbar

**File:** `src/components/AppNavbar.jsx`

#### Deskripsi
Navigation bar responsif yang tampil di halaman-halaman yang memerlukan autentikasi (HomePage & TambahSampahPage).

#### Props
| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `koin` | `number` | `0` | Jumlah koin yang ditampilkan |
| `username` | `string` | `"User"` | Nama pengguna yang ditampilkan |
| `onLogout` | `function` | — | Callback saat user klik tombol "Keluar" |

#### Tampilan Desktop (≥ `sm` / 640px)
- **Kiri:** Logo Pilah Pinter
- **Kanan:** Coin chip (● 194.000 Koin) + Username + Tombol "Keluar"

#### Tampilan Mobile (< `sm` / 640px)
- **Kiri:** Logo Pilah Pinter
- **Kanan:** Coin chip + Ikon menu (⋮)
- **Menu dropdown:**
  - Username (disabled/read-only)
  - Divider
  - "Keluar" (dengan ikon LogoutIcon)

#### State Internal
| State | Tipe | Deskripsi |
|---|---|---|
| `anchorEl` | `HTMLElement \| null` | Anchor element untuk menu dropdown mobile |

#### Komponen MUI yang Digunakan
`AppBar`, `Toolbar`, `Typography`, `Button`, `Box`, `IconButton`, `Menu`, `MenuItem`, `ListItemIcon`, `Divider`

---

### 2. ConfirmDialog

**File:** `src/components/ConfirmDialog.jsx`

#### Deskripsi
Dialog konfirmasi reusable yang menampilkan ikon peringatan, judul, body teks, dan dua tombol aksi. Digunakan di dua tempat:
- **TambahSampahPage** — konfirmasi sebelum submit data sampah
- **MainLayout (App.jsx)** — konfirmasi sebelum logout

#### Props
| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `open` | `boolean` | — | Status buka/tutup dialog |
| `title` | `string` | `"Konfirmasi"` | Judul dialog |
| `body` | `string` | `""` | Isi teks dialog |
| `confirmLabel` | `string` | `"Kirim"` | Label tombol konfirmasi |
| `cancelLabel` | `string` | `"Batal"` | Label tombol batal |
| `confirmColor` | `string` | `"primary"` | Warna tombol konfirmasi (MUI color) |
| `loading` | `boolean` | `false` | Jika true, tombol-tombol di-disable |
| `onConfirm` | `function` | — | Callback saat tombol konfirmasi diklik |
| `onCancel` | `function` | — | Callback saat tombol batal diklik |

#### Tampilan
- **Ikon peringatan** (⚠) dalam lingkaran oranye
- **Judul** (bold, centered)
- **Body text** (secondary color, centered)
- **Tombol:** Batal (text) + Konfirmasi (contained)
- Pada mobile, kedua tombol menjadi `flex: 1` (lebar penuh)

#### Komponen MUI yang Digunakan
`Dialog`, `DialogContent`, `DialogActions`, `Button`, `Typography`, `Box`, `WarningRoundedIcon`

---

### 3. Logo

**File:** `src/components/Logo.jsx`

#### Deskripsi
Komponen sederhana untuk menampilkan logo Pilah Pinter dari file SVG.

#### Props
| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `width` | `number` | `200` | Lebar logo (px) |
| `height` | `number` | `100` | Tinggi logo (px) |

#### Implementasi
```jsx
<img
  src={LogoAsset}        // dari src/assets/logo.svg
  alt="Pilah Pinter"
  width={width}
  height={height}
  style={{ objectFit: 'contain' }}
/>
```

---

## 🔧 Utilities

### 1. constants.js

**File:** `src/utils/constants.js`

File ini menyimpan **semua nilai konstan** yang digunakan di seluruh aplikasi. Hal ini memastikan konsistensi dan memudahkan perubahan tanpa harus mengubah banyak file.

| Kategori | Konstanta | Deskripsi |
|---|---|---|
| **Brand & Warna** | `BRAND_COLOR`, `BRAND_LIGHT`, `BRAND_DARK`, `BRAND_CONTRAST`, `SECONDARY_COLOR`, `BG_LIGHT`, `BG_DEFAULT`, `BG_PAPER`, `BORDER_COLOR`, `BORDER_HOVER`, `TEXT_SECONDARY`, `TEXT_DARK`, `TEXT_DISABLED` | Palet warna hijau sesuai identitas visual |
| **Tabel** | `ROWS_PER_PAGE`, `TABLE_COLUMNS` | Konfigurasi tabel (10 baris per halaman, 5 kolom) |
| **Validasi** | `EMAIL_REGEX`, `MIN_PASSWORD_LENGTH` | Regex email & panjang minimum password |
| **Routes** | `ROUTES.ROOT`, `.LOGIN`, `.REGISTER`, `.HOME`, `.TAMBAH` | Path URL untuk routing |
| **Error Messages** | `ERROR_MESSAGES.*` | 8 pesan error validasi (dalam Bahasa Indonesia) |
| **Button Labels** | `BUTTON_LABELS.*` | Label tombol termasuk state loading |
| **Dialog Content** | `DIALOG_CONTENT.SUBMIT`, `.LOGOUT` | Konten dialog konfirmasi (judul, body, label tombol) |
| **Page Titles** | `PAGE_TITLES.*` | Judul halaman |
| **Form Labels** | `FORM_LABELS.*` | Label field form |
| **Text Content** | `TEXT_CONTENT.*` | Teks statis UI lainnya |
| **Timeouts** | `TIMEOUTS.LOGIN_DELAY`, `.REGISTER_DELAY`, `.SUBMIT_DELAY`, `.SUCCESS_DELAY` | Delay simulasi API (700–1200ms) |
| **Misc** | `DEFAULT_USERNAME` | Username default ("User") |

---

### 2. dummy.js

**File:** `src/utils/dummy.js`

Data dummy berisi **13 entri sampah** yang digunakan di `HomePage` untuk mengisi tabel. Setiap entri memiliki struktur:

```js
{
  id: number,          // ID unik (1-13)
  judul: string,       // Nama/judul sampah (e.g., "Kaleng susu")
  jenisSampah: string, // Kategori: "Organik" | "Anorganik" | "B3"
  tanggal: string,     // Tanggal (e.g., "18 Juni 2026 18.00")
  koin: number,        // Jumlah koin reward (2.000 - 50.000)
}
```

**Kategori Sampah:**
- **Organik** — Sampah yang dapat terurai (contoh: sisa makanan)
- **Anorganik** — Sampah yang tidak dapat terurai (contoh: botol plastik, kertas)
- **B3** — Bahan Berbahaya dan Beracun (contoh: barang elektronik)

---

## 🎨 Konfigurasi Tema

**File:** `src/theme.js`

Menggunakan `createTheme` dari MUI untuk mengonfigurasi:

### Palet Warna
| Token | Nilai | Kegunaan |
|---|---|---|
| `primary.main` | `#388e3c` | Warna utama hijau |
| `primary.light` | `#c8e6c9` | Hijau muda (background) |
| `primary.dark` | `#2e7d32` | Hijau gelap (hover) |
| `secondary.main` | `#81c784` | Warna sekunder |
| `background.default` | `#c8e6c9` | Background halaman |
| `background.paper` | `#ffffff` | Background kartu/paper |

### Kustomisasi Komponen MUI
| Komponen | Kustomisasi |
|---|---|
| **MuiButton** | No text-transform, font-weight 600, border-radius 10px |
| **MuiTextField** | Variant `filled`, custom background hijau muda, tanpa underline |
| **MuiFilledInput** | Underline dinonaktifkan, autofill border-radius 8px |
| **MuiCard** | Border-radius 16px, subtle shadow |
| **MuiAppBar** | Background putih, teks gelap, shadow halus |
| **MuiTableHead** | Header bold, uppercase, letter-spacing 0.05em |

### Font
- **Primary:** Inter (dari Google Fonts)
- **Fallback:** Roboto, Helvetica, Arial, sans-serif

---

## 🗺 Routing & Layout

**File:** `src/App.jsx`

### Struktur Route

```
/            → Redirect ke /login
/login       → LoginPage (standalone, tanpa navbar)
/register    → RegisterPage (standalone, tanpa navbar)
/home        → MainLayout > HomePage (dengan navbar)
/tambah      → MainLayout > TambahSampahPage (dengan navbar)
```

### MainLayout

Komponen wrapper internal di `App.jsx` yang menyediakan:
1. **AppNavbar** — ditampilkan di semua child routes
2. **Outlet** — tempat render child page (HomePage / TambahSampahPage)
3. **ConfirmDialog** — dialog konfirmasi logout (dipakai bersama)

**State di MainLayout:**
- `logoutOpen` — mengontrol tampilan dialog konfirmasi logout
- `totalKoin` — dihitung dari `DUMMY_DATA.reduce()` (total semua koin)

---

## 🔄 Cara Kerja Alur Aplikasi

```
┌─────────────────────────────────────────────────────────┐
│                    MULAI (/)                             │
│                      │                                   │
│                      ▼                                   │
│                ┌──────────┐                              │
│                │  LOGIN   │ ◄──── Setelah registrasi     │
│                │  PAGE    │       berhasil                │
│                └────┬─────┘                              │
│                     │                                    │
│           ┌─────────┴──────────┐                         │
│           │                    │                         │
│           ▼                    ▼                         │
│    ┌────────────┐      ┌─────────────┐                   │
│    │  REGISTER  │      │    HOME     │                   │
│    │  PAGE      │      │    PAGE     │                   │
│    └────────────┘      └──────┬──────┘                   │
│                               │                         │
│                               ▼                         │
│                       ┌──────────────┐                   │
│                       │ TAMBAH SAMPAH│                   │
│                       │ PAGE         │                   │
│                       └──────┬───────┘                   │
│                              │                          │
│                              ▼                          │
│                    (Konfirmasi Dialog)                   │
│                              │                          │
│                              ▼                          │
│                     Kembali ke HOME                     │
└─────────────────────────────────────────────────────────┘
```

### Alur Detail:

1. **User membuka aplikasi** → redirect otomatis ke `/login`
2. **Di LoginPage:**
   - Jika belum punya akun → klik "Daftar sekarang" → ke `/register`
   - Jika sudah punya akun → isi email & password → klik "Login" → ke `/home`
3. **Di RegisterPage:**
   - Isi nama, email, password, verifikasi → klik "Daftar" → ke `/login`
4. **Di HomePage:**
   - Lihat daftar sampah + total koin di navbar
   - Klik "Ambil" → ke `/tambah`
   - Klik "Keluar" → muncul dialog konfirmasi → kembali ke `/login`
5. **Di TambahSampahPage:**
   - Upload gambar (opsional) + isi form
   - Klik "Submit" → dialog konfirmasi → klik "Kirim" → berhasil → kembali ke `/home`

---

## 📜 Scripts yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan Vite development server dengan HMR |
| `npm run build` | Build produksi (output di `dist/`) |
| `npm run preview` | Preview hasil build produksi secara lokal |
| `npm run lint` | Menjalankan ESLint untuk pemeriksaan kode |

---

## 🚧 TODO — Pengembangan Selanjutnya

Berikut daftar fitur yang masih perlu diimplementasi (ditandai `// TODO` di kode sumber):

| # | File | Fungsi | Deskripsi TODO |
|---|---|---|---|
| 1 | `LoginPage.jsx` | `handleLogin` | Implementasi API backend untuk login |
| 2 | `RegisterPage.jsx` | `handleRegister` | Implementasi API backend untuk register |
| 3 | `HomePage.jsx` | data fetching | Implementasi API backend untuk list sampah |
| 4 | `TambahSampahPage.jsx` | `readImage` | Implementasi API backend untuk upload gambar dan hasil AI untuk mengetahui jenis sampah |
| 5 | `TambahSampahPage.jsx` | `handleSubmit` | Implementasi API backend untuk list sampah |
| 6 | `TambahSampahPage.jsx` | `handleConfirm` | Implementasi API backend untuk submit data sampah |

> **Catatan:** Saat ini semua operasi di atas menggunakan `setTimeout` sebagai simulasi dan `DUMMY_DATA` sebagai data statis. Ganti dengan API call sesungguhnya saat backend sudah siap. Rencananya akan menggunakan **Axios** untuk komunikasi HTTP dengan backend API.

---

## 📝 Catatan Tambahan

- **Belum ada backend** — Semua data masih menggunakan `dummy.js` dan simulasi delay (`setTimeout`). Login dan registrasi hanya bersifat simulasi. Lihat bagian [TODO](#-todo--pengembangan-selanjutnya) untuk detail.
- **Responsive** — Semua halaman dan komponen dirancang responsif menggunakan kombinasi MUI breakpoints dan Tailwind CSS utilities.
- **Aksesibilitas** — Semua elemen interaktif memiliki `data-testid` untuk kemudahan pengujian otomatis.
- **Tema terpusat** — Perubahan warna dan gaya cukup dilakukan di `theme.js` dan `constants.js`.

---

<p align="center">
  Dibuat dengan 💚 oleh tim Pilah Pinter
</p>
