import { test } from '@playwright/test';

test('register patient on OpenMRS', async ({ page }) => {
  await page.goto('https://o2.openmrs.org/openmrs/login.htm');

  // Login
  await page.getByRole('textbox', { name: 'Username:' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password:' }).fill('Admin123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Pilih lokasi 'Laboratory' dan klik login
  await page.getByText('Laboratory').click();
  await page.getByRole('button', { name: 'Log In' }).click();

  // Buka halaman register patient
  await page.getByRole('link', { name: ' Register a patient' }).click();

  // Isi form nama
  await page.getByRole('textbox', { name: 'Given (required)' }).fill('Gina');
  await page.getByRole('textbox', { name: 'Middle' }).fill('Lina');
  await page.getByRole('textbox', { name: 'Family Name (required)' }).fill('Lingga');
  await page.getByRole('button', { name: '' }).click();

  // Pilih gender
  await page.getByLabel("What's the patient's gender").selectOption('F');
  await page.getByRole('button', { name: '' }).click();

  // Isi tanggal lahir
  await page.getByRole('textbox', { name: 'Day (required)' }).fill('12');
  await page.getByLabel('Month (required)').selectOption('11');
  await page.getByRole('textbox', { name: 'Year (required)' }).fill('2015');
  await page.getByRole('button', { name: '' }).click();

  // Isi alamat
  await page.locator('#address1').fill('Jakarta');
  await page.locator('#address2').fill('Jakarta');
  await page.locator('#cityVillage').fill('Jakarta');
  await page.locator('#stateProvince').fill('Jawa Barat');
  await page.locator('#country').fill('Indonesia');
  await page.locator('#postalCode').fill('165432');
  await page.getByRole('button', { name: '' }).click();

  // Isi telepon dan klik next
  await page.getByRole('textbox', { name: "What's the patient phone" }).fill('08121212133');
  await page.getByRole('button', { name: '' }).click();

  // Pilih relationship dan isi nama orang terkait
  await page.locator('#relationship_type').selectOption('8d919b58-c2cc-11de-8d13-0010c6dffd0f-A');
  await page.getByRole('textbox', { name: 'Person Name' }).fill('sibli');
  await page.getByRole('button', { name: '' }).click();

  // Confirm
  await page.getByRole('button', { name: 'Confirm' }).click();
});