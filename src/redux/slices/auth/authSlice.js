import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
    isAuthenticated: false,
  },
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      setCurrentUserData(action.payload);
    },
    loginFailure: state => {
      state.isLoading = false;
      state.error = true;
      state.isAuthenticated = false;
    },
  },
});

// set current user data in asyncstorage
const setCurrentUserData = async userData => {
  try {
    const userDataString = JSON.stringify(userData);
    await AsyncStorage.setItem('currentUser', userDataString);
    console.log('Current User data set in AsyncStorage successfully');
  } catch (error) {
    console.log('Current User data is not set in AsyncStorage');
  }
};

export const {loginStart, loginSuccess, loginFailure} = authSlice.actions;
export default authSlice.reducer;