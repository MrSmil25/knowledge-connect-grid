# Kampus Connect

Buatkan aplikasi web organisasi kampus bernama "OrgTool" dalam Bahasa Indonesia dengan Supabase sebagai backend. Aplikasi sudah terconnect ke Supabase.

## Database yang sudah ada di Supabase:

1. Tabel `divisions` (code text PK, name text, description text, color_hex text, created_at timestamptz)

   - Sudah terisi 10 divisi: KTU (Ketua), SEK (Sekretaris), CTR (Controller), FIN (Finance), MP (Media Partner), HMS (Humas), EVT (Event), OPS (Operation), HR (Human Resources), KRD (Kreatif & Digital)

2. Tabel `profiles` (id uuid PK references auth.users, full_name text, nickname text, email text, phone text, photo_url text, role user_role enum, division text references divisions, status member_status enum, joined_at date, created_at timestamptz, updated_at timestamptz)

   - Enum user_role: Anggota, Kadiv, Waketu, Ketua, Sekretaris, Controller

   - Enum member_status: Active, Alumni, Inactive

   - Auto-created via trigger saat user register

3. RLS sudah aktif. Semua user authenticated bisa baca semua profil dan divisi. User bisa edit profil sendiri. Ketua & Waketu bisa edit semua profil.

## Halaman yang dibutuhkan:

### 1. Halaman Login (`/login`)

- Form email + password

- Tombol "Masuk"

- Link "Belum punya akun? Daftar"

- Design clean, modern, ada logo/judul "OrgTool" di atas form

- Warna utama: biru navy (#1E3A8A) dan putih

### 2. Halaman Register (`/register`)

- Form: Nama Lengkap, Email, Password, Konfirmasi Password

- Tombol "Daftar"

- Link "Sudah punya akun? Masuk"

- Setelah register, user otomatis login dan redirect ke dashboard

- Catatan: field role default "Anggota" dan division kosong (diisi nanti oleh Ketua)

### 3. Dashboard (`/dashboard`)

- Sidebar navigasi di kiri dengan menu: Dashboard, Profil Saya, Anggota, Divisi

- Header atas dengan nama user yang login dan tombol Logout

- Konten utama: 

  - Kartu selamat datang "Halo, [nama user]!"

  - 4 kartu statistik: Total Anggota, Total Divisi, Anggota Aktif, Divisi Saya

  - Angka di kartu diambil dari database (query profiles dan divisions)

- Responsive (bisa dibuka di HP)

### 4. Halaman Profil Saya (`/profile`)

- Tampilkan data profil user yang login (dari tabel profiles)

- Bisa edit: Nama Lengkap, Nickname, Phone, foto (upload ke Supabase Storage bucket "avatars")

- Field Role dan Division tampilkan tapi TIDAK bisa diedit (read-only, abu-abu)

- Tombol "Simpan Perubahan"

### 5. Halaman Anggota (`/members`)

- Tabel semua anggota organisasi (dari profiles)

- Kolom: Foto, Nama, Divisi (badge warna sesuai color_hex), Role, Status

- Search bar untuk filter nama

- Kalau user role-nya Ketua atau Waketu, tampilkan tombol "Edit" di setiap baris untuk ubah role & divisi anggota tersebut (modal popup form)

### 6. Halaman Divisi (`/divisions`)

- Daftar semua divisi dalam bentuk kartu grid

- Setiap kartu: warna accent sesuai color_hex, nama divisi, jumlah anggota di divisi itu

- Klik kartu = lihat daftar anggota divisi tersebut

## Ketentuan teknis:

- Gunakan Supabase Auth untuk login/register (email + password)

- Gunakan Supabase client yang sudah tersetup di project ini

- Semua query pakai Supabase JS client (bukan REST langsung)

- Protect semua halaman kecuali /login dan /register — redirect ke /login kalau belum login

- Gunakan React Router untuk navigasi

- Design pakai Tailwind CSS, bersih dan profesional

- Semua teks dalam Bahasa Indonesia

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c58e3475-1722-44e1-a374-a7edf83b16a4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
