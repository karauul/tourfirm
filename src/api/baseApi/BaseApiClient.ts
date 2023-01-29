import axios from 'axios';

const baseApiClient = axios.create({
  baseURL: 'http://localhost:5167',
});
export default baseApiClient;
