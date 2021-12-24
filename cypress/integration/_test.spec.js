/// <reference types="cypress" />

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

describe('Checkout test', () => {

  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('is auth', () => {
    cy.isAuth()
    cy.get('.header__container-logo').click()
    cy.wait(2000)
  })

})
