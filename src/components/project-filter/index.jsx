import React from 'react';

import styles from './styles.module.css';

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
];

const ProjectFilter = ({ currentFilter, handleFilter }) => {
  return (
    <div className={styles.projectFilter}>
      <nav>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={currentFilter === filter ? styles.active : ''}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};

export { ProjectFilter };
