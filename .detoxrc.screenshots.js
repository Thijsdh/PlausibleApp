/** @type {Detox.DetoxConfig} */
module.exports = {
  artifacts: {
    rootDir: 'screenshots/artifacts/',
    pathBuilder: './screenshots/artifactPathBuilder.js',
  },
  behavior: {
    init: {
      exposeGlobals: false,
    },
  },
  testRunner: {
    args: {
      $0: 'jest',
      config: 'screenshots/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
      reportSpecs: true,
    },
  },
  apps: {
    ios: {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/PlausibleApp.app',
      build:
        'xcodebuild -workspace ios/PlausibleApp.xcworkspace -scheme PlausibleApp -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    android: {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/detoxRelease/app-detoxRelease.apk',
      build:
        'cd android ; ./gradlew assembleDetoxRelease assembleAndroidTest -DtestBuildType=detoxRelease ; cd ..',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'test',
      },
    },
  },
  configurations: {
    ios: {
      device: 'simulator',
      app: 'ios',
    },
    android: {
      device: 'emulator',
      app: 'android',
    },
  },
};
