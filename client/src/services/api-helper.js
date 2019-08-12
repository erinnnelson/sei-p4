import axios from 'axios';

// const BASE_URL = 'https://boiling-castle-93133.herokuapp.com/';
const BASE_URL = 'http://localhost:3000'
const api = axios.create({
  baseURL: BASE_URL,
});

// export const getPing = async () => {
//   const res = await api.get('/ping');
//   return res;
// };

// const storeToken = (token) => {
//   localStorage.setItem('authToken', token);
//   api.defaults.headers.common.authorization = `Bearer ${token}`;
// };

// export const removeToken = () => {
//   localStorage.removeItem('authToken');
// }


// export const verifyToken = async () => {
//   const token = localStorage.getItem('authToken');
//   if (token !== null) {
//     try {
//       const resp = await api.get('/users/verify', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       storeToken(token);
//       return resp.data.user;
//     } catch (e) {
//       console.log(e.message);
//       console.log('invalid token');
//     }
//   }
//   else { console.log('user not logged in') };
// };

// export const loginUser = async (data) => {
//   const res = await api.post('/users/login', data);
//   const { user, token } = res.data;
//   storeToken(token);
//   return user;
// };

// USER CALLS
export const fetchUser = async (id) => {
  const res = await api.get(`/users/id/${id}`);
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
export const fetchPolls = async (user_id) => {
  const res = await api.get(`/users/${user_id}/polls`);
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