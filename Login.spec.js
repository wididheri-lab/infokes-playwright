import { test, expect } from '@playwright/test';

test('Login and stay on homepage', async ({ page }) => {
  await page.goto('https://o2.openmrs.org/openmrs/login.htm');

  await page.getByRole('textbox', { name: 'Username:' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password:' }).fill('Admin123');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('You must choose a location!')).toBeVisible();
  await page.getByText('Inpatient Ward').click();
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('Logged in as Super User')).toBeVisible();
  await page.waitForTimeout(60000); // tunggu 60 detik

});