import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { OrderPage } from '../pages/OrderPage';
import { ThanksPage } from '../pages/ThanksPage';
import { MyOrdersPage } from '../pages/MyOrdersPage';
import { OrderDetails } from '../pages/OrderDetails';
import { loginUser } from '../utils/auth/loginUser';
import { createOrder, getOrderDetails } from '../utils/order/order';
import testData from '../fixtures/test-data.json';

const {userEmail, otherUserEmail, password} = testData.user
const {product1, product2} = testData.product
const {insertLocation, selectLocation} = testData.location

test.describe('Order Flow Validation', () => {

    let token: string;

    test.beforeAll(async () => {
        const res = await loginUser(
            userEmail,
            password
        );
        token = res.token;
    });

    test.beforeEach(async ({ page }) => {
        await page.addInitScript(token => {
            window.localStorage.setItem('token', token);
        }, token);
        await page.goto('https://rahulshettyacademy.com/client');
    });

    test('Count the total price of added products in cart', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);

        await dashboardPage.addProductToCart(product1);
        await dashboardPage.addProductToCart(product2);
        await dashboardPage.verifyProductAddedToCart()
        await dashboardPage.goToCart();

        await cartPage.verifyTotalPrice()
    });

    test('Create order with same email as the respective account', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const orderPage = new OrderPage(page);
        const thanksPage = new ThanksPage(page);
        const myOrdersPage = new MyOrdersPage(page);
        const orderDetails = new OrderDetails(page)

        await dashboardPage.addProductToCart(product1);
        await dashboardPage.addProductToCart(product2);
        await dashboardPage.verifyProductAddedToCart()
        await dashboardPage.goToCart();

        await cartPage.clickCheckout();

        await orderPage.verifyShippingEmailLabel()

        await orderPage.inputCountryShippingInfo(insertLocation, selectLocation);
        await orderPage.clickOrder();

        const orderId = await thanksPage.getOrderId();
        await thanksPage.goToMyOrders();
        await myOrdersPage.clickViewOrder(orderId);

        await orderDetails.verifyEmailBillingAddress(userEmail)
    });

    test('Create order with different email from the respective account', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const orderPage = new OrderPage(page);
        const thanksPage = new ThanksPage(page);
        const myOrdersPage = new MyOrdersPage(page);
        const orderDetails = new OrderDetails(page)

        await dashboardPage.addProductToCart(product1);
        await dashboardPage.addProductToCart(product2);
        await dashboardPage.verifyProductAddedToCart()
        await dashboardPage.goToCart();

        await cartPage.clickCheckout();
        
        await orderPage.changeEmailShippingInfo(otherUserEmail)
        await orderPage.verifyShippingEmailLabel()

        await orderPage.inputCountryShippingInfo(insertLocation, selectLocation);
        await orderPage.clickOrder();

        const orderId = await thanksPage.getOrderId();
        await thanksPage.goToMyOrders();
        await myOrdersPage.clickViewOrder(orderId);

        await orderDetails.verifyEmailBillingAddress(otherUserEmail)
    });

    test('Create order without shipping location provided', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const orderPage = new OrderPage(page);

        await dashboardPage.addProductToCart(product1);
        await dashboardPage.addProductToCart(product2);
        await dashboardPage.verifyProductAddedToCart()
        await dashboardPage.goToCart();

        await cartPage.clickCheckout()

        await orderPage.changeEmailShippingInfo(otherUserEmail)
        await orderPage.verifyShippingEmailLabel()

        await orderPage.clickOrder()

        await orderPage.verifyFullShippingInformation()
    })

    test('View order created by different account from the respective account should return 403', async () => {
        // Login as other user
        const otherUser = await loginUser(otherUserEmail, password)
        const otherUserToken = otherUser.token

        // Buat order pakai token user lain
        const orderResponse = await createOrder(otherUserToken)
        const orderId = orderResponse.orders[0]

        // Coba akses order pakai token saat ini (bukan milik si pembuat order)
        const response = await getOrderDetails(orderId, token, false)
        expect(response.status()).toBe(403)
    })
})
