import { Page, Locator } from '@playwright/test'

export class MyOrdersPage {
    page: Page
    orderIdRow: Locator

    constructor(page: Page) {
        this.page = page
    }

    async clickViewOrder(orderId: string) {
        const row = this.page.locator('tr', { hasText: orderId })
        await row.locator('button.btn-primary', { hasText: 'View' }).click()
    }

}