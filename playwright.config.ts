import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
   features: 'features/', // Path to feature files
   steps: ['src/steps/', 'src/hooks.ts', 'src/fixtures.ts'], // Include fixtures file
});

export default defineConfig({
   testDir,
   timeout: 5000,
   use: {
      viewport: { width: 1920, height: 1080 },
      trace: 'on',
      screenshot: 'on',

   },
   reporter: [['line'], ['allure-playwright'], ['html']],
   outputDir: 'reports/artifacts',
});
