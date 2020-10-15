import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ChatForm from '../ChatForm';
import Comments from '../Comments';

describe('<App />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.containsAllMatchingElements([<ChatForm />, <Comments />])).toBe(true);
  });
});
