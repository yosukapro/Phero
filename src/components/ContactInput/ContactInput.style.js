import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    width: '70%',
    alignSelf: 'center',
  },
  label: {
    opacity: 0.5,
    fontFamily: theme.defaultFont,
    color: theme.fontColorDarkGrey,
    paddingVertical: 5,
    textTransform: 'uppercase',

  },
  input: {
    backgroundColor: theme.backgroundLightGrey,
    borderRadius: 5,
    color: 'black',
    paddingLeft: 20,
    fontFamily: theme.defaultFontBold,
  },
});

export default Styles;
