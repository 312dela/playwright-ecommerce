import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  page: Page;
  emailField: Locator;
  passwordField: Locator;
  loginToast: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('email@example.com');
    this.passwordField = page.getByPlaceholder('enter your passsword');
    this.loginToast = page.locator('#toast-container');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
  async inputEmail(email: string) {
    await this.emailField.fill(email);
  }
  async inputPassword(password: string) {
    await this.passwordField.fill(password);
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async verifySuccessfulLogin() {
    await expect(this.loginToast).toHaveText('Login Successfully');
  }
}
