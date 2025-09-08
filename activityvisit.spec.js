import { test, expect } from '@playwright/test';

test('Login and search patients in OpenMRS', async ({ page }) => {
  // 🔐 Login
  await page.goto('https://o2.openmrs.org/openmrs/login.htm');
  await page.getByLabel('Username:').fill('admin');
  await page.getByLabel('Password:').fill('Admin123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // 🚨 Handle location prompt
  await expect(page.getByText('You must choose a location!')).toBeVisible();
  await page.getByText('Inpatient Ward').click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Logged in as Super User')).toBeVisible();

  // 📋 Navigate to Active Visits
  await page.getByRole('link', { name: /Active Visits/i }).click();
  const searchBox = page.getByRole('searchbox', { name: 'Search' });

  // 🔁 Toggle visit type filter (click twice)
  const visitTypeTag = page.locator('#visittype-tag-1');
  await visitTypeTag.click();
  await visitTypeTag.click();

  // 🔎 1. Search by ID
  await searchBox.fill('10009A');
  await searchBox.press('Enter');
  await page.getByRole('gridcell', { name: /10009A/i }).click();

  // ❌ 2. Search with typo (cek bahwa tidak ada hasil di tabel)
  await searchBox.fill('William haris');
  await searchBox.press('Enter');
  await page.waitForTimeout(1000); // optional wait
  const results = page.locator('table#patient-search-results tbody tr');
  await expect(results).toHaveCount(0);

  // ✅ 3. Search by valid name
  await searchBox.fill('William harris');
  await searchBox.press('Enter');
  await page.getByRole('link', { name: 'William Harris' }).click();
});