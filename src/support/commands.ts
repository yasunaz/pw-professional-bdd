import { test, testInfoFixtures } from '../fixtures';
import { Page, Locator, Route, Response } from '@playwright/test';

export async function screenshot(context: testInfoFixtures['stepInfo'], message: string = 'screenshot') {
   const { page, testInfo } = context;
   const screenshot = await page.screenshot();
   await testInfo.attach(message, { body: screenshot, contentType: 'image/png' });
} //end::method

/**
 * Verify text match for a given element in Playwright.
 *
 * @param elementLocator - The Playwright locator for the element.
 * @param text - The expected text to match against the element's content.
 */
export async function verifyTextMatch(elementLocator: Locator, text: string | number | null | undefined): Promise<void> {
   // Convert text to a string and handle null or undefined values
   const expectedText = text === null || text === undefined ? '' : text.toString();

   // Scroll into view and extract text from the element
   const elementText = await elementLocator.evaluate((element) => {
      const rawText = element.textContent || '';
      // Replace new lines and multiple spaces with a single space and trim
      return rawText.replace(/\s+/g, ' ').trim();
   });

   // Format expected text if it's a number
   const formattedExpectedText = isNaN(Number(expectedText)) ? expectedText : expectedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   // Compare the cleaned-up text with the expected text
   if (elementText !== formattedExpectedText) {
      throw new Error(`Text mismatch: expected "${formattedExpectedText}", but got "${elementText}"`);
   }
} //end::method

export async function interceptWithMock(page: Page, type: string, url: string, status: number, payload: any, routeName?: string): Promise<void> {
   await page.route(url, async (route: Route) => {
      const request = route.request();
      const isMath = request.method().toLowerCase() === type.toLowerCase();
      if (isMath) {
         const logMsg = `[${routeName}] intercepted: ${request.method()} ${request.url}`;
         console.log(logMsg);
         await route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(payload),
         });
      } else {
         await route.continue();
      }
   });
   if (routeName) {
      console.log(`Route ${routeName} is set up for ${url}`);
   }
} //end::method

export async function waitAPI(page: Page, url: string): Promise<Response> {
   const res = page.waitForResponse(url);
   if (!res) {
      const errMsg = `No response was captured for URL: ${url}`;
      throw new Error(errMsg);
   }
   return res;
} //end::method
