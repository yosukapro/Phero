import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  icon: {
    width: 50,
  },
  text: {
    fontFamily: theme.defaultFont,
  },
});

export default Styles;
