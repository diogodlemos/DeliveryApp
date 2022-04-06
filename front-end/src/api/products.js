import axios from 'axios';
import { BASE_URL } from '../constants/api';

export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response;
};

export default { getAllProducts };
