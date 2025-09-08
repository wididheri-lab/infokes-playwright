import { test, expect } from '@playwright/test';

test('Login and search patients in OpenMRS', async ({ page }) => {
  // 🔐 Login ke aplikasi
  await page.goto('https://o2.openmrs.org/openmrs/login.htm');
  await page.getByLabel('Username:').fill('admin');
  await page.getByLabel('Password:').fill('Admin123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // 🚨 Handle location prompt
  await expect(page.getByText('You must choose a location!')).toBeVisible();
  await page.getByText('Inpatient Ward').click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Logged in as Super User')).toBeVisible();

  // 🔍 Navigasi ke halaman Capture Vitals (search pasien)
  await page.getByRole('link', { name: ' Capture Vitals' }).click();

  // Dapatkan elemen search box berdasarkan placeholder
  const searchBox = page.getByPlaceholder('Search by ID or Name');

  // 🔄 1. Clear search dengan nama yang salah (typo)
  await searchBox.fill('Wiliam');
  await page.locator('#patient-search-clear-button').click();

  // ✅ 2. Search dengan nama valid 'Williams'
  await searchBox.fill('Williams');
  await searchBox.press('Enter');

  // Pastikan hasil 'David Williams' muncul dan klik
  await expect(page.getByRole('cell', { name: 'David Williams' })).toBeVisible();
  await page.getByRole('cell', { name: 'David Williams' }).click({ timeout: 5000 });

  // 🔙 Kembali ke halaman pencarian pasien
  await page.goto('https://o2.openmrs.org/openmrs/coreapps/findpatient/findPatient.page?app=coreapps.findPatient');
  await page.waitForLoadState('networkidle');

  // ❌ 3. Search dengan input invalid (birthdate salah format)
  await searchBox.fill('20.jan');
  await searchBox.press('Enter');

  // Pastikan pesan 'No matching records found' muncul
  await expect(page.getByText('No matching records found', { exact: false })).toBeVisible();

  // ✅ 4. Search dengan identifier valid '10085a'
  await page.getByRole('textbox', { name: 'Search by ID or Name' }).fill('10085A');
  await searchBox.press('Enter');
  await page.getByText('10085A').click();
  
});