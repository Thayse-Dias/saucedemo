/// <reference types="cypress" />

describe('Fluxo do Carrinho de Compras', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  context('Cenários Positivos', () => {
    it('Deve adicionar produto ao carrinho com sucesso', () => {
      cy.fixture('selectors').then((selectors) => {
        const standardUser = selectors.users.standard;
        const backpack = selectors.products.backpack;

        // Login e adicionar produto
        cy.login(standardUser.username, standardUser.password);
        cy.addProductToCart(backpack.selector);
        
        // Verificar badge
        cy.get('.shopping_cart_badge').should('be.visible').and('contain', '1');
        
        // Ir para carrinho e verificar produto
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', '/cart.html');
        cy.contains(backpack.name).should('be.visible');
        
        cy.takeScreenshot('produto-adicionado-ao-carrinho');
      });
    });

    it('Deve remover produto do carrinho com sucesso', () => {
      cy.fixture('selectors').then((selectors) => {
        const standardUser = selectors.users.standard;
        const backpack = selectors.products.backpack;

        // Login e adicionar produto
        cy.login(standardUser.username, standardUser.password);
        cy.addProductToCart(backpack.selector);
        
        // Remover produto da página de inventário
        cy.removeProductFromCart(backpack.removeSelector);
        
        // Verificar badge sumiu
        cy.get('.shopping_cart_badge').should('not.exist');
        
        cy.takeScreenshot('produto-removido-do-carrinho');
      });
    });

    it('Deve adicionar e remover produto diretamente no carrinho', () => {
      cy.fixture('selectors').then((selectors) => {
        const standardUser = selectors.users.standard;
        const backpack = selectors.products.backpack;

        // Login e adicionar produto
        cy.login(standardUser.username, standardUser.password);
        cy.addProductToCart(backpack.selector);
        
        // Ir para o carrinho
        cy.get('[data-test="shopping-cart-link"]').click();
        
        // Remover produto do carrinho
        cy.get(backpack.removeSelector).click();
        
        // Verificar carrinho vazio
        cy.get('.cart_item').should('not.exist');
        cy.get('.shopping_cart_badge').should('not.exist');
        
        cy.takeScreenshot('produto-removido-no-carrinho');
        
        // Voltar aos produtos
        cy.get('[data-test="continue-shopping"]').click();
      });
    });

    it('Deve adicionar múltiplos produtos ao carrinho', () => {
      cy.fixture('selectors').then((selectors) => {
        const standardUser = selectors.users.standard;
        const { backpack, bikeLight, boltTshirt } = selectors.products;

        // Login e adicionar produtos
        cy.login(standardUser.username, standardUser.password);
        cy.addProductToCart(backpack.selector);
        cy.addProductToCart(bikeLight.selector);
        cy.addProductToCart(boltTshirt.selector);

        // Verificar badge
        cy.get('.shopping_cart_badge').should('contain', '3');
        
        // Ir para carrinho e verificar produtos
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.contains(backpack.name).should('be.visible');
        cy.contains(bikeLight.name).should('be.visible');
        cy.contains(boltTshirt.name).should('be.visible');
        
        cy.takeScreenshot('tres-produtos-no-carrinho');
      });
    });
  });

  context('Cenários com Usuário Problemático', () => {
    it('Deve testar carrinho com problem_user', () => {
      cy.fixture('selectors').then((selectors) => {
        const problemUser = selectors.users.problem;
        const backpack = selectors.products.backpack;

        cy.login(problemUser.username, problemUser.password);
        cy.addProductToCart(backpack.selector);
        
        // Verificações básicas
        cy.get('.shopping_cart_badge').should('be.visible');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('.cart_item').should('exist');
        cy.takeScreenshot('carrinho-problem-user');
      });
    });
  });

  context('Fluxo Completo do Carrinho', () => {
    it('Deve completar fluxo completo: login → adicionar → verificar → remover', () => {
      cy.fixture('selectors').then((selectors) => {
        const standardUser = selectors.users.standard;
        const { backpack, bikeLight } = selectors.products;

        // Login
        cy.login(standardUser.username, standardUser.password);
        cy.url().should('include', '/inventory.html');

        // Adicionar produtos
        cy.addProductToCart(backpack.selector);
        cy.addProductToCart(bikeLight.selector);
        cy.get('.shopping_cart_badge').should('contain', '2');

        // Verificar no carrinho
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.contains(backpack.name).should('be.visible');
        cy.contains(bikeLight.name).should('be.visible');

        // Remover um produto
        cy.get(backpack.removeSelector).click();
        cy.get('.shopping_cart_badge').should('contain', '1');
        cy.contains(backpack.name).should('not.exist');

        // Voltar e remover o outro produto
        cy.get('[data-test="continue-shopping"]').click();
        cy.removeProductFromCart(bikeLight.removeSelector);
        
        // Verificação final
        cy.get('.shopping_cart_badge').should('not.exist');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('.cart_item').should('not.exist');
      });
    });
  });
});