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
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: theme.defaultFont,
    color: '#757575',
    fontSize: 14,
    marginTop: 10,
  },
  image: {
    alignSelf: 'center',
    width: 160,
    height: 190,
  },
  button: {
    alignSelf: 'center',
    width: 200,
    marginTop: -22,
  },
  test: {
    alignSelf: 'center',
    backgroundColor: theme.primaryColor,
    padding: 14,
    borderRadius: 50,
  },
});

export default Styles;
