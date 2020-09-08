/* eslint no-underscore-dangle: 'off' */
import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './ChatForm.module.css';
import { addComment } from '../../slides/comment';
import generateUniqueId from '../../utils/generateUniqueId';
import api, { ENDPOINT_ORIGIN } from '../../api';

const ChatForm = () => {
  const dispatch = useDispatch();

  const memoizedCallback = useCallback((action, payload) => {
    dispatch(action(payload));
  }, [dispatch]);

  useEffect(() => {
    const socket = io(ENDPOINT_ORIGIN);
    socket.on('comment', (name, message) => memoizedCallback(addComment, {
      _id: generateUniqueId(),
      name,
      message,
    }));
  }, [memoizedCallback]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const message = event.target.message.value;

    axios
      .post(api.addComment, { name, message })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles["chat-form"]} onSubmit={handleSubmit}>
      <div className={styles["chat-form__field"]}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
        />
      </div>
      <div className={styles["chat-form__field"]}>
        <textarea
          name="message"
          placeholder="Your message here"
          required
        />
      </div>
      <div className={styles["chat-form__submit"]}>
        <button type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
