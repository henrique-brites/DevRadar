import axios from "axios";

const api = axios.create({
  baseURL: 'https://apibuscadevs.herokuapp.com',
});

export default api;
