import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: theme.defaultFont,
    color: theme.fontColorBlack,
  },
  titleBold: {
    fontSize: 25,
    fontFamily: theme.defaultFontBold,
    color: theme.fontColorBlack,
  },
  separator: {
    width: 28,
    height: 3,
    marginTop: 10,
  },
  imageContainer: {
    width: '50%',
    alignItems: 'center',
  },
  image: {
    width: '60%',
  },
});

export default Styles;
