import {execSync} from 'child_process';
import {by, device, element, expect, waitFor} from 'detox';

// Time to wait for the initial view to be visible
const WAIT_TIME = 10000;

const HOST =
  device.getPlatform() === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000';

function setDemoMode() {
  if (device.getPlatform() === 'ios') {
    execSync(
      'xcrun simctl status_bar "iPhone 11" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4',
    );
  } else {
    // enter demo mode
    execSync('adb shell settings put global sysui_demo_allowed 1');
    // display time 12:00
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200',
    );
    // Display full mobile data with 4g type and no wifi
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false',
    );
    // Hide notifications
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false',
    );
    // Show full battery but not in charging state
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100',
    );
  }
}
beforeAll(setDemoMode);

describe('Screenshots', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should walk through the app and take screenshots', async () => {
    await waitFor(element(by.id('ViewLogin')))
      .toBeVisible()
      .withTimeout(WAIT_TIME);

    await device.takeScreenshot('login');

    await element(by.id('InputHost')).typeText(HOST);
    await element(by.id('InputEmail')).typeText('user@example.com');
    await element(by.id('InputPassword')).typeText('password\n');

    await element(by.id('ButtonLogin')).tap();

    await expect(element(by.id('ViewSites'))).toBeVisible();
    await device.takeScreenshot('sites');
  });
});
