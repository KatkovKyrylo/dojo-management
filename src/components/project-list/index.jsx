import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'components';

import styles from './styles.module.css';

const ProjectList = ({ projects }) => {
  return (
    <div className={styles.projectList}>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <span>Due by {project.dueDate.toDate().toDateString()}</span>
            <div className={styles.assignedTo}>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} width="30px" />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export { ProjectList };
