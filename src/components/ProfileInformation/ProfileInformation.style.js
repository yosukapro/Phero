import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    width: '75%',
    alignSelf: 'center',
  },
  title: {
    color: theme.fontColorGrey,
    fontSize: 14,
  },
  value: {
    color: theme.fontColorBlackLight,
    fontSize: 14,
  },
});

export default Styles;
