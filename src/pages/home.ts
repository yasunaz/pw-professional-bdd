import { Page, expect } from 'playwright/test';

// --- User Actions --- //
export class Home {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   locator(elem: string) {
      return this.page.locator(elem);
   }

   async verifyDashboardVisible() {
      const bannerText = await this.locator('h4#students-title').textContent();
      expect(bannerText).toEqual('Existing Students');
   }
} //end::Login
