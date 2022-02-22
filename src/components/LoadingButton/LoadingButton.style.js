import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontFamily: theme.defaultFont,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Styles;
