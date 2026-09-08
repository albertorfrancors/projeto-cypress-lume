import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
describe('template spec', () => {

  const selectorsList = {
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]',
    genericField: ".oxd-input--active",
    dateField:'[placeholder="yyyy-dd-mm"]',
    dateCloseButton: ".--close",
    submitButton: '[type="submit"]',
  }

  it.only("User Info Update - Success", () => {
    loginPage.acessLoginPage()
    loginPage.loginWithUser(userData.userSuccess.username, userData.userSuccess.password)

    dashboardPage.checkDashboardPage()

    menuPage.acessMyInfo()
   
    cy.get(selectorsList.firstNameField).clear().type("FirstNameTest")
    cy.get(selectorsList.lastNameField).clear().type("LastNameTest")
    cy.get(selectorsList.genericField).eq(3).clear().type("Employee")
    cy.get(selectorsList.genericField).eq(4).clear().type("OtherIdTest")
    cy.get(selectorsList.genericField).eq(5).clear().type("DriverLicense")
    cy.get(selectorsList.genericField).eq(6).clear().type("2025-03-10")
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
  
  })
  it("Login - Fail", () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
   
  })
})