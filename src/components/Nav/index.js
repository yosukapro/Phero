import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';

import Welcome from 'components/Welcome';

const Nav = ({ navigation, onClose, show }) => (
  <Modal animationType='fade' onRequestClose={onClose} visible={show}>
    <Welcome navigation={navigation} canClose onClose={onClose} />
  </Modal>
);

Nav.protoType = {
  navigation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Nav;
