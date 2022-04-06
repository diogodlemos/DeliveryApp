import axios from 'axios';
import { BASE_URL } from '../constants/api';

const CONTENT_TYPE = 'application/json';

export async function createSale(sale, products, token) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    Authorization: token,
  };

  return axios
    .post(`${BASE_URL}/sale`, { sale, products }, { headers })
    .then((response) => response.data.sale)
    .catch((error) => ({ message: error.response.data.message }));
}

export function getSaleById(token, id) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    Authorization: token,
  };
  const data = axios
    .get(`${BASE_URL}/sale/${id}`, { headers })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export function getSalesByUserId(token, id) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    Authorization: token,
  };
  const data = axios
    .get(`${BASE_URL}/sale/user/${id}`, { headers })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return data;
}

export default {};
