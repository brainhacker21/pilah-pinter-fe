# 🌿 Pilah Pinter

> Aplikasi web pemilahan sampah cerdas — pengguna mengunggah foto sampah, sistem mengklasifikasikan jenisnya, dan pengguna mendapatkan **koin reward**. Sudah terhubung ke backend REST API dengan autentikasi JWT.

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
  - [DetailsSampahPage](#5-detailssampahpage)
- [Komponen (Components)](#-komponen-components)
  - [AppNavbar](#1-appnavbar)
  - [ConfirmDialog](#2-confirmdialog)
  - [Logo](#3-logo)
- [Autentikasi & Integrasi API](#-autentikasi--integrasi-api)
  - [config/api.js](#1-configapijs)
  - [context/AuthContext.jsx](#2-contextauthcontextjsx)
  - [services/](#3-services)
- [Utilities](#-utilities)
  - [constants.js](#1-constantsjs)
  - [formatDate.js](#2-formatdatejs)
  - [dummy.js](#3-dummyjs)
- [Konfigurasi Tema (Theme)](#-konfigurasi-tema)
- [Routing & Layout](#-routing--layout)
- [Cara Kerja Alur Aplikasi](#-cara-kerja-alur-aplikasi)
- [Scripts yang Tersedia](#-scripts-yang-tersedia)

---

## 🧐 Tentang Proyek

**Pilah Pinter** adalah aplikasi berbasis web yang memungkinkan pengguna untuk:

1. **Login / Registrasi** — Masuk atau mendaftarkan akun baru melalui backend API (JWT access + refresh token).
2. **Melihat daftar sampah** — Menampilkan riwayat transaksi sampah milik pengguna beserta koin yang diperoleh, diambil langsung dari backend dengan pagination server-side. Tiap baris/kartu dapat diklik untuk membuka **halaman detail transaksi**.
3. **Melihat detail transaksi** — Membuka rincian satu transaksi (kategori, berat, harga/kg, tanggal, nominal koin) beserta gambar sampahnya, diambil dari backend berdasarkan ID.
4. **Menambah data sampah** — Mengunggah foto sampah + mengisi berat, lalu menekan **"Hitung"** untuk mengklasifikasikan sampah (kategori, harga per kg, nominal koin) sebelum **"Submit"**.
5. **Mendapatkan koin** — Total koin dihitung dari transaksi pengguna dan ditampilkan di navbar.

> **Status:** Frontend sudah **terintegrasi penuh dengan backend** (bukan lagi data dummy / simulasi `setTimeout`). Autentikasi memakai JWT yang disimpan di `localStorage`, dengan auto-refresh token saat menerima `401`.

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **React** | ^19.2.7 | Library UI utama |
| **React Router DOM** | ^7.18.0 | Routing antar halaman (SPA) |
| **Material UI (MUI)** | ^9.1.2 | Komponen UI siap pakai (Button, Card, Table, dll.) |
| **Emotion** | ^11.14.0 | CSS-in-JS engine untuk MUI |
| **MUI Icons Material** | ^9.1.1 | Ikon Material Design |
| **Axios** | ^1.18.1 | HTTP client untuk komunikasi dengan backend API |
| **PropTypes** | ^15.8.1 | Validasi tipe props komponen |
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
│   ├── config/
│   │   └── api.js              # Instance Axios + interceptor auth & refresh token
│   ├── context/
│   │   └── AuthContext.jsx     # Context autentikasi global (login/register/logout)
│   ├── pages/
│   │   ├── LoginPage.jsx       # Halaman login
│   │   ├── RegisterPage.jsx    # Halaman registrasi
│   │   ├── HomePage.jsx        # Halaman beranda (daftar transaksi sampah)
│   │   ├── TambahSampahPage.jsx# Halaman tambah data sampah (Hitung → Submit)
│   │   └── DetailsSampahPage.jsx# Halaman detail satu transaksi sampah (gambar + rincian)
│   ├── services/
│   │   ├── authService.js      # Endpoint auth (login, register, refresh, logout)
│   │   ├── sampahService.js    # Endpoint klasifikasi sampah
│   │   ├── transaksiService.js # Endpoint transaksi (list, per user, detail, gambar)
│   │   └── userService.js      # Endpoint profil pengguna
│   ├── utils/
│   │   ├── constants.js        # Semua konstanta (warna, routes, pesan error, dll.)
│   │   ├── formatDate.js       # Helper format tanggal (locale id-ID)
│   │   └── dummy.js            # Data dummy lama (tidak lagi dipakai)
│   ├── App.jsx                 # Root component (routing, guard, & layout)
│   ├── main.jsx                # Entry point React (dibungkus AuthProvider)
│   ├── theme.js                # Konfigurasi MUI theme
│   └── index.css               # Global CSS (Tailwind + Google Fonts)
├── .env                        # VITE_API_URL (base URL backend)
├── index.html                  # HTML template utama
├── vite.config.js              # Konfigurasi Vite (+ proxy /api untuk dev)
├── vercel.json                 # Rewrite SPA untuk deploy di Vercel
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── package.json                # Dependensi & scripts
└── eslint.config.js            # Konfigurasi ESLint (flat config)
```

> **Catatan:** `src/utils/dummy.js` masih ada di repo namun **sudah tidak diimpor di mana pun** — sisa dari versi awal sebelum integrasi backend. Aman untuk dihapus.

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
- Axios (HTTP client) & PropTypes
- Tailwind CSS
- Vite & ESLint

### Langkah 3 — Konfigurasi Environment

Buat file `.env` di root proyek dengan variabel base URL backend:

```env
# Development: boleh dikosongkan, proxy Vite yang meneruskan /api ke backend
# Production: isi dengan URL backend live
VITE_API_URL=<url-backend>
```

Untuk **pengembangan lokal**, `vite.config.js` sudah menyediakan proxy: setiap request ke `/api` diteruskan ke backend (`https://pilah-pinter-be.devprox.my.id/api/`) dengan `changeOrigin`, sehingga terhindar dari masalah CORS.

### Langkah 4 — Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan akses URL yang ditampilkan (biasanya `http://localhost:5173`).

> **Hot Module Replacement (HMR)** aktif — setiap perubahan kode akan langsung ter-update di browser tanpa perlu reload manual.

### Langkah 5 — Build untuk Produksi

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`. File-file ini sudah di-minify dan siap untuk di-deploy. `vercel.json` menyediakan rewrite `/(.*) → /index.html` agar routing SPA tetap bekerja saat di-deploy di Vercel.

### Langkah 6 — Preview Hasil Build

```bash
npm run preview
```

Menjalankan server lokal untuk melihat hasil build produksi sebelum di-deploy.

### Langkah 7 — Linting

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
Halaman pertama yang dilihat pengguna. Menampilkan form login dengan validasi di sisi klien dan autentikasi ke backend.

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
| `error` | `string` | Pesan error umum (login gagal dari server) |

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
3. Validasi klien dijalankan — jika gagal, tampilkan pesan error di bawah field
4. Jika valid, panggil `login(email, password)` dari `AuthContext` → `POST /auth/login`
5. `accessToken` & `refreshToken` disimpan ke `localStorage`, data user disimpan ke context
6. Redirect ke `/home`
7. Jika gagal, tampilkan pesan error dari server (atau "Email atau kata sandi tidak valid.")

#### Props
Tidak menerima props — standalone page.

---

### 2. RegisterPage

**File:** `src/pages/RegisterPage.jsx`
**Route:** `/register`

#### Deskripsi
Halaman pendaftaran akun baru dengan 4 field input, validasi lengkap, dan **toggle visibility password per-field**.

#### Tampilan
- Heading "Registrasi"
- Form dengan 4 field:
  - **Nama** — tipe teks
  - **E-mail** — tipe email
  - **Kata sandi** — tipe password, dengan toggle visibility sendiri
  - **Verifikasi kata sandi** — tipe password, dengan toggle visibility sendiri, dicocokkan dengan password utama
- Tombol **"Daftar"** (berubah menjadi "Mendaftar..." saat loading)
- Link ke halaman login: *"Sudah punya akun? Login sekarang"*

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `form` | `{ nama, email, password, verify, alamat }` | Nilai input form |
| `errors` | `object` | Pesan error per field |
| `passwordVisibility` | `{ password: boolean, verify: boolean }` | Toggle visibility **independen** per field password |
| `loading` | `boolean` | Status loading saat submit |
| `error` | `string` | Pesan error umum (registrasi gagal dari server) |

> **Catatan:** Toggle password kini per-field (`password` dan `verify` punya state sendiri di `passwordVisibility`), berbeda dari LoginPage yang hanya memakai satu `showPassword`. Field `alamat` ada di state `form` dan ikut dikirim ke API, namun saat ini belum memiliki input UI tersendiri (terkirim sebagai string kosong).

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
3. Validasi klien dijalankan — jika gagal, tampilkan error
4. Jika valid, panggil `register(nama, email, password, alamat)` → `POST /auth/register`
5. Jika sukses, redirect ke `/login`
6. Jika gagal, tampilkan pesan error dari server (atau "Registrasi gagal")

---

### 3. HomePage

**File:** `src/pages/HomePage.jsx`
**Route:** `/home`

#### Deskripsi
Halaman utama setelah login. Menampilkan daftar transaksi sampah milik pengguna dalam tabel (desktop) atau kartu bertumpuk (mobile) dengan pagination **server-side**.

#### Tampilan

**Banner CTA (Call to Action)**
- Ikon upload hijau di dalam avatar
- Teks: *"Dapatkan koin untuk tentukan jenis sampah"*
- Sub-teks: *"Siapkan file gambar atau kamera anda"*
- Tombol **"Ambil"** → navigasi ke `/tambah`

**Tabel Data Sampah (Desktop — `md` ke atas)**
- Kolom: **ID, Kategori, Berat (Kg), Tanggal, Koin** (dari `TABLE_COLUMNS`)
- Data diambil dari `getTransaksiByUser(user.id)` → `GET /transaksi/user/:userId`
- Tanggal diformat via `formatDate()` (locale `id-ID`)
- Pagination server-side: 10 baris per halaman (`ROWS_PER_PAGE`)
- Setiap baris dapat diklik → navigasi ke `/detail/:id` (halaman detail transaksi)

**Kartu Bertumpuk (Mobile — di bawah `md`)**
- Setiap item menampilkan kategori + koin, badge kategori + ID, dan tanggal
- Dapat diklik → navigasi ke `/detail/:id`
- Dipisahkan oleh `<Divider />`

**Empty State**
- Ditampilkan jika daftar transaksi kosong
- Ikon upload besar + pesan *"Daftar sampah anda kosong"*

**Loading State**
- Saat fetch berjalan, menampilkan *"Memuat data..."*

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `transaksiList` | `array` | Daftar transaksi halaman aktif (dari server) |
| `totalData` | `number` | Total seluruh transaksi (untuk pagination) |
| `rowsPerPage` | `number` | Limit per halaman dari `pagination` server |
| `page` | `number` | Halaman pagination saat ini (dimulai dari 0) |
| `loading` | `boolean` | Status loading saat fetch data |

#### Bentuk Response
```js
res.data.data.data          // array transaksi
res.data.data.pagination    // { totalData, limit, ... }
```

Karena server sudah memotong data per halaman, list ditampilkan apa adanya (tanpa `slice` di klien). `count` pada `<TablePagination>` memakai `totalData`, dan fetch di-trigger ulang setiap `page` berubah.

---

### 4. TambahSampahPage

**File:** `src/pages/TambahSampahPage.jsx`
**Route:** `/tambah`

#### Deskripsi
Halaman untuk menambahkan data sampah baru dengan alur **dua tahap**: **Hitung** (klasifikasi via API) lalu **Submit** (konfirmasi). Terdiri dari area upload gambar dan form berat.

#### Tampilan

**Banner CTA**
- Sama dengan banner di HomePage; tombol "Ambil" → navigasi kembali ke `/home`

**Area Upload Gambar (kiri pada desktop)**
- Drag & drop area dengan border putus-putus hijau + ikon `AddPhotoAlternateIcon`
- **Dinonaktifkan** (opacity redup, `cursor-not-allowed`) sampai field **Berat** diisi angka positif yang valid. Sebelum itu tampil pesan *"Isi berat terlebih dahulu untuk mengunggah gambar"*
- Setelah berat valid: bisa klik / drag file → tampilkan preview full-cover + teks *"Klik untuk ganti gambar"*
- Mengganti gambar atau mengubah berat akan membatalkan hasil hitung sebelumnya

**Form Input (kanan pada desktop)**
- 1 field input: **Berat (Kg)** — tipe number
- Setelah "Hitung" berhasil, muncul **kotak hasil** berisi: Kategori, Harga / Kg, dan Total (nominal koin)
- Tombol utama:
  - Sebelum hitung → **"Hitung"** (variant outlined; loading: "Menghitung...")
  - Setelah hitung berhasil → **"Submit"** (variant contained; loading: "Menyimpan...")

**Dialog Konfirmasi**
- Muncul setelah klik "Submit"
- Judul *"Konfirmasi"*, body konfirmasi data, tombol "Batal" dan "Kirim"

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `preview` | `string \| null` | Data URL preview gambar |
| `selectedFile` | `File \| null` | File gambar terpilih |
| `berat` | `string` | Nilai input berat (Kg) |
| `errorBerat` | `string` | Pesan error field berat |
| `loading` | `boolean` | Status loading saat hitung/submit |
| `confirmOpen` | `boolean` | Status buka/tutup dialog konfirmasi |
| `hasil` | `object \| null` | Hasil klasifikasi (`kategori`, `hargaPerKg`, `nominal`) |

Nilai turunan: `beratValid` (berat angka positif) dan `sudahHitung` (`Boolean(hasil)`) menentukan apakah upload diizinkan dan label/variant tombol utama.

#### Validasi
- **Berat** wajib diisi dan harus angka positif (`"Berat wajib diisi."` / `"Berat harus angka positif."`)
- **Gambar** wajib diupload sebelum menghitung (alert *"Silakan upload gambar terlebih dahulu."*)

#### Alur
1. User mengisi **Berat** — upload gambar baru diaktifkan setelah berat valid
2. User upload gambar (klik atau drag & drop)
3. Klik **"Hitung"** → `klasifikasiSampah(gambar, berat, userId)` → `POST /sampah/klasifikasi` (multipart)
4. Hasil klasifikasi (kategori, harga per kg, nominal) ditampilkan di kotak hasil, tombol berubah menjadi **"Submit"**
5. Klik **"Submit"** → dialog konfirmasi muncul
6. Klik **"Kirim"** → dialog tertutup → setelah 1500ms redirect otomatis ke `/home`

---

### 5. DetailsSampahPage

**File:** `src/pages/DetailsSampahPage.jsx`
**Route:** `/detail/:id`

#### Deskripsi
Halaman **read-only** yang menampilkan rincian satu transaksi sampah. Layout mengikuti pola TambahSampahPage (banner + kartu dua kolom), namun kolom kiri berisi **gambar** dan kolom kanan berisi **panel detail** (bukan form). ID transaksi diambil dari parameter URL (`useParams`).

#### Tampilan

**Banner CTA**
- Ikon `ReceiptLongIcon` di dalam avatar
- Teks: *"Detail transaksi sampah"* + sub-teks *"Rincian sampah yang telah kamu setor"*
- Tombol **"Kembali"** → navigasi ke `/home`

**Gambar Sampah (kiri pada desktop)**
- Diambil dari `getTransaksiGambar(id)` → `GET /transaksi/:id/gambar` (`responseType: 'blob'`), lalu dikonversi ke object URL via `URL.createObjectURL` dan ditampilkan penuh (`object-cover`)
- Object URL di-bebaskan (`URL.revokeObjectURL`) saat gambar berganti / komponen unmount
- Fallback ikon + teks *"Gambar tidak tersedia"* bila gambar gagal dimuat

**Panel Details (kanan pada desktop)**
- Data dari `getTransaksiById(id)` → `GET /transaksi/:id`
- Menampilkan field yang dikirim backend: **Kategori**, **Berat** (Kg), **Harga / Kg** (koin), **Tanggal** (`formatDate`), dan **Pendapatan koin** (nominal)

**Loading & Error State**
- Saat fetch berjalan menampilkan *"Memuat data..."*
- Jika gagal / data tidak ada, menampilkan `<Alert severity="error">`

#### State Management
| State | Tipe | Deskripsi |
|---|---|---|
| `detail` | `object \| null` | Data transaksi (`id`, `kategori`, `beratKg`, `hargaPerKg`, `nominal`, `createdAt`) |
| `gambarUrl` | `string \| null` | Object URL gambar dari blob |
| `loading` | `boolean` | Status loading saat fetch detail |
| `error` | `string` | Pesan error bila fetch detail gagal |

#### Alur
1. HomePage → klik salah satu baris/kartu transaksi → navigasi ke `/detail/:id`
2. Halaman fetch detail (`GET /transaksi/:id`) dan gambar (`GET /transaksi/:id/gambar`) secara paralel
3. Rincian + gambar ditampilkan; klik **"Kembali"** untuk kembali ke `/home`

---

## 🧩 Komponen (Components)

### 1. AppNavbar

**File:** `src/components/AppNavbar.jsx`

#### Deskripsi
Navigation bar responsif yang tampil di halaman-halaman terautentikasi (HomePage, TambahSampahPage & DetailsSampahPage). Mengambil data user dari `AuthContext` dan menghitung total koin sendiri dari transaksi pengguna.

#### Props
| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `onLogout` | `function` | — | Callback saat user klik tombol/menu "Keluar" |

> Divalidasi dengan `PropTypes`. Nama pengguna dan total koin **tidak lagi diterima sebagai props** — komponen mengambilnya sendiri dari `useAuth()` dan fetch transaksi.

#### Tampilan Desktop (≥ `sm` / 640px)
- **Kiri:** Logo Pilah Pinter
- **Kanan:** Coin chip (● N Koin) + Nama pengguna + Tombol "Keluar"

#### Tampilan Mobile (< `sm` / 640px)
- **Kiri:** Logo Pilah Pinter
- **Kanan:** Coin chip + Ikon menu (⋮)
- **Menu dropdown:** Nama pengguna (disabled) → Divider → "Keluar" (dengan `LogoutIcon`)

#### State Internal
| State | Tipe | Deskripsi |
|---|---|---|
| `anchorEl` | `HTMLElement \| null` | Anchor element untuk menu dropdown mobile |
| `totalKoin` | `number` | Total koin, dijumlahkan dari `getTransaksiByUser(user.id)` |

Total koin dihitung dengan `list.reduce((acc, t) => acc + (t.nominal || 0), 0)`. Jika fetch gagal, `totalKoin` di-reset ke 0.

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
- **Judul** (bold, centered) + **Body text** (secondary color, centered)
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

---

## 🔐 Autentikasi & Integrasi API

Seluruh komunikasi dengan backend memakai **Axios** melalui satu instance terpusat, dengan autentikasi berbasis **JWT** (access + refresh token) yang disimpan di `localStorage`.

### 1. config/api.js

**File:** `src/config/api.js`

Instance Axios terpusat (`baseURL` dari `import.meta.env.VITE_API_URL`) dengan dua interceptor:

- **Request interceptor** — menyisipkan header `Authorization: Bearer <accessToken>` dari `localStorage` pada setiap request.
- **Response interceptor** — saat respons `401`, secara otomatis mencoba **refresh token** (`POST /api/auth/refresh-token`). Jika berhasil, `accessToken` baru disimpan dan request awal diulang; jika gagal, token dibersihkan dan pengguna diarahkan ke `/login`.

### 2. context/AuthContext.jsx

**File:** `src/context/AuthContext.jsx`

Context provider autentikasi global (`AuthProvider`) yang membungkus aplikasi di `main.jsx`. Menyediakan `useAuth()` dengan nilai:

| Nilai | Deskripsi |
|---|---|
| `user` | Data pengguna aktif (di-load dari `GET /user/profile` saat ada token) |
| `login(email, password)` | `POST /auth/login`, simpan token + set user |
| `register(nama, email, password, alamat)` | `POST /auth/register` |
| `logout()` | `POST /auth/logout`, bersihkan token + reset user |
| `loading` | Status pengecekan sesi awal |
| `isAuthenticated` | `Boolean(user)` |

### 3. services/

Setiap domain API dibungkus dalam modul service yang memakai instance `api`:

| File | Fungsi | Endpoint |
|---|---|---|
| `authService.js` | `login`, `register`, `refreshToken`, `logout` | `/auth/*` |
| `transaksiService.js` | `getAllTransaksi`, `getTransaksiByUser`, `getTransaksiById`, `getTransaksiGambar` | `/transaksi`, `/transaksi/user/:userId`, `/transaksi/:id`, `/transaksi/:id/gambar` |
| `sampahService.js` | `klasifikasiSampah(gambar, beratKg, userId)` | `POST /sampah/klasifikasi` (multipart/form-data) |
| `userService.js` | `getProfile`, `updateProfile`, `deleteUser` | `/user/profile` |

---

## 🔧 Utilities

### 1. constants.js

**File:** `src/utils/constants.js`

File ini menyimpan **semua nilai konstan** yang digunakan di seluruh aplikasi. Hal ini memastikan konsistensi dan memudahkan perubahan tanpa harus mengubah banyak file.

| Kategori | Konstanta | Deskripsi |
|---|---|---|
| **Brand & Warna** | `BRAND_COLOR`, `BRAND_LIGHT`, `BRAND_DARK`, `BRAND_CONTRAST`, `SECONDARY_COLOR`, `BG_LIGHT`, `BG_DEFAULT`, `BG_PAPER`, `BORDER_COLOR`, `BORDER_HOVER`, `TEXT_SECONDARY`, `TEXT_DARK`, `TEXT_DISABLED` | Palet warna hijau sesuai identitas visual |
| **Tabel** | `ROWS_PER_PAGE`, `TABLE_COLUMNS` | Konfigurasi tabel (10 baris per halaman; kolom: ID, Kategori, Berat (Kg), Tanggal, Koin) |
| **Validasi** | `EMAIL_REGEX`, `MIN_PASSWORD_LENGTH` | Regex email & panjang minimum password |
| **Routes** | `ROUTES.ROOT`, `.LOGIN`, `.REGISTER`, `.HOME`, `.TAMBAH`, `.DETAIL` | Path URL untuk routing (`.DETAIL` dipakai sebagai `/detail/:id`) |
| **Error Messages** | `ERROR_MESSAGES.*` | Pesan error validasi & auth (dalam Bahasa Indonesia) |
| **Button Labels** | `BUTTON_LABELS.*` | Label tombol termasuk state loading (`HITUNG`, `LOADING_HITUNG`, `SUBMIT`, `LOADING_SUBMIT`, dll.) |
| **Dialog Content** | `DIALOG_CONTENT.SUBMIT`, `.LOGOUT` | Konten dialog konfirmasi (judul, body, label tombol) |
| **Page Titles** | `PAGE_TITLES.*` | Judul halaman |
| **Form Labels** | `FORM_LABELS.*` | Label field form |
| **Text Content** | `TEXT_CONTENT.*` | Teks statis UI lainnya |
| **Timeouts** | `TIMEOUTS.*` | Konstanta delay (tersisa dari versi awal) |
| **Misc** | `DEFAULT_USERNAME` | Username default ("User") |

### 2. formatDate.js

**File:** `src/utils/formatDate.js`

Helper untuk memformat string tanggal ISO menjadi format lokal Indonesia (`id-ID`) — menampilkan tahun, bulan (nama panjang), tanggal, jam, dan menit. Dipakai di HomePage (kolom Tanggal) dan DetailsSampahPage (field Tanggal).

```js
formatDate('2026-07-03T18:01:23Z') // → "3 Juli 2026 18.01"
```

### 3. dummy.js

**File:** `src/utils/dummy.js`

Data dummy lama berisi entri sampah statis. **Sudah tidak digunakan** sejak HomePage mengambil data asli dari backend — disisakan dari versi awal dan aman untuk dihapus.

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
/login       → AuthRoute > LoginPage (redirect ke /home jika sudah login)
/register    → AuthRoute > RegisterPage (redirect ke /home jika sudah login)
/home        → ProtectedRoute > MainLayout > HomePage (butuh auth)
/tambah      → ProtectedRoute > MainLayout > TambahSampahPage (butuh auth)
/detail/:id  → ProtectedRoute > MainLayout > DetailsSampahPage (butuh auth)
```

### Route Guard
- **`ProtectedRoute`** — hanya meloloskan pengguna terautentikasi; selain itu redirect ke `/login`.
- **`AuthRoute`** — kebalikannya: pengguna yang sudah login diarahkan ke `/home` (agar tidak membuka login/register lagi).
- Keduanya menunggu `loading` selesai (pengecekan sesi awal) sebelum memutuskan.

### MainLayout

Komponen wrapper internal di `App.jsx` yang menyediakan:
1. **AppNavbar** — ditampilkan di semua child routes (mengambil user & total koin sendiri)
2. **Outlet** — tempat render child page (HomePage / TambahSampahPage / DetailsSampahPage)
3. **ConfirmDialog** — dialog konfirmasi logout

**State di MainLayout:**
- `logoutOpen` — mengontrol tampilan dialog konfirmasi logout

> Logout memanggil `logout()` dari `AuthContext` (bersihkan token + reset user) lalu redirect ke `/login`. Perhitungan total koin **tidak lagi di MainLayout** — sudah dipindah ke AppNavbar.

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
│                       │ (Hitung →    │                   │
│                       │  Submit)     │                   │
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

1. **User membuka aplikasi** → redirect otomatis ke `/login` (atau langsung `/home` jika sesi masih valid)
2. **Di LoginPage:**
   - Jika belum punya akun → klik "Daftar sekarang" → ke `/register`
   - Jika sudah punya akun → isi email & password → klik "Login" → `POST /auth/login` → ke `/home`
3. **Di RegisterPage:**
   - Isi nama, email, password, verifikasi → klik "Daftar" → `POST /auth/register` → ke `/login`
4. **Di HomePage:**
   - Lihat daftar transaksi sampah (dari backend) + total koin di navbar
   - Klik salah satu baris/kartu transaksi → ke `/detail/:id` (lihat gambar + rincian, tombol "Kembali" untuk balik)
   - Klik "Ambil" → ke `/tambah`
   - Klik "Keluar" → dialog konfirmasi → `POST /auth/logout` → kembali ke `/login`
5. **Di TambahSampahPage:**
   - Isi **Berat** → upload gambar → klik **"Hitung"** (`POST /sampah/klasifikasi`)
   - Lihat hasil klasifikasi (kategori, harga/kg, nominal) → klik **"Submit"**
   - Dialog konfirmasi → "Kirim" → kembali ke `/home`

---

## 📜 Scripts yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan Vite development server dengan HMR |
| `npm run build` | Build produksi (output di `dist/`) |
| `npm run preview` | Preview hasil build produksi secara lokal |
| `npm run lint` | Menjalankan ESLint untuk pemeriksaan kode |

---

## 📝 Catatan Tambahan

- **Backend terintegrasi** — Autentikasi, daftar transaksi, dan klasifikasi sampah memakai REST API asli via Axios. Token JWT disimpan di `localStorage` dengan auto-refresh saat `401`. Base URL diatur lewat `VITE_API_URL` (`.env`), dan `vite.config.js` menyediakan proxy `/api` untuk dev lokal.
- **Responsive** — Semua halaman dan komponen dirancang responsif menggunakan kombinasi MUI breakpoints dan Tailwind CSS utilities.
- **Testing hooks** — Elemen interaktif memiliki `data-testid` untuk kemudahan pengujian otomatis.
- **Tema terpusat** — Perubahan warna dan gaya cukup dilakukan di `theme.js` dan `constants.js`.
- **Deploy** — `vercel.json` menyediakan rewrite SPA agar semua route diarahkan ke `index.html`.
- **Sisa versi awal** — `src/utils/dummy.js` dan sebagian konstanta `TIMEOUTS` sudah tidak dipakai; aman dibersihkan.

---

<p align="center">
  Dibuat dengan 💚 oleh tim Pilah Pinter
</p>
