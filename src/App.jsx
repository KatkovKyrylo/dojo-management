import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import { Dashboard, Login, Project, Create, Signup } from 'pages';
import { Navbar, Sidebar, AuthorizedRoute, UsersSidebar } from 'components';

import styles from './App.module.css';

const App = () => {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className={styles.app}>
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className={styles.container}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <AuthorizedRoute user={user}>
                    <Dashboard />
                  </AuthorizedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/create"
                element={
                  <AuthorizedRoute user={user}>
                    <Create />
                  </AuthorizedRoute>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <AuthorizedRoute user={user}>
                    <Project />
                  </AuthorizedRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          {user && <UsersSidebar />}
        </Router>
      )}
    </div>
  );
};

export default App;
