import React from 'react';
import { Image, View } from 'react-native';

import Styles from './ImageCapsPosition.style';

const ImageCapsPosition = () => (
  <View>
    <Image resizeMode='contain' source={require('assets/img/humansPattern.png')} style={Styles.image} />
  </View>
);

export default ImageCapsPosition;
