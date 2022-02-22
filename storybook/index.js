/* eslint-disable */
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  // onDeviceUI: false
});

AppRegistry.registerComponent('phero', () => StorybookUIRoot);

export default StorybookUIRoot;
