import { useState } from 'react';
import Login from './components/Login';
import './App.css';

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function handleLogin(accessToken, loggedUser) {
    setToken(accessToken);
    setUser(loggedUser);
  }
  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <p>Sesión iniciada como <strong>{user?.username}</strong>. (Aquí irá el mapa + panel.)</p>
      <button onClick={() => { setToken(null); setUser(null); }}>Salir</button>
    </div>
  );
}