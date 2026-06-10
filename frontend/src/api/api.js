import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export async function login(username, password) {
  const { data } = await api.post('/auth/login', { username, password });
  return data; 
}

export default api;