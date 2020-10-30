import axios from 'axios';

// const baseUrl='https://xeniaweb.online/api';
// export const baseStorageUrl = 'https://xeniaweb.online/storage';

const baseUrl='https://apiphotos.xeniaweb.site/api';
export const baseStorageUrl = 'https://apiphotos.xeniaweb.site/storage';


const token = localStorage.getItem('token') || '';
const userId = localStorage.getItem('userId') || '';

const requests = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});  

export default requests;