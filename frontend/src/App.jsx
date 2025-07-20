import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './components/firebase';

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
import useUserStore from './store/userStore';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [loading, setLoading] = useState(true); // optional loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, setEntries } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const docSnap = await getDoc(doc(db, "users", authUser.uid));
        if (docSnap.exists()) {
          setUser({ uid: authUser.uid, ...docSnap.data() });
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      // ✅ Mark auth check as complete
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


// Fetch entries for the authenticated user

  useEffect(() => {
    if (user?.uid) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/entries/${user.uid}`)
        .then((res) => res.json())
        .then(setEntries);
    }
  }, [user?.uid]);

  if (loading) return <Loader />;


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
