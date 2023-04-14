import { Link } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';
import { useAuthContext } from 'hooks/useAuthContext';
import TempleIcon from 'assets/temple.svg';

import styles from './styles.module.css';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.logo}>
          <img src={TempleIcon} alt="logo" />
          <span>The Dojo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {isPending ? (
              <button className="btn">Logging out...</button>
            ) : (
              <button className="btn" onClick={logout}>
                Log out
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export { Navbar };
