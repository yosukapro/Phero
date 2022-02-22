import { StyleSheet } from 'react-native';
import theme from 'theme';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomLine: {
    height: 3,
    width: '100%',
    backgroundColor: theme.backgroundGrey,
  },
});

export default Styles;
