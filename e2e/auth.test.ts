import {by, device, element, expect, waitFor} from 'detox';

describe('Authentication', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('App')))
      .toBeVisible()
      .withTimeout(1000);
  });

  it('should not be able to log in with incorrect credentials', async () => {
    await expect(element(by.id('ViewLogin'))).toBeVisible();

    await element(by.id('InputHost')).typeText('http://localhost:3000');
    await element(by.id('InputEmail')).typeText('invalid@example.com');
    await element(by.id('InputPassword')).typeText('invalid');

    await element(by.id('ButtonLogin')).tap();

    await expect(element(by.id('TextLoginFailed'))).toBeVisible();
  });

  it('should be able to log in with correct credentials', async () => {
    await expect(element(by.id('ViewLogin'))).toBeVisible();

    await element(by.id('InputHost')).typeText('http://localhost:3000');
    await element(by.id('InputEmail')).typeText('user@example.com');
    await element(by.id('InputPassword')).typeText('password');

    await element(by.id('ButtonLogin')).tap();

    await expect(element(by.id('ViewSites'))).toBeVisible();
  });

  it('should be able to log out', async () => {
    await expect(element(by.id('ViewSites'))).toBeVisible();

    await element(by.id('ButtonSettings')).tap();
    await expect(element(by.id('ViewSettings'))).toBeVisible();

    await element(by.id('ButtonLogout')).tap();
    await expect(element(by.id('ViewLogin'))).toBeVisible();
  });
});
