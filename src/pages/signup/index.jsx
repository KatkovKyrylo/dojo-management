import * as React from 'react';
import { useSignup } from 'hooks/useSignup';
import { useAuthContext } from 'hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

import styles from './styles.module.css';

const defaultValues = {
  email: '',
  password: '',
  displayName: '',
};

const Signup = () => {
  const [formData, setFormData] = React.useState(defaultValues);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [thumbnailError, setThumbnailError] = React.useState(null);
  const { signup, isPending, error } = useSignup();
  const { user } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setThumbnail(null);
    const selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('Invalid file type');
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError('Image size is too large');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, thumbnail);
  };

  if (user) return <Navigate to="/" />;

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <label>
        <span>display name: </span>
        <input
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={formData.displayName}
        />
      </label>
      <label>
        <span>profile thumbnail: </span>
        <input type="file" required onChange={handleImageChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {isPending ? (
        <button className="btn" disabled>
          loading...
        </button>
      ) : (
        <button className="btn">Sign up</button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export { Signup };
