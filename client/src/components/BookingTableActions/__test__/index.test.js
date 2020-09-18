import React from 'react';
import BookingTableActions from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BookingTableActions />).toJSON();
  expect(tree).toMatchSnapshot();
});
