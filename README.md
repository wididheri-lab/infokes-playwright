# Automation dengan Playwright

Repositori ini berisi kumpulan skrip pengujian *end-to-end* (E2E) otomatis yang dibangun menggunakan **Playwright** 🎭. Tujuan dari pengujian ini adalah untuk memvalidasi fungsionalitas utama aplikasi secara otomatis dari perspektif pengguna, memastikan alur kerja kritis berjalan sesuai harapan.

---

## 🚀 Cakupan Fitur yang Diuji (Test Scope)

Pengujian otomatis ini mencakup beberapa alur kerja utama aplikasi, yaitu:
* **Login**
* **Pencarian Pasien (Find Patient)**
* **Kunjungan Aktif (Active Visits)**
* **Pengambilan Tanda Vital (Capture Vitals)**

## 🛠️ Persiapan & Instalasi

Sebelum menjalankan tes, pastikan lingkungan Anda sudah siap.

### Prasyarat
* [Node.js](https://nodejs.org/) (direkomendasikan versi `18.x` atau yang lebih baru)
* `npm` atau `yarn`

### Langkah-langkah Instalasi
1.  **Clone repositori ini:**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd [NAMA_DIREKTORI_PROYEK]
    ```

2.  **Install semua dependensi yang dibutuhkan:**
    ```bash
    npm install
    ```

3.  **Install browser yang dibutuhkan oleh Playwright (Chromium, Firefox, WebKit):**
    ```bash
    npx playwright install
    ```

4.  **Konfigurasi Environment Variables:**
    Salin file `.env.example` menjadi file baru bernama `.env`.
    ```bash
    cp .env.example .env
    ```
    Kemudian, sesuaikan isinya dengan konfigurasi lokal Anda (URL aplikasi, kredensial pengguna uji, dll).
    ```ini
    # .env
    BASE_URL=http://localhost:3000
    TEST_USER_USERNAME=admin_test
    TEST_USER_PASSWORD=password_test
    ```

---

## ▶️ Menjalankan Tes

Anda dapat menjalankan tes dengan beberapa cara berbeda sesuai kebutuhan.

* **Menjalankan semua tes (mode *headless*):**
    Perintah ini akan menjalankan semua file tes di latar belakang tanpa membuka jendela browser.
    ```bash
    npx playwright test
    ```

* **Menjalankan semua tes (mode *headed*):**
    Gunakan perintah ini untuk melihat eksekusi tes secara langsung di jendela browser. Sangat berguna untuk *debugging*.
    ```bash
    npx playwright test --headed
    ```

* **Menjalankan satu file tes spesifik:**
    Jika Anda hanya ingin menjalankan tes untuk fitur tertentu.
    ```bash
    # Contoh untuk tes pendaftaran pasien
    npx playwright test tests/register-a-patient.spec.js
    ```

* **Menjalankan tes pada browser tertentu:**
    ```bash
    # Hanya berjalan di Chromium
    npx playwright test --project=chromium
    ```

---
