import { NavLink } from 'react-router-dom';
import { getValidClasses } from 'helpers/getValidClasses';
import { Avatar } from 'components';
import { useAuthContext } from 'hooks/useAuthContext';

import DashboardIcon from 'assets/dashboard_icon.svg';
import AddIcon from 'assets/add_icon.svg';

import styles from './styles.module.css';

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.user}>
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </div>

        <nav className={styles.links}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? getValidClasses(styles.navlink, styles.active)
                    : styles.navlink
                }
              >
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? getValidClasses(styles.navlink, styles.active)
                    : styles.navlink
                }
              >
                <img src={AddIcon} alt="add icon" />
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { Sidebar };
