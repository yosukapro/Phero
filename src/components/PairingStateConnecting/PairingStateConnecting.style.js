import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundLightGrey,
    width: '85%',
    alignSelf: 'center',
    minHeight: 450,
    borderRadius: 25,
    padding: 40,
    marginTop: 20,
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 60,
  },
  waitingText: {
    alignSelf: 'center',
    fontFamily: theme.defaultFontBold,
    color: theme.primaryColor,
    marginVertical: 10,
  },
});

export default Styles;
