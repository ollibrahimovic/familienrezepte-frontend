import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

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
