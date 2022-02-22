import { StyleSheet } from 'react-native';

import theme from 'theme';

const Styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '70%',
    height: '70%',
  },
  heading: {
    height: 40,
  },
  close: {
    margin: 10,
    alignSelf: 'flex-end',
  },
  logoContainer: {
    justifyContent: 'center',
    marginTop: 10,
    height: 130,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  informations: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    fontFamily: theme.defaultFontBold,
    color: theme.fontColorBlack,
    fontSize: 20,
  },
  name: {
    fontFamily: theme.defaultFontLight,
    color: theme.primaryColor,
    paddingBottom: 10,
    fontSize: 20,
  },
  team: {
    fontFamily: theme.defaultFont,
    color: theme.fontColorDarkGrey,
    fontSize: 15,
  },
  disconnectContainer: {
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disconnectIcon: {
    width: 30,
  },
  disconnectText: {
    fontFamily: theme.defaultFont,
    color: theme.fontColorDarkGrey,
    fontSize: 18,
    paddingLeft: 10,
  },
  phero: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 150,
    height: 120,
  },
});

export default Styles;
