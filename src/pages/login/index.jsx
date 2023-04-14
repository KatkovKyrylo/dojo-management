import * as React from 'react';
import { useLogin } from 'hooks/useLogin';
import { useAuthContext } from 'hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

import styles from './styles.module.css';

const defaultValues = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = React.useState(defaultValues);
  const { login, isPending, error } = useLogin();
  const { user } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (user) return <Navigate to="/" />;

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label>
        <span>email: </span>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </label>
      <label>
        <span>password: </span>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
      </label>
      {isPending ? (
        <button className="btn" disabled>
          loading...
        </button>
      ) : (
        <button className="btn">Log in</button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export { Login };
