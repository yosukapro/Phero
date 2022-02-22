import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: theme.inputBackground,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: theme.primaryColor,
    width: '90%',
    height: 44,
    textAlignVertical: 'center'
  },
});

export default Styles;
