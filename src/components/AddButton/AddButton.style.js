import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  image: {
    width: '30%',
    marginTop: 18,
    marginLeft: 28,
  },
  text: {
    fontFamily: theme.defaultFont,
    fontSize: 14,
    paddingTop: 15,
  },
});

export default Styles;
