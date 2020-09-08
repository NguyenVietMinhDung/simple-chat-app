/* eslint no-underscore-dangle: 'off' */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './Comments.module.css';
import { getComments, selectComments } from '../../slides/comment';
import api from '../../api';

const Comments = () => {
  const dispatch = useDispatch();

  const memoizedCallback = useCallback((action, payload) => {
    dispatch(action(payload));
  }, [dispatch]);

  const comments = useSelector(selectComments);

  useEffect(() => {
    axios
      .get(api.getComments)
      .then((res) => memoizedCallback(getComments, { comments: res.data }))
      .then((err) => console.log(err));
  }, [memoizedCallback]);

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment._id}>
          <h3>{comment.name}</h3>
          <p>{comment.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
