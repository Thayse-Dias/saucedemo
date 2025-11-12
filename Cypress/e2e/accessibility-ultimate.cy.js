/// <reference types="cypress" />

describe('Testes de Acessibilidade - Suite Final', () => {
  context('Auditorias Básicas', () => {
    it('Auditoria da página de login', () => {
      cy.visit('/');
      cy.injectAxe();
      cy.checkA11yAndReport();
    });

    it('Auditoria da página de produtos', () => {
      cy.visit('/');
      cy.fixture('selectors').then((selectors) => {
        const user = selectors.users.standard;
        cy.login(user.username, user.password);
        cy.injectAxe();
        cy.checkA11yAndReport();
      });
    });

    it('Auditoria da página do carrinho', () => {
      cy.visit('/');
      cy.fixture('selectors').then((selectors) => {
        const user = selectors.users.standard;
        cy.login(user.username, user.password);
        
        const backpack = selectors.products.backpack;
        cy.addProductToCart(backpack.selector);
        cy.goToCart();
        cy.injectAxe();
        cy.checkA11yAndReport();
      });
    });

    it('Auditoria após erro de login', () => {
      cy.visit('/');
      cy.injectAxe();
      
      cy.get('[data-test="username"]').type('usuario_invalido');
      cy.get('[data-test="password"]').type('senha_errada');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]').should('be.visible');
      cy.checkA11yAndReport();
    });
  });

  context('Testes de Navegação', () => {
    it('Navegação por foco', () => {
      cy.visit('/');
      cy.navigateWithKeyboard();
    });

    it('Foco visível', () => {
      cy.visit('/');
      
      cy.get('[data-test="username"]').focus();
      cy.focused().should('be.visible');
      
      cy.get('[data-test="password"]').focus();
      cy.focused().should('be.visible');
      
      cy.get('[data-test="login-button"]').focus();
      cy.focused().should('be.visible');
    });
  });

  context('Testes de Estrutura', () => {
    it('Estrutura de headings', () => {
      cy.visit('/');
      cy.get('h1, h2, h3, h4, h5, h6').should('have.length.at.least', 1);
    });

    it('Atributos de formulário', () => {
      cy.visit('/');
      
      cy.get('[data-test="username"]')
        .should('have.attr', 'placeholder')
        .and('not.be.empty');
        
      cy.get('[data-test="password"]')
        .should('have.attr', 'placeholder')
        .and('not.be.empty');
    });
  });

  context('Relatório Final Consolidado', () => {
    it('Relatório completo de acessibilidade', () => {
      cy.log('🚀 INICIANDO SUITE COMPLETA DE ACESSIBILIDADE');
      
      // 1. Página de Login
      cy.visit('/');
      cy.injectAxe();
      cy.checkA11yAndReport();
      cy.log('✅ Auditoria login concluída');
      
      // 2. Página de Produtos
      cy.fixture('selectors').then((selectors) => {
        const user = selectors.users.standard;
        cy.login(user.username, user.password);
        cy.injectAxe();
        cy.checkA11yAndReport();
        cy.log('✅ Auditoria produtos concluída');
        
        // 3. Página do Carrinho
        const backpack = selectors.products.backpack;
        cy.addProductToCart(backpack.selector);
        cy.goToCart();
        cy.injectAxe();
        cy.checkA11yAndReport();
        cy.log('✅ Auditoria carrinho concluída');
      });
      
      cy.log('🎉 SUITE DE ACESSIBILIDADE CONCLUÍDA COM SUCESSO!');
      cy.log('📊 Violações encontradas são oportunidades de melhoria, não falhas.');
    });
  });
});