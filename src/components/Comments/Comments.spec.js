/* eslint no-underscore-dangle: 'off' */
import React from 'react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import axios from 'axios';
import store from '../../store';
import api from '../../api';
import { PAGE_LIMIT } from '../../constants/Comments';
import { getCommentsResponse } from '../../__mocks__/apiResponses';
import Comments from './Comments';
import Loader from '../Loader';

jest.mock('axios');

afterEach(() => {
  axios.get.mockReset();
});

const config = {
  params: {
    page: 1,
    limit: PAGE_LIMIT,
  },
};

describe('<Comments />', () => {
  it('should render correctly when getting api error', async () => {
    axios.get.mockRejectedValue(new Error('Api Error!'));

    const wrapper = mount(
      <Provider store={store}>
        <Comments />
      </Provider>,
    );

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(api.getComments, config);
    expect(wrapper.find(Loader).exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('should render correctly if there is not any comment', async () => {
    axios.get.mockResolvedValue({
      ...getCommentsResponse,
      data: {
        ...getCommentsResponse.data,
        docs: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <Comments />
      </Provider>,
    );

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(api.getComments, config);
    expect(wrapper.find('#comments-wrapper').exists()).toBeFalsy();
    expect(wrapper.find(Loader).exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('should render correctly with at least 1 comment', async () => {
    axios.get.mockResolvedValue(getCommentsResponse);

    const wrapper = mount(
      <Provider store={store}>
        <Comments />
      </Provider>,
    );

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(api.getComments, config);
    expect(wrapper.find('#comments-wrapper').exists()).toBeTruthy();
    expect(wrapper.find(Loader).exists()).toBeFalsy();
    expect(wrapper.find('h3')).toHaveLength(2);
    expect(wrapper.find('p')).toHaveLength(2);
    expect(wrapper.find('h3').at(0).parent().key()).toBe(getCommentsResponse.data.docs[0]._id.toString());
    expect(wrapper.find('h3').at(1).parent().key()).toBe(getCommentsResponse.data.docs[1]._id.toString());
    expect(wrapper.find('h3').at(0).text()).toBe(getCommentsResponse.data.docs[0].name);
    expect(wrapper.find('h3').at(1).text()).toBe(getCommentsResponse.data.docs[1].name);
    expect(wrapper.find('p').at(0).text()).toBe(getCommentsResponse.data.docs[0].message);
    expect(wrapper.find('p').at(1).text()).toBe(getCommentsResponse.data.docs[1].message);

    wrapper.unmount();
  });
});
