import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  checkoutButton: Locator;
  productPrice: Locator;
  actualTotalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.productPrice = page.locator('.prodTotal');
    this.actualTotalPrice = page.locator(
      '.totalRow:has(.label:text-is("Total") ) .value',
    );
  }

  async getTotalPrice() {
    let sum = 0;
    await this.productPrice.first().waitFor();
    const prices = await this.productPrice.allTextContents();
    for (const text of prices) {
      const price = Number(text.split(' ')[1].trim());
      sum += price;
    }
    return sum;
  }

  async verifyTotalPrice() {
    const expectedTotalPrice = await this.getTotalPrice();
    const actualTotalText = await this.actualTotalPrice.textContent();
    const actualTotalNumber = Number(actualTotalText?.replace('$', '').trim());
    expect(actualTotalNumber).toBe(expectedTotalPrice);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
