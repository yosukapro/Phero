import React from 'react';
import renderer from 'react-test-renderer';

import AddButton from '../src/components/AddButton';

test('renders correctly', () => {
  const tree = renderer.create(<AddButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
