import React from 'react';
import styles from './App.module.css';
import ChatForm from '../ChatForm';
import Comments from '../Comments';

const App = () => (
  <div className={styles.app}>
    <ChatForm />
    <Comments />
  </div>
);

export default App;
