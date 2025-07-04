import { Page, Locator, expect } from '@playwright/test'

export class RegistrationPage {
    page: Page
    registerButton: Locator
    firstNameField: Locator
    lastNameField: Locator
    emailField: Locator
    phoneField: Locator
    occupationField: Locator
    genderField: Locator
    passwordField: Locator
    confirmPasswordField: Locator
    ageCheckbox: Locator
    registrationToast: Locator

    constructor(page: Page) {
        this.page = page
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' })
        this.emailField = page.getByPlaceholder('email@example.com')
        this.phoneField = page.getByPlaceholder('enter your number')
        this.occupationField = page.locator('select[formcontrolname="occupation"]')
        this.genderField = page.getByLabel('Female')
        this.passwordField = page.locator('#userPassword')
        this.confirmPasswordField = page.locator('#confirmPassword')
        this.ageCheckbox = page.locator('input[type="checkbox"]')
        this.registrationToast = page.locator('#toast-container')
    }
    async clickRegister() {
        await this.registerButton.click()
    }

    async fillRegisterForm(firstName: string, lastName: string, email: string, phone: string, password: string){
        await this.firstNameField.fill(firstName)
        await this.lastNameField.fill(lastName)
        await this.emailField.fill(email)
        await this.phoneField.fill(phone)
        await this.occupationField.selectOption('Engineer')
        await this.genderField.check()
        await this.passwordField.fill(password)
        await this.confirmPasswordField.fill(password)
        await this.ageCheckbox.check()
    }

    async verifyAlreadyRegistered(){
        await expect(this.registrationToast).toContainText('already')
    }

    async verifySuccessfulRegistered(){
        await expect(this.registrationToast).toContainText('Successfully')
    }
}