import { useState } from 'react';
import { login } from '../api/api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      onLogin(data.accessToken, data.user); 
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('No se pudo conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          autoComplete="username"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          autoComplete="current-password"
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}