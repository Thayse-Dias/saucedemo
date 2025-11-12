/// <reference types="cypress" />

describe('Testes de Login', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('selectors');
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve fazer login com usuário padrão', function() {
    const { standard } = this.selectors.users;
    
    cy.login(standard.username, standard.password);
    
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
    cy.takeScreenshot('login-sucesso');
  });

  it('Deve mostrar erro com credenciais inválidas', function() {
    cy.login('usuario_invalido', 'senha_errada');
    
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
    cy.takeScreenshot('login-erro');
  });
});