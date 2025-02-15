import { APIResponse } from 'playwright/test';
import { Given, When, Then } from '../fixtures';
import { screenshot } from '../support/commands.ts';
import * as util from '../support/commands.ts';

let resData: APIResponse[] = [];

Given('I navigate to the login page', async ({ page, stepInfo, loginPage }) => {
   await loginPage.open();
   await screenshot(stepInfo);
   await util.interceptApiResponse(page, '**/users/list', resData);
});

When('I enter valid credentials', async ({ stepInfo, loginPage }) => {
   await loginPage.processLogin();
   await screenshot(stepInfo);
});

Then('I should see the dashboard', async ({ page, stepInfo, homePage }) => {
   await homePage.verifyDashboardVisible();
   // const res = await util.waitForAPIResponse(page, '**/users/list');
   await page.waitForResponse('**/users/list');
   console.log('RES', await resData[0].json());
   await screenshot(stepInfo);
});
