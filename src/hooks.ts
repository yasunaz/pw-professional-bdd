import { Before, After } from './fixtures';

Before(async () => {
   console.log('Before Hook: Starting test...');
});

After(async () => {
   console.log('After Hook: Test completed.');
});
