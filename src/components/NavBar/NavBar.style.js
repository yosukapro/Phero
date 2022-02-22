import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    borderBottomColor: theme.backgroundLightGrey,
    borderBottomWidth: 7,
  },
});

export default Styles;
