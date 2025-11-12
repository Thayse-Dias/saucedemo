const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    execTimeout: 60000,
    taskTimeout: 60000,
    screenshotOnRunFailure: true,
    video: false,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    chromeWebSecurity: false,
    
    // Configurações específicas para screenshots
    screenshotQuality: 70,
    truncateScreenShotFolder: true,
    
    retries: {
      runMode: 1,
      openMode: 0
    },

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
        
        if (browser.name === 'chrome' || browser.name === 'electron') {
          launchOptions.args.push(
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--ignore-certificate-errors',
            '--allow-running-insecure-content',
            '--disable-site-isolation-trials',
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows'
          );
          
          if (browser.isHeadless) {
            launchOptions.args.push(
              '--headless',
              '--disable-gpu',
              '--no-sandbox',
              '--disable-software-rasterizer',
              '--window-size=1280,720'
            );
          }
        }
        return launchOptions;
      });

      on('task', {
        lighthouse: lighthouse(),
      });

      return config;
    },
  },
  
  // Configuração do Mochawesome
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'SauceDemo - Relatório Completo de Testes',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
});