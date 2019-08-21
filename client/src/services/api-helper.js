import axios from 'axios';

const BASE_URL = 'https://secret-hollows-37870.herokuapp.com/';
// const BASE_URL = 'http://localhost:3000'
const api = axios.create({
  baseURL: BASE_URL,
});

// AUTH CALLS

export const loginUser = async (loginData) => {
  const res = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user
}

export const registerUser = async (registerData) => {
  const res = await api.post('/users/', { user: registerData })
  return res.data
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
  const res = await api.put(`/users/${id}`, data);
  localStorage.setItem('authToken', res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// POLL CALLS
export const fetchPolls = async () => {
  const res = await api.get(`/polls`);
  return res.data;
};

export const fetchPoll = async (id) => {
  const res = await api.get(`/polls/${id}`);
  return res.data;
};

export const createPoll = async (data) => {
  const res = await api.post(`/polls`, data);
  return res.data;
};

export const deletePoll = async (id) => {
  const res = await api.delete(`/polls/${id}`);
  return res.data;
};

// CHOICE CALLS
export const addUserVote = async (poll_id, id) => {
  const res = await api.get(`/polls/${poll_id}/vote/${id}`);
  return res.data;
}

export const fetchChoices = async (poll_id, id) => {
  const res = await api.get(`/polls/${poll_id}/choices/${id}`);
  return res.data;
};

export const fetchChoice = async (poll_id) => {
  const res = await api.get(`/polls/${poll_id}/choices/`);
  return res.data;
};

export const createChoice = async (poll_id, data) => {
  const res = await api.post(`/polls/${poll_id}/choices`, { ...data, poll_id: poll_id });
  return res.data;
};