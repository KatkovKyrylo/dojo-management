import React from 'react';
import { useDocument } from 'hooks/useDocument';
import { useParams } from 'react-router-dom';
import { ProjectSummary, ProjectComments } from 'components';

import styles from './styles.module.css';

const Project = () => {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={styles.projectDetails}>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export { Project };
