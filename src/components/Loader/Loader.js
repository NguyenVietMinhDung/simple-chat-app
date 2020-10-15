import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <SyncLoader size={10} color="mediumseagreen" />
  </div>
);

export default Loader;
