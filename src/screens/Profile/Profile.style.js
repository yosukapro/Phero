import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  spacing: {
    paddingBottom: 40,
  },
  title: {
    fontFamily: theme.defaultFontBold,
    fontSize: 15,
    color: theme.primaryColor,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  separator: {
    height: 3,
    width: '75%',
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: theme.separatorColorFrom,
  },
});

export default Styles;
