import React from 'react';
import BookingDialog from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<BookingDialog showBookingForm={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
