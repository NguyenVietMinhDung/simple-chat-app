import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import axios from 'axios';
import store from '../../store';
import api from '../../api';
import { addCommentResponse } from '../../__mocks__/apiResponses';
import ChatForm from './ChatForm';

jest.spyOn(axios, 'post').mockResolvedValueOnce(addCommentResponse);
jest.spyOn(global.Date, 'now').mockImplementation(() => 1602608400000);

let wrapper;

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <ChatForm />
    </Provider>,
  );
});

afterEach(() => {
  wrapper.unmount();
  axios.post.mockClear();
});

const newComment = {
  name: 'Dung',
  message: 'How are you?',
  createdAt: Date.now(),
};

describe('<ChatForm />', () => {
  it('should render correctly', () => {
    expect(wrapper.find('input').props().placeholder).toBe('Name');
    expect(wrapper.find('textarea').props().placeholder).toBe('Your message here');
    expect(wrapper.find('button').text()).toBe('Send');
  });

  it('should call addComment API when submitting valid form', () => {
    wrapper.find('input').first().simulate('change', { target: { name: 'name', value: newComment.name } });
    wrapper.find('textarea').first().simulate('change', { target: { name: 'message', value: newComment.message } });
    wrapper.simulate('submit');

    expect(wrapper.find('input').first().prop('value')).toBe(newComment.name);
    expect(wrapper.find('textarea').first().prop('value')).toBe(newComment.message);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(api.addComment, newComment);
  });

  it('should not call addComment API when submitting invalid form', () => {
    wrapper.find('input').first().simulate('change', { target: { name: 'name', value: '' } });
    wrapper.find('textarea').first().simulate('change', { target: { name: 'message', value: '' } });
    wrapper.simulate('submit');

    expect(wrapper.find('input').first().prop('value')).toBe('');
    expect(wrapper.find('textarea').first().prop('value')).toBe('');
    expect(axios.post).toHaveBeenCalledTimes(0);
  });
});
