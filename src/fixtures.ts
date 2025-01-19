import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { Login } from './pages/login';
import { Home } from './pages/home';

export type pageObjFixtures = {
   loginPage: Login;
   homePage: Home;
};

export type testInfoFixtures = {
   stepInfo: {
      page: any;
      testInfo: any;
   };
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures & testInfoFixtures>({
   loginPage: async ({ page }, use) => {
      await use(new Login(page));
   },
   homePage: async ({ page }, use) => {
      await use(new Home(page));
   },
   stepInfo: async ({ page }, use, testInfo) => {
      const contexts = { page, testInfo };
      await use(contexts);
   },
});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then, After, Before } = createBdd(test);
