import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import testData from '../fixtures/test-data.json';
import { generateEmail } from '../utils/auth/emailGenerator';

const { firstName, lastName, phone, password } = testData.user;

test.describe.serial('Registration Flow Validation', () => {
  let emailLower: string;
  let emailUpper: string;
  let registrationPage: RegistrationPage;

  test.beforeAll(() => {
    const generated = generateEmail();
    emailLower = generated.lowercase;
    emailUpper = generated.uppercase;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByRole('link', { name: 'Register' }).click();
    registrationPage = new RegistrationPage(page);
  });

  test('Create account using lowercase - unregistered email', async () => {
    await registrationPage.fillRegisterForm(
      firstName,
      lastName,
      emailLower,
      phone,
      password,
    );
    await registrationPage.clickRegister();
    await registrationPage.verifySuccessfulRegistered();
  });

  test('Create account using lowercase - registered email', async () => {
    await registrationPage.fillRegisterForm(
      firstName,
      lastName,
      emailLower,
      phone,
      password,
    );
    await registrationPage.clickRegister();
    await registrationPage.verifyAlreadyRegistered();
  });

  test('Create account using uppercase - registered email', async () => {
    await registrationPage.fillRegisterForm(
      firstName,
      lastName,
      emailUpper,
      phone,
      password,
    );
    await registrationPage.clickRegister();
    await registrationPage.verifyAlreadyRegistered();
  });
});
