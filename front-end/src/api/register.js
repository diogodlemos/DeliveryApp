import axios from 'axios';
import { BASE_URL } from '../constants/api';

export function getAllUsers(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const data = axios
    .get(`${BASE_URL}/register`, { headers })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export default {};
