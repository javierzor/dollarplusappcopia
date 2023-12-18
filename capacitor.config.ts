import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dollarplus.app',
  appName: 'Dollar Plus',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
