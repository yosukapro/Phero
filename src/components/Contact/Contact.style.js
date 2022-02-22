import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    width: '70%',
    alignSelf: 'center',
  },
  edit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    opacity: 0.5,
    fontFamily: theme.defaultFont,
    color: theme.fontColorDarkGrey,
  },
  info: {
    paddingTop: 3,
    opacity: 0.5,
    fontFamily: theme.defaultFont,
    color: theme.fontColorBlackLight,
  },
});

export default Styles;
