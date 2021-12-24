/// <reference types="cypress" />

describe('wishlist test', () => {

  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('is auth', () => {
    cy.isAuth()
  })

  it('Go to Random product', () => {
    let randomNumber = Math.floor(Math.random() * 10)
    cy.get('.a-product').eq(randomNumber).click()
    cy.get('.detail-shoe__wishlist').click()
    cy.get('.nav-home li').first().click()
  })

  it('Go to Random product', () => {
    let randomNumber = Math.floor(Math.random() * 10)
    cy.get('.a-product').eq(randomNumber).click()
    cy.get('.detail-shoe__wishlist').click()
    cy.get('.nav-home li').first().click()
  })

  it('Go to Random product', () => {
    let randomNumber = Math.floor(Math.random() * 10)
    cy.get('.a-product').eq(randomNumber).click()
    cy.get('.detail-shoe__wishlist').click()
    cy.get('.nav-home li').first().click()
  })

  it('Go to Random product', () => {
    let randomNumber = Math.floor(Math.random() * 10)
    cy.get('.a-product').eq(randomNumber).click()
    cy.get('.detail-shoe__wishlist').click()
    cy.get('.nav-home li').first().click()
  })

  it("wishlist", () => {  
    cy.contains('Wishlist').click()
    cy.url().should("include", "/wishlist");
    cy.get('.wishlist-item__remove').first().click()
    cy.wait(2000)
    cy.get('.wishlist-item button').first().click()
    cy.wait(2000)
  })

  it('go cart', () => {
    cy.contains('Cart').click()
    cy.url().should("include", "/cart");
    cy.wait(2000)
  })

})
