import React from 'react';
import { useCollection } from 'hooks/useCollection';
import { Avatar } from 'components';

import styles from './styles.module.css';

const UsersSidebar = () => {
  const { documents, error } = useCollection('users');

  return (
    <div className={styles.userList}>
      <h2>All users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className={styles.userListItem}>
            {user.online && <span className={styles.online}></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export { UsersSidebar };
