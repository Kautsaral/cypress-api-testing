# 🚀 Cypress API Testing Automation

Repositori ini berisi proyek otomatisasi pengujian API (API Testing) menggunakan **Cypress**. Proyek ini dibangun sebagai portofolio QA Engineering untuk mendemonstrasikan pengujian endpoint API yang terstruktur, validasi respons (status code, body, schema), serta integrasi CI/CD.

## 🛠️ Tech Stack
*   **Framework:** [Cypress](https://www.cypress.io/)
*   **Language:** JavaScript (Node.js)
*   **CI/CD:** GitHub Actions

## 📂 Struktur Direktori

Proyek ini menggunakan struktur standar Cypress yang telah dioptimalkan:

```text
cypress-api-testing/
├── .github/workflows/
│   └── cypress.yml         # Konfigurasi CI/CD GitHub Actions
├── cypress/
│   ├── e2e/
│   │   └── api-test.cy.js  # File utama skenario pengujian API
│   ├── fixtures/
│   │   └── example.json    # Data test statis (payload/response mock)
│   └── support/
│       ├── commands.js     # Custom commands Cypress (misal: login API)
│       └── e2e.js          # File konfigurasi global sebelum test berjalan
├── cypress.config.js       # Konfigurasi utama Cypress
├── package.json            # Daftar dependensi dan script eksekusi
└── README.md               # Dokumentasi proyek
```

## 🎯 Skenario Pengujian (Test Coverage)
Pada proyek ini, endpoint yang diuji adalah `https://restful-booker.herokuapp.com/apidoc/index.html`. Skenario yang dicakup antara lain:

*   **GET:** Memvalidasi status code `200 OK`, response time, dan kebenaran skema data yang dikembalikan.
*   **POST:** Mengirimkan *payload* dari `fixtures`, memvalidasi proses pembuatan data berhasil (status `201 Created`).
*   **PUT:** Memastikan pembaruan data berhasil dan tervalidasi.
*   **DELETE:** Memastikan data terhapus (status `201`).

## ⚙️ Prasyarat
Sebelum menjalankan proyek ini di mesin lokal, pastikan kamu sudah menginstal:
*   [Node.js](https://nodejs.org/) (Versi 14 ke atas)
*   Git

## 🚀 Cara Instalasi dan Penggunaan

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/Kautsaral/cypress-api-testing.git
   cd cypress-api-testing
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Pengujian (Headless Mode):**
   Direkomendasikan untuk melihat hasil secara cepat di terminal.
   ```bash
   npx cypress run
   ```

4. **Jalankan Pengujian (Interactive UI Mode):**
   Jika ingin melihat proses eksekusi dan melakukan *debugging*.
   ```bash
   npx cypress open
   ```

## 🔄 Continuous Integration (CI/CD)
Proyek ini sudah terintegrasi dengan **GitHub Actions**. Setiap kali ada *push* atau *pull request* ke *branch* `main`, *workflow* yang ada di `.github/workflows/cypress.yml` akan secara otomatis menjalankan seluruh skrip pengujian Cypress di *environment* Ubuntu. 

Kamu bisa melihat riwayat eksekusi pengujian pada tab **Actions** di repositori ini.

---
**Author:** @Kautsral  
*Quality Assurance Engineer*