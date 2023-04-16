import {by, device, element, expect, waitFor} from 'detox';

// Time to wait for the initial view to be visible
const WAIT_TIME = 5000;

const HOST =
  device.getPlatform() === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000';

describe('Authentication', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should not be able to log in with incorrect credentials', async () => {
    await waitFor(element(by.id('ViewLogin')))
      .toBeVisible()
      .withTimeout(WAIT_TIME);

    await element(by.id('InputHost')).typeText(HOST);
    await element(by.id('InputEmail')).typeText('invalid@example.com');
    await element(by.id('InputPassword')).typeText('invalid\n');

    await element(by.id('ButtonLogin')).tap();

    await expect(element(by.id('TextLoginFailed'))).toBeVisible();
  });

  it('should be able to log in with correct credentials', async () => {
    await waitFor(element(by.id('ViewLogin')))
      .toBeVisible()
      .withTimeout(WAIT_TIME);

    await element(by.id('InputHost')).typeText(HOST);
    await element(by.id('InputEmail')).typeText('user@example.com');
    await element(by.id('InputPassword')).typeText('password\n');

    await element(by.id('ButtonLogin')).tap();

    await expect(element(by.id('ViewSites'))).toBeVisible();
  });

  it('should be able to log out', async () => {
    await waitFor(element(by.id('ViewSites')))
      .toBeVisible()
      .withTimeout(WAIT_TIME);

    await element(by.id('ButtonSettings')).tap();
    await expect(element(by.id('ViewSettings'))).toBeVisible();

    await element(by.id('ButtonLogout')).tap();
    await expect(element(by.id('ViewLogin'))).toBeVisible();
  });
});
