import { expect, Locator, Page } from '@playwright/test';

export class OrderPage {
  page: Page;
  shippingEmailLabel: Locator;
  shippingEmailField: Locator;
  countryField: Locator;
  countryOption: Locator;
  orderButton: Locator;
  orderToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingEmailLabel = page.locator('.user__name label');
    this.shippingEmailField = page.locator('.user__name input[type="text"]');
    this.countryField = page.locator('input[placeholder="Select Country"]');
    this.countryOption = page.locator('.ta-results button span');
    this.orderButton = page.locator('.action__submit');
    this.orderToast = page.locator('#toast-container');
  }

  async changeEmailShippingInfo(email: string) {
    await this.shippingEmailField.fill('');
    await this.shippingEmailField.fill(email);
  }

  async verifyShippingEmailLabel() {
    const labelText = await this.shippingEmailLabel.textContent();
    const fieldText = await this.shippingEmailField.inputValue();
    await expect(fieldText).toContain(labelText);
  }

  async inputCountryShippingInfo(location: string, loc: string) {
    await this.countryField.pressSequentially(location);
    const option = this.countryOption.filter({ hasText: loc });
    await option.first().waitFor();
    await option.click();
  }

  async clickOrder() {
    await this.orderButton.click();
  }

  async verifyFullShippingInformation() {
    await expect(this.orderToast).toContainText(
      'Please Enter Full Shipping Information',
    );
  }
}
