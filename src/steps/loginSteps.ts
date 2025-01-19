import { Given, When, Then } from '../fixtures';
import { screenshot } from '../support/commands.ts';

Given('I navigate to the login page', async ({ stepInfo, loginPage }) => {
   await loginPage.open();
   await screenshot(stepInfo);
});

When('I enter valid credentials', async ({ stepInfo, loginPage }) => {
   await loginPage.processLogin();
   await screenshot(stepInfo);
});

Then('I should see the dashboard', async ({ stepInfo, homePage }) => {
   await homePage.verifyDashboardVisible();
   await screenshot(stepInfo);
});
