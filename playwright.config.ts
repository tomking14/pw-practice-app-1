import { defineConfig, devices } from '@playwright/test';
import type { testOptions } from './testOptions';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<testOptions>({
  testDir: './tests',
  // timeout: 10000,
  // globalTimeout: 60000,

  // set a global timeout for the assertions
  // expect:{
  //   timeout:2000
  // },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // change the undefined to 1 will make it so only one worker is assigned and run fully sequencially. currently when in CI, only uses 1
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // create a JSON for downstream file, an array of reporters, doesn't need just one
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
        token: "argos_4o252841fzrdaq57m3ttgfl5ybp7ymerg6",
      },
    ],
    ['json',{outputFile: 'test-results/jsonReport.json'}],
    ['junit',{outputFile: 'test-results/junitReport.xml'}],
    ['html']
    // ['allure-playwright']
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 15000,
    screenshot: "only-on-failure"
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4201/',
       },
    },
     {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4202/',
       },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      // individually assign video to be on just on firefox testing
      video: {
        mode: 'off',
        size: {width:1920, height: 1080}
        }
      },

    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: 'mobile.spec.ts',
      use:{
        ...devices['iPhone 15 Pro Max']
      }
    }

  ],
/* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    reuseExistingServer: true
  }

});
