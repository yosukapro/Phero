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
  descriptionText: {
    fontFamily: theme.defaultFont,
    color: '#757575',
    fontSize: 14,
    marginTop: 10,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 230,
  },
  button: {
    alignSelf: 'center',
    width: 200,
    marginTop: -22,
  },
});

export default Styles;
