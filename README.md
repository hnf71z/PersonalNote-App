# MyPersonal App

Aplikasi catatan sederhana dibuat dengan React + Vite. README ini menjelaskan tujuan proyek, teknologi yang digunakan, struktur folder, cara menjalankan aplikasi, kontrak kecil (inputs/outputs), edge case, dan langkah selanjutnya.

## Deskripsi singkat

MyPersonal App adalah aplikasi web untuk membuat, mencari, mengarsipkan, dan melihat detail catatan. Proyek ini ditujukan sebagai latihan pembuatan aplikasi React menggunakan konteks (Context API), hooks kustom, dan struktur komponen yang modular.

## Fitur utama

- Registrasi dan login (mock/auth sederhana)
- Menambah catatan baru (title, body, tags)
- Melihat daftar catatan
- Melihat detail catatan
- Mencari catatan lewat SearchBar
- Mengarsipkan dan mengembalikan catatan
- Halaman arsip terpisah
- Proteksi route untuk halaman yang butuh autentikasi
- Notifikasi toast untuk aksi penting

## Teknologi

- React
- Vite
- JavaScript (ESNext)
- Context API (Auth, Theme, Language, Toast)
- Custom hooks (contoh: `useInput`)

## Pra-syarat

- Node.js (v16+) dan npm/yarn/pnpm

## Menjalankan proyek (pengembangan)

Buka terminal (zsh) di root proyek lalu jalankan:

```bash
# pasang dependensi
npm install

# jalankan dev server
npm run dev
```

Setelah server berjalan, buka http://localhost:5173 (atau alamat yang ditunjukkan oleh Vite).

## Build untuk produksi

```bash
npm run build
npm run preview
```

## Perintah berguna (dari `package.json`)

- `npm run dev` — jalankan server development
- `npm run build` — buat build produksi
- `npm run preview` — preview hasil build lokal

> Jika Anda memakai yarn atau pnpm, ganti `npm run` ke `yarn` / `pnpm` sesuai paket manajer.

## Struktur proyek (ringkasan)

- `index.html` - entry HTML
- `src/`
  - `App.jsx` - root app
  - `index.jsx` - mount React
  - `components/` - komponen UI (Navigation, NotesList, ProtectedRoute, SearchBar, dll.)
  - `contexts/` - Context providers (Auth, Theme, Language, Toast)
  - `hooks/` - hooks kustom (mis. `useInput.js`)
  - `pages/` - halaman aplikasi (NotesPage, AddNotePage, LoginPage, dll.)
  - `styles/` - `style.css`
  - `utils/` - utilitas & data lokal/network
- `public/` - aset statis

> Lihat file sumber untuk detail implementasi setiap modul.

## Kontrak kecil (inputs/outputs)

- Input: data catatan baru (object { title, body, tags? })
- Output: tampilan daftar catatan, detail catatan, status sukses/error melalui Toast
- Error mode: aksi yang gagal akan memunculkan pesan melalui Toast; route yang dilindungi mengarahkan ke halaman login.

## Edge cases yang ditangani / yang sebaiknya diperhatikan

- Form kosong (title/body) — harus divalidasi sebelum disimpan
- Pencarian pada daftar kosong — tampilkan pesan "tidak ada hasil"
- Aksi arsip pada catatan yang sudah diarsipkan — pastikan UI menyesuaikan
- Keadaan offline / kegagalan jaringan — fallback ke `local-data.js` atau tampilkan error

## Testing

Proyek ini tidak menyertakan test otomatis. Disarankan menambahkan unit/integration tests (Jest + React Testing Library) untuk:

- Komponen daftar catatan
- Form tambah catatan
- Logika autentikasi (AuthContext)

## Troubleshooting singkat

- Jika dev server tidak jalan setelah `npm run dev`:
  - Periksa versi Node
  - Hapus `node_modules` dan `package-lock.json` lalu `npm install`
  - Pastikan port Vite tidak bentrok

- Jika halaman kosong setelah build:
  - Periksa console browser untuk error React
  - Pastikan base path bila deploy ke subpath







