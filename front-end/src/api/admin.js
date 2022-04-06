import axios from 'axios';
import { BASE_URL } from '../constants/api';

export async function createUser(token, user) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  return axios
    .post(`${BASE_URL}/admin`, user, { headers })
    .then((response) => response.data)
    .catch((error) => ({ message: error.response.data.message }));
}

export async function deleteUser(token, id) {
  console.log(token, id);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  return axios
    .delete(`${BASE_URL}/admin/${id}`, { headers })
    .then((response) => response.data)
    .catch((error) => ({ message: error.response.data.message }));
}

export default {};
