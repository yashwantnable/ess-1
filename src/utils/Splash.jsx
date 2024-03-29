import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {primaryColor, secondaryColor} from '../../style';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import firebase from '@react-native-firebase/app';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fireInitialize = async () => {
      console.log('initializing firebaseInit---------------');

      if (Platform.OS === 'android') {
        // Code specific to Android platform
        console.log('Running on Android');
        try {
          const androidCredentials = {
            appId: '1:374720264061:android:3fdb536512755a75597e14',
            apiKey: 'AIzaSyBJYm6AbCdNj_vlUT-iTahUZbRZd0zBSEE',
            databaseURL: '',
            storageBucket: 'essnative-d9772.appspot.com',
            messagingSenderId: '374720264061',
            projectId: 'essnative-d9772',
          };

          const config = {
            name: 'ANDROID',
          };
          if (!firebase.apps.length) {
            await firebase.initializeApp(androidCredentials, config);
          }
        } catch (error) {
          console.log('error when regstering the app ====', error);
        }
      }
    };

    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          console.log('requesting for notification permissions');
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS?.POST_NOTIFICATIONS,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted', granted);
          } else {
            console.log('Notification permission denied ', granted);
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };
    const navigationAuth = async () => {
      try {
        setTimeout(async () => {
          const userDataString = await AsyncStorage.getItem('currentUser');
          const parsedUserData = JSON.parse(userDataString);

          const id =
            parsedUserData &&
            parsedUserData.data &&
            parsedUserData.data.branch &&
            parsedUserData.data.branch.id &&
            parsedUserData.data.branch.id;

          if (parsedUserData) {
            if (parsedUserData.user_type === 'Management') {
              navigation.navigate('Base');
            } else if (parsedUserData.user_type === 'Manager') {
              navigation.navigate('managerDashboard', {id: id});
            } else {
              navigation.navigate('StaffBase', {id: id});
            }
          } else {
            navigation.navigate('Login');
          }
        }, 3000);
      } catch (error) {
        console.log('error during auth navigation', error);
      }
    };

    const getFirebasePermissions = async () => {
      messaging()
        .requestPermission({
          carPlay: false,
          sound: true,
          announcement: true,
          provisional: false,
        })
        .then(async authStatus => {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            const registered = messaging().isDeviceRegisteredForRemoteMessages;
            console.log('registered  --=---------', registered);
            if (registered == true) {
              await messaging()
                .getAPNSToken()
                .then(async apnsToken => {
                  const token = await messaging().getToken();
                  // updating token to firestore or database
                  // setPushToken(token);
                  console.log('token -=-Registered-----------', {token});
                  let deviceToken = await AsyncStorage.getItem('deviceToken');
                  console.log('deviceToken-=-=-=---$', deviceToken);
                  if (deviceToken === null) {
                    await AsyncStorage.setItem('deviceToken', token);
                  }
                });
            } else {
              await messaging().registerDeviceForRemoteMessages();

              await messaging()
                .getAPNSToken()
                .then(async apnsToken => {
                  const token = await messaging().getToken();
                  // updating token to firestore or database    r
                  // setPushToken(token);
                  console.log('token -=------------', {token});
                  let deviceToken = await AsyncStorage.getItem('deviceToken');
                  console.log('deviceToken-=-=-=---$', deviceToken);
                  if (deviceToken === null) {
                    await AsyncStorage.setItem('deviceToken', token);
                  }
                });
            }
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    };
    fireInitialize();
    requestNotificationPermission();
    getFirebasePermissions();

    navigationAuth();
  });

  return (
    <View style={styles.container}>
      <BarIndicator color={primaryColor} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor,
  },
  textHeading: {
    color: primaryColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
