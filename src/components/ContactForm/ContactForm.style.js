import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  close: {
    margin: 10,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    width: '60%',
    paddingVertical: 20,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
  },
  required: {
    width: '70%',
    alignSelf: 'center',
    fontFamily: theme.defaultFont,
    color: theme.fontColorDarkGrey,
    paddingTop: 20,
  },
});

export default Styles;
