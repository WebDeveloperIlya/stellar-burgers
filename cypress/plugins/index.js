const path = require('path');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Пример использования мока для стилей
      on('file:preprocessor', (file) => {
        if (file.filePath.endsWith('.css') || file.filePath.endsWith('.scss') || file.filePath.endsWith('.less')) {
          return path.resolve(__dirname, '../support/mocks/styleMock.js');
        }
        return file;
      });
    },
    baseUrl: 'http://localhost:3000', // Замените на ваш URL
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: false,
  },
});
