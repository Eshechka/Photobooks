import axios from 'axios';
// import {store} from './store/index';

const baseUrl='https://apiphotos.xeniaweb.site/api';
export const baseStorageUrl = 'https://apiphotos.xeniaweb.site/storage';

// const token = store.getters['user/loggedUser'].token || '';
const token = localStorage.getItem('token') || '';


const requests = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});  

export default requests;