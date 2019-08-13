import axios from 'axios';

// const BASE_URL = 'https://boiling-castle-93133.herokuapp.com/';
const BASE_URL = 'http://localhost:3000'
const api = axios.create({
  baseURL: BASE_URL,
});

// AUTH CALLS

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const res = await api.get('/users/verify');
    return res.data
  }
  return false;
}

// USER CALLS
export const fetchUser = async () => {
  const res = await api.get(`/user`);
  console.log(res.data)
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post('/users', data);
  // storeToken(res.data.token);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.get(`/users/${id}`, data);
  return res.data
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
};

// POLL CALLS
export const fetchPolls = async () => {
  const res = await api.get(`/polls`);
  return res.data;
};

export const fetchPoll = async (user_id, id) => {
  const res = await api.get(`/users/${user_id}/polls/${id}`);
  return res.data;
};

export const createPoll = async (user_id, data) => {
  const res = await api.post(`/users/${user_id}/polls`, data);
  return res.data;
};

export const deletePoll = async (user_id, id) => {
  const res = await api.delete(`/users/${user_id}/polls/${id}`);
  return res.data;
};

// CHOICE CALLS
export const fetchChoices = async (user_id, poll_id, id) => {
  const res = await api.get(`/users/${user_id}/polls/${poll_id}/choices/${id}`);
  return res.data;
};

export const fetchChoice = async (user_id, poll_id) => {
  const res = await api.get(`/users/${user_id}/polls/${poll_id}/choices/`);
  return res.data;
};

export const createChoice = async (user_id, poll_id, data) => {
  const res = await api.post(`/users/${user_id}/polls${poll_id}/choices`, data);
  return res.data;
};

export const updateChoice = async (user_id, poll_id, id, data) => {
  const res = await api.put(`/users/${user_id}/polls/${poll_id}/choices/${id}`, data);
  return res.data;
};

export const deleteChoice = async (user_id, poll_id, id) => {
  const res = await api.delete(`/users/${user_id}/polls/${poll_id}/choices/${id}`);
  return res.data;
};