// styles.js or theme.js

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    paddingBottom: 30,
  },
  lable: {
    color: '#344054',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    paddingBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 5,
    padding: 10,
    borderRadius: 8,
    background: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  textHeading: {
    color: '#101828',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  textDesc: {
    color: '#475467',
    fontSize: 16,
    fontWeight: '400',
  },
  navigateText: {
    color: '#0E81B9',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  primaryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0E81B9',
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#0E81B9',
  },
  buttonText: {
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  errorText: {color: 'red', fontSize: 14},
});
