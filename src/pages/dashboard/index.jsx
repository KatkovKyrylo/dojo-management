import React from 'react';
import { useCollection } from 'hooks/useCollection';
import { ProjectFilter, ProjectList } from 'components';
import { useAuthContext } from 'hooks/useAuthContext';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();
  const [currFilter, setCurrFilter] = React.useState('all');

  const handleFilter = (filter) => {
    setCurrFilter(filter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter currentFilter={currFilter} handleFilter={handleFilter} />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
};

export { Dashboard };
