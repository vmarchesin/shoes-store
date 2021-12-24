/// <reference types="cypress" />

describe('login and product to cart', () => {

  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('is auth', () => {
    cy.isAuth()
  })

  it('Go to GREEN PEACE Product', () => {
    cy.contains('GREEN PEACE').click()
    cy.url().should("include", "/shoes/green-peace");
  })

  it('add ti whislist', () => {
    cy.get('.detail-shoe__wishlist').click()
  })

  it("Add to cart", () => {  
    cy.get('.detail-shoe__quantity-button').first().click()
    cy.get('.detail-shoe__quantity-button').last().click()
    cy.contains('ADD TO CART').click()
    cy.wait(2000)
  })

  it('go cart', () => {
    cy.contains('Cart').click()
    cy.url().should("include", "/cart");
    cy.wait(2000)
  })

})
