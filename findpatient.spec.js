import { test, expect } from '@playwright/test';

test('Login and search patients in OpenMRS', async ({ page }) => {
  // 🔐 Login
  await page.goto('https://o2.openmrs.org/openmrs/login.htm');
  await page.getByLabel('Username:').fill('admin');
  await page.getByLabel('Password:').fill('Admin123');
  await page.getByRole('button', { name: 'Log In' }).click();

  // 🚨 Location alert and fix
  await expect(page.getByText('You must choose a location!')).toBeVisible();
  await page.getByText('Inpatient Ward').click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Logged in as Super User')).toBeVisible();

  // 🔍 Go to patient search
  await page.getByRole('link', { name: /Find Patient Record/i }).click();
  const searchBox = page.getByPlaceholder('Search by ID or Name');

  // 🔄 1. Clear search with wrong name
  await searchBox.fill('Wiliam');
  await page.locator('#patient-search-clear-button').click();

  // ✅ 2. Search valid patient by name
  await searchBox.fill('Williams');
  await searchBox.press('Enter');  
  await page.getByRole('cell', { name: 'David Williams' }).click({ timeout: 5000 });

  // 🔙 Back to search page
  await page.goto('https://o2.openmrs.org/openmrs/coreapps/findpatient/findPatient.page?app=coreapps.findPatient');
  await page.waitForLoadState('networkidle');

  // ❌ 3. Invalid search by birthdate
  await searchBox.fill('20.jan');
  await searchBox.press('Enter');  
  await expect(page.getByText('No matching records found', { exact: false })).toBeVisible();

  // ✅ 4. Search dengan identifier valid '10085a'
  await page.getByRole('textbox', { name: 'Search by ID or Name' }).fill('10085A');
  await searchBox.press('Enter');
  await page.getByText('10085A').click();
  
});