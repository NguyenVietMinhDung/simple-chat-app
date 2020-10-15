import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('<Loader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toHaveLength(1);
  });
});
