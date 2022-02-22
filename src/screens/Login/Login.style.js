import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    margin: 50,
    width: '60%',
  },
  containerInputs: {
    alignSelf: 'center',
    width: '80%',
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    width: 200,
  },
  errorMessage: {
    color: theme.red,
    fontSize: 18,
    alignSelf: 'center',
    margin: 10,
  },
  containerRemember: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
  forgotPassword: {
    alignSelf: 'center',
    color: theme.fontColorDarkGrey,
  },
  version: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontFamily: theme.defaultFontBold,
    color: theme.fontColorGrey,
  },
});

export default Styles;
