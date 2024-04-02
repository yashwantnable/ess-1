/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('message backgound mode========', remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
  console.log('message kill mode ========', remoteMessage);
});
messaging().onMessage(async remoteMessage => {
  console.log('message forground mode ========', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
