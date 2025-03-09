import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hukedev.familyrecipes',
  appName: 'familienrezepte-frontend',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true
    }
  }
};
export default config;
