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

  it('Go to Cart', () => {
    cy.get('.nav-home li').eq(3).click()
    cy.url().should("include", "/cart");
    cy.contains('Tu carro esta vacio')
    cy.wait(2000)
  })

  it('Go to Whislist', () => {
    cy.get('.nav-home li').eq(2).click()
    cy.url().should("include", "/wishlist");
    cy.contains('Ninguna zapatilla está en tu lista de deseados')
    cy.wait(2000)
  })

  it('Go to Orders', () => {
    cy.get('.nav-home li').eq(1).click()
    cy.url().should("include", "/orders");
    cy.contains('Sin ningún pedido hasta la fecha')
    cy.wait(2000)
  })

  it('Go to Home', () => {
    cy.get('.header__container-logo').click()
    cy.wait(2000)
  })

  it('Go to Random product', () => {
    let randomNum = Math.floor(Math.random() * 10)
    cy.get('.a-product').eq(randomNum).click()
    cy.get('.detail-shoe__quantity-button').last().click()
    cy.get('.detail-shoe__wishlist').click()
    cy.get('button').click()
    cy.wait(3000)

    const number = randomNumber(0,3)
    cy.get('.best-sellers__item').eq(number).click()
  })

  it('Another product and go cart', () => {
    cy.get('button').click()
    cy.wait(3000)
    cy.contains('Cart').click()
    cy.get('button').click()
    cy.wait(3000)
  })

})
