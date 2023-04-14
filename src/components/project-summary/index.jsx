import React from 'react';
import { Avatar } from 'components';
import { useFirestore } from 'hooks/useFirestore';
import { useAuthContext } from 'hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore('projects');
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    deleteDocument(project.id);
    navigate('/');
  };

  return (
    <div>
      <div className={styles.projectSummary}>
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.owner.displayName}</p>
        <p className={styles.dueDate}>
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className={styles.details}>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className={styles.assignedUsers}>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.owner.id && (
        <button className="btn" onClick={handleClick}>
          Mark as complete
        </button>
      )}
    </div>
  );
};

export { ProjectSummary };
