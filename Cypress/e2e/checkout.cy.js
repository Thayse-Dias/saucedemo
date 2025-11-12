/// <reference types="cypress" />

describe('Fluxo de Checkout', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve completar uma compra com sucesso', () => {
    cy.fixture('selectors').then((selectors) => {
      const standardUser = selectors.users.standard;
      const backpack = selectors.products.backpack;

      // Login e adicionar produto
      cy.login(standardUser.username, standardUser.password);
      cy.addProductToCart(backpack.selector);
      cy.goToCart();

      // Iniciar checkout
      cy.get('[data-test="checkout"]').click();
      
      // Preencher informações
      cy.get('[data-test="firstName"]').type('Thayse');
      cy.get('[data-test="lastName"]').type('Dias');
      cy.get('[data-test="postalCode"]').type('57000000');
      cy.get('[data-test="continue"]').click();

      // Finalizar compra
      cy.get('[data-test="finish"]').click();
      
      // Verificar sucesso
      cy.contains('Thank you for your order!').should('be.visible');
      cy.takeScreenshot('checkout-completo');
    });
  });
});