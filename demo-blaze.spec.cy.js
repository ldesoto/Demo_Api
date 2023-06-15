/// <reference types="cypress" />

/**
 * Store Cypress APIs Test Suite
 */
context('Store Cypress APIs', () => {
  /**
   * Cypress.Commands Test Suite
   */
  context('Cypress.Commands', () => {
    beforeEach(() => {
      // Visit the Demo Blaze website before each test
      cy.visit('https://www.demoblaze.com');
    });

    /**
     * Demo Blaze Tests
     */
    describe('Demo Blaze Tests', () => {
      /**
       * Test: Signup - Create a new user
       */
      it('Signup - Create a new user', () => {
        const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
        const randomPassword = `password${Math.floor(Math.random() * 10000)}`;

        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/signup',
          body: {
            username: randomUsername,
            password: randomPassword,
          },
        }).then((response) => {
          // Verify the response status code and body
          expect(response.status).to.equal(200);
          expect(response.body).to.equal('');
        });
      });

      /**
       * Test: Signup - Attempt to create an existing user
       */
      it('Signup - Attempt to create an existing user', () => {
        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/signup',
          body: {
            username: 'ldesoto',
            password: '123456789',
          },
          failOnStatusCode: false,
        }).then((response) => {
          // Verify the response status code and error message
          expect(response.status).to.equal(200);
          expect(response.body.errorMessage).to.equal('This user already exist.');
        });
      });

      /**
       * Test: Login - Correct username and password
       */
      it('Login - Correct username and password', () => {
        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/login',
          body: {
            username: 'ldesoto',
            password: '123456789',
          },
        }).then((response) => {
          // Verify the response status code and the presence of Auth_token
          expect(response.status).to.equal(200);
          expect(response.body.Auth_token);
        });
      });

      /**
       * Test: Login - Incorrect username and password
       */
      it('Login - Incorrect username and password', () => {
        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/login',
          body: {
            username: 'ldesoto',
            password: 'invalidpassword',
          },
          failOnStatusCode: false,
        }).then((response) => {
          // Verify the error message in the response body
          expect(response.body.errorMessage).to.equal('Wrong password.');
        });
      });
    });
  });
});
