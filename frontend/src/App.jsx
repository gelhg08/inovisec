import { useState } from 'react';
import Login from './components/Login';
import MapView from './components/MapView';
import './App.css';

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function handleLogin(accessToken, loggedUser) {
    setToken(accessToken);
    setUser(loggedUser);
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
  }

  if (!token) return <Login onLogin={handleLogin} />;
  return <MapView token={token} user={user} onLogout={handleLogout} />;
}