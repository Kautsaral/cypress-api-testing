# 🚀 Cypress API Automation - Panduan Cepat & Cheatsheet

Dokumen ini berisi panduan instalasi dari nol hingga proses push ke GitHub. Sangat cocok dibuka di VS Code atau editor Markdown lainnya sebagai referensi cepat saat Live Test.

## 📋 Prasyarat
Pastikan perangkat sudah terinstal:
- Node.js (Cek dengan `node -v`)
- Git (Cek dengan `git --version`)

---

## 🛠️ 1. Instalasi & Inisialisasi Proyek

Buka terminal dan jalankan perintah berikut secara berurutan:

```bash
# 1. Buat folder proyek baru
mkdir live-test-api
cd live-test-api

# 2. Inisialisasi Node.js (otomatis membuat package.json)
npm init -y

# 3. Install Cypress sebagai development dependency
npm install cypress --save-dev
```

> *Catatan: Proses instalasi Cypress akan mengunduh binary file. Tunggu hingga terminal kembali menampilkan prompt kursor (misal: `nama-user@MacBook-Air %`).*

---

## 🏗️ 2. Konfigurasi Awal Cypress

Setelah instalasi selesai, inisialisasi struktur folder Cypress:

```bash
npx cypress open
```
1. Pilih **E2E Testing**.
2. Klik **Continue**.
3. Pilih browser (misal: Chrome) lalu klik **Start E2E Testing**.
4. Setelah UI terbuka, langsung tutup browser dan terminal Cypress. Lanjut bekerja di IDE (VS Code).

---

## 💻 3. Menjalankan Test

Untuk API Testing, sangat disarankan menjalankan test secara *headless* (via terminal) agar eksekusi lebih cepat:

```bash
# Menjalankan spesifik file test (tanpa membuka UI browser)
npx cypress run --spec "cypress/e2e/api-test.cy.js"
```

---

## 🐙 4. Alur Git & Push ke GitHub

Sangat penting untuk **tidak** mem-push folder `node_modules` ke GitHub karena ukurannya sangat besar. Kita harus membuat file `.gitignore` terlebih dahulu.

### A. Persiapan File Ignore
Jalankan perintah ini di terminal untuk otomatis membuat file `.gitignore`:
```bash
echo "node_modules/" >> .gitignore
echo "cypress/videos/" >> .gitignore
echo "cypress/screenshots/" >> .gitignore
```

### B. Inisialisasi dan Push ke Repository Baru
Setelah membuat repository kosong di GitHub, ikuti langkah ini:

```bash
# 1. Inisialisasi Git di folder proyekmu
git init

# 2. Cek status file (memastikan node_modules tidak ikut masuk)
git status

# 3. Tambahkan semua file ke staging area
git add .

# 4. Buat commit pertama
git commit -m "chore: initial commit setup Cypress API testing"

# 5. Ubah nama branch utama menjadi 'main' (standar GitHub saat ini)
git branch -M main

# 6. Hubungkan lokal dengan repository GitHub
# (GANTI URL DI BAWAH DENGAN URL REPOSITORY MILIKMU)
git remote add origin https://github.com/username/live-test-api.git

# 7. Push kode ke GitHub
git push -u origin main
```

### C. Alur Kerja Lanjutan (Referensi)
Jika ke depannya kamu perlu update kode, tarik data, atau membuat branch baru:

- **Mengecek update dari repository (jika kerja tim):** 
  `git pull origin main`
- **Membuat dan pindah ke branch baru:** 
  `git checkout -b feature/skenario-post`
- **Menyimpan perubahan (setelah mengedit code):**
  `git add .`
  `git commit -m "test: add negative scenario for API"`
  `git push origin feature/skenario-post`
  
---
*Catatan Tambahan: Jika terjadi error conflict saat push dan kamu yakin kodemu yang paling benar, kamu bisa menggunakan `git push --force-with-lease` (opsi yang lebih aman dibanding `--force`).*