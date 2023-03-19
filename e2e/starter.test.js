describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('App')))
      .toBeVisible()
      .withTimeout(1000);
  });

  it('should have login screen', async () => {
    await expect(element(by.id('LoginView'))).toBeVisible();
  });
});
