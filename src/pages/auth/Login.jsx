import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { styles } from '../../../style';
import { loginStyles } from './Login.js';
import { Formik } from 'formik';
import { LoginSchema } from '../../utils/validationSchema.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../redux/slices/auth/authSlice.js';
import Toast from 'react-native-toast-message';
import authApi from '../../redux/slices/auth/authApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector(state => state.auth);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleLogin = async values => {
    try {
      dispatch(loginStart());
      const res = await authApi.Login(values);

      if (res.status === 200) {
        await AsyncStorage.setItem('token', res.data.token);
        dispatch(loginSuccess(res.data));
        navigation.navigate("Base");
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Login successfully',
          text2: 'congratulation! you are logged in successfully',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
      return res;
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid Credential',
        text2: 'Please check your email and password.',
        visibilityTime: 4000,
        autoHide: true,
      });
      dispatch(loginFailure());
    }
  };

  return (
    <>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => handleLogin(values)}>
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={loginStyles.logincontainer}>
                  <View style={loginStyles.loginHeader}>
                    <Text style={styles.textHeading}>Login</Text>
                    <Text style={styles.textDesc}>
                      Welcome back ! Please enter your details.
                    </Text>
                  </View>
                  <View style={loginStyles.loginBody}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.lable}>Email</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="example@gmail.com"
                      />
                      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.lable}>Password</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="••••••••"
                        secureTextEntry={isPasswordHidden}
                      />
                      <TouchableOpacity
                        style={{ position: 'absolute', top: 40, right: 8 }}
                        onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                        <Text>{isPasswordHidden ? 'Show' : 'Hide'}</Text>
                      </TouchableOpacity>
                      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text
                        style={styles.navigateText}
                        onPress={() =>
                          navigation.navigate('Forgot Password')
                        }>
                        Forgot Password
                      </Text>
                    </View>
                  </View>
                  <View style={loginStyles.loginFooter}>
                    {isLoading ? (
                      <ActivityIndicator size={'large'} />
                    ) : (
                      <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>

     <Toast />
    </>
  );
};

export default Login;
