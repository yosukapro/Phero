import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    height: 190,
    flex: 1,
    padding: 5,
  },
  image: {
    marginTop: -20,
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    color: theme.fontColorDarkGrey,
    fontSize: 16,
    marginTop: -10,
    paddingBottom: 20,
    textAlign: 'center',
  },
});

export default Styles;
