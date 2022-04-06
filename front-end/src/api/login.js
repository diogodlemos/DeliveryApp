import axios from 'axios';
import { BASE_URL } from '../constants/api';

export async function login(user) {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then((response) => response.data)
    .catch((error) => ({ message: error.response.data.message }));
}

export const create = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
  return response;
};

export default {};
