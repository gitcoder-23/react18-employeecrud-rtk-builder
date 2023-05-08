import axios from 'axios';
import { baseUrl } from './constants/index';
export const RootApi = axios.create({
  baseURL: baseUrl,
});
