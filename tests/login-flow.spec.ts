import { test, expect } from '@playwright/test'
import testData from '../fixtures/test-data.json'
import { LoginPage } from '../pages/LoginPage'

const { password, caseVariants } = testData.user

test.describe('Login Flow Validation', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client')
    loginPage = new LoginPage(page)
  })
  for (const caseVariant of caseVariants) {
    test(`Login using registered email ${caseVariant.email}`, async () => {
      await loginPage.inputEmail(caseVariant.email)
      await loginPage.inputPassword(password)
      await loginPage.clickLogin()
      await loginPage.verifySuccessfulLogin()
    })
  }
})



