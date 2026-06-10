import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export async function login(username, password) {
  const { data } = await api.post('/auth/login', { username, password });
  return data; 
}

export default api;

export async function getCases(token) {
  const { data } = await api.get('/cases', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function getCase(id, token) {
  const { data } = await api.get(`/cases/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}