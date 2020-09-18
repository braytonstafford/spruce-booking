import React from 'react';
import BookingTable from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BookingTable />).toJSON();
  expect(tree).toMatchSnapshot();
});
