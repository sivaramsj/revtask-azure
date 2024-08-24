import axios from 'axios';

const api = axios.create({
  baseURL: 'https://revtask-hfenhja8emeyddbs.southindia-01.azurewebsites.net/api/',
});

export default api;
