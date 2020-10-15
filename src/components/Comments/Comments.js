/* eslint no-underscore-dangle: 'off', react-hooks/exhaustive-deps: 'off' */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import styles from './Comments.module.css';
import { getComments, selectComments } from '../../slides/comment';
import { PAGE_LIMIT } from '../../constants/Comments';
import api from '../../api';
import Loader from '../Loader';

const Comments = () => {
  const [page, setPage] = React.useState(1);

  const [hasMore, setHasMore] = React.useState(true);

  const dispatch = useDispatch();

  const comments = useSelector(selectComments);

  const fetchMoreData = (pageNumber) => {
    axios
      .get(api.getComments, {
        params: {
          page: pageNumber,
          limit: PAGE_LIMIT,
        },
      })
      .then((res) => {
        dispatch(getComments({ comments: res.data.docs }));
        setHasMore(res.data.page < res.data.pages);
        setPage(page + 1);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  React.useEffect(() => {
    fetchMoreData(1);
  }, []);

  return (
    comments.length > 0 ? (
      <div id="comments-wrapper" className={styles.comments}>
        <InfiniteScroll
          dataLength={comments.length}
          next={() => fetchMoreData(page)}
          hasMore={hasMore}
          loader={<Loader />}
          scrollableTarget="comments-wrapper"
        >
          {comments.map((comment) => (
            <div className={styles.comment} key={comment._id}>
              <h3>{comment.name}</h3>
              <p>{comment.message}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    ) : <Loader />
  );
};

export default Comments;
