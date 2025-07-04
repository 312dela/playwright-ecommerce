import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  page: Page;
  allProductsCard: Locator;
  cartNavbar: Locator;
  dashboardToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsCard = page.locator('.card');
    this.cartNavbar = page.locator('button[routerlink="/dashboard/cart"]');
    this.dashboardToast = page.locator('.toast-message');
  }

  async addProductToCart(product: string) {
    const productName = this.allProductsCard.filter({ hasText: product });
    await productName.locator('button:has-text(" Add To Cart")').click();
  }

  async verifyProductAddedToCart() {
    await expect(this.dashboardToast).toContainText('Product Added To Cart');
  }

  async goToCart() {
    await this.cartNavbar.click();
  }
}
