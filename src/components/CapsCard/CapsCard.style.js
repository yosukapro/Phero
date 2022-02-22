import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.defaultFont,
    fontSize: 20,
    color: theme.fontColorBlackLight,
  },
  textBold: {
    fontFamily: theme.defaultFontBold,
    fontSize: 20,
    color: theme.fontColorBlackLight,
  },
});

export default Styles;
