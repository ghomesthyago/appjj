import axios from 'axios'

const api = axios.create({
  baseURL: 'http://189.69.243.188:3005',
  //baseURL: 'http://192.168.4.250:3005',
  timeout: 10000,
});

export default api