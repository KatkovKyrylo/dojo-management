import React from 'react';

import styles from './styles.module.css';

const Avatar = ({ src, width }) => {
  return (
    <div
      className={styles.avatar}
      style={width ? { width, height: width } : undefined}
    >
      <img src={src} alt="user avatar" />
    </div>
  );
};

export { Avatar };
