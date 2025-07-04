import {Page, Locator} from '@playwright/test'

export class ThanksPage {
    page: Page
    orderIdLabel: Locator
    ordersNavbar: Locator

    constructor(page: Page) {
        this.page = page
        this.orderIdLabel = page.locator('label.ng-star-inserted')
        this.ordersNavbar = page.locator('button[routerlink="/dashboard/myorders"]')
    }

    async getOrderId() {
        await this.orderIdLabel.first().waitFor()
        const allOrderId = await this.orderIdLabel.allTextContents()
        const orderIdRaw = allOrderId[0]
        const orderId = orderIdRaw.split('|')[1].trim()
        return orderId        
    }

    async goToMyOrders(){
        this.ordersNavbar.click()
    }
}