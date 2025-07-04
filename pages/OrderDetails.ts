import {Page, Locator, expect} from '@playwright/test'

export class OrderDetails {
    page: Page
    emailBillingAddress: Locator

    constructor(page: Page){
        this.page = page
        this.emailBillingAddress = page.locator('.address:has(.content-title:text("Billing Address")) p.text')

    }

    async verifyEmailBillingAddress(email: string){
        const emailBillingAddressRaw = await this.emailBillingAddress.first().textContent()
        const emailBillingAddressText = emailBillingAddressRaw!.trim()
        expect(emailBillingAddressText).toBe(email)
    }
}