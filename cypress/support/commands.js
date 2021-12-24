// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('isAuth', () => {
    cy.get("body").then(($body) => {
      if ($body.find(".nav-home li").length > 3) {
        cy.log("is auth")
      } else {
        cy.log("no auth")
        cy.get('.nav-home li').last().click()

        const  generateRandomString = (num) => {
          const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let res= Math.random().toString(36).substring(0,num);       
          return res;
        }
        cy.get('input').first().type(`${generateRandomString(3)}@${generateRandomString(3)}.com`)
        cy.get('input').last().type(`test`)
        cy.get('button').last().click()
      }
    });
})
