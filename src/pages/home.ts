import { Page, expect } from 'playwright/test';

// --- Element Locators --- //
export const HomeElems = {
   username: 'input#user-name',
   password: 'input#password',
   sigin_bttn: 'input#login-button',
   banner: '.product_label',
};

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
      const bannerText = await this.locator(HomeElems.banner).textContent();
      expect(bannerText).toEqual('Products');
   }
} //end::Login
