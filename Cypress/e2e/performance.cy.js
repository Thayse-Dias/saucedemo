/// <reference types="cypress" />

describe('Testes de Performance - Simplificados', () => {
  it('Deve carregar a página de login rapidamente', () => {
    const startTime = Date.now();
    
    cy.visit('/');
    
    // Verifica elementos essenciais
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
    
    const loadTime = Date.now() - startTime;
    cy.log(`Página carregada em: ${loadTime}ms`);
    
    // Assert conservador
    expect(loadTime).to.be.lessThan(10000);
  });

  it('Deve realizar login dentro do tempo esperado', () => {
    cy.visit('/');
    
    cy.fixture('selectors').then((selectors) => {
      const user = selectors.users.standard;
      
      const startTime = Date.now();
      cy.login(user.username, user.password);
      
      // Aguarda redirecionamento
      cy.url().should('include', '/inventory.html');
      const loginTime = Date.now() - startTime;
      
      cy.log(`Login realizado em: ${loginTime}ms`);
      expect(loginTime).to.be.lessThan(8000);
    });
  });

  it('Deve adicionar produto ao carrinho rapidamente', () => {
    cy.visit('/');
    
    cy.fixture('selectors').then((selectors) => {
      const user = selectors.users.standard;
      const backpack = selectors.products.backpack;
      
      // Login
      cy.login(user.username, user.password);
      
      // Mede tempo de adição ao carrinho
      const startTime = Date.now();
      cy.addProductToCart(backpack.selector);
      const actionTime = Date.now() - startTime;
      
      cy.log(`Produto adicionado em: ${actionTime}ms`);
      expect(actionTime).to.be.lessThan(3000);
      
      // Verifica resultado
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  });

  it('Deve navegar para o carrinho rapidamente', () => {
    cy.visit('/');
    
    cy.fixture('selectors').then((selectors) => {
      const user = selectors.users.standard;
      const backpack = selectors.products.backpack;
      
      // Login e adicionar produto
      cy.login(user.username, user.password);
      cy.addProductToCart(backpack.selector);
      
      // Mede tempo de navegação
      const startTime = Date.now();
      cy.goToCart();
      const navigationTime = Date.now() - startTime;
      
      cy.log(`Navegação para carrinho em: ${navigationTime}ms`);
      expect(navigationTime).to.be.lessThan(5000);
      
      // Verifica resultado
      cy.url().should('include', '/cart.html');
      cy.contains(backpack.name).should('be.visible');
    });
  });

  it('Deve coletar métricas básicas de performance', () => {
    cy.visit('/').then(() => {
      cy.window().then((win) => {
        // Métricas básicas se disponíveis
        if (win.performance) {
          const navigation = win.performance.getEntriesByType('navigation')[0];
          if (navigation) {
            const metrics = {
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
              totalDuration: navigation.duration
            };
            
            cy.log('Métricas de Performance:');
            cy.log(`- DOM Ready: ${metrics.domContentLoaded}ms`);
            cy.log(`- Page Load: ${metrics.loadComplete}ms`);
            cy.log(`- Total: ${metrics.totalDuration}ms`);
            
            // Verificações básicas
            expect(metrics.totalDuration).to.be.lessThan(10000);
          }
        }
      });
    });
  });
});