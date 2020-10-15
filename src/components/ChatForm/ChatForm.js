/* eslint no-underscore-dangle: 'off' */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './ChatForm.module.css';
import { addComment } from '../../slides/comment';
import idGenerator from '../../utils/idGenerator';
import api, { ENDPOINT_ORIGIN } from '../../api';

const ChatForm = () => {
  const [nameValue, setNameValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const dispatch = useDispatch();

  const memoizedCallback = useCallback((action, payload) => {
    dispatch(action(payload));
  }, [dispatch]);

  useEffect(() => {
    const socket = io(ENDPOINT_ORIGIN);
    socket.on('comment', (name, message) => memoizedCallback(addComment, {
      _id: idGenerator(),
      name,
      message,
    }));
  }, [memoizedCallback]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nameValue || !messageValue) {
      return;
    }
    axios
      .post(api.addComment, {
        name: nameValue,
        message: messageValue,
        createdAt: Date.now(),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (name === 'name') {
      setNameValue(value);
    } else {
      setMessageValue(value);
    }
  };

  return (
    <form className={styles['chat-form']} onSubmit={handleSubmit}>
      <div className={styles['chat-form__field']}>
        <input
          name="name"
          type="text"
          value={nameValue}
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles['chat-form__field']}>
        <textarea
          name="message"
          value={messageValue}
          placeholder="Your message here"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles['chat-form__submit']}>
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
