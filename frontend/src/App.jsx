import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './components/firebase';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Month from './pages/Month';
import NotFound from './pages/NotFound';
import History from './pages/History';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';

import './App.css';
import Loader from './components/Loader';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user); // true if user exists
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader/>;

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={user ? <Navigate to={routes.dashboard} /> : <Login />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Signup />} />
        <Route
          path={routes.dashboard}
          element={
            <PrivateRoute user={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.month}
          element={
            <PrivateRoute user={user}>
              <Month />
            </PrivateRoute>
          } />
        <Route
          path={routes.history}
          element={
            <PrivateRoute user={user}>
              <History />
            </PrivateRoute>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
