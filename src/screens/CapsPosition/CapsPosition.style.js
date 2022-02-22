import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  background: {
    backgroundColor: theme.backgroundLightGrey,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
  },
  text: {
    fontSize: 14,
    color: theme.fontColorGrey,
    fontFamily: theme.defaultFontBold,
    paddingLeft: 30,
    paddingTop: 25,
    paddingBottom: 30,
  },
});

export default Styles;
