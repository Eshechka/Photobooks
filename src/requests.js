import axios from 'axios';

const baseUrl='https://webdev-api.loftschool.com';
const token = localStorage.getItem('token') || '';
// const userId = localStorage.getItem('userId');

const requests = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}`
    // 'Authorization': `Bearer hgjhgjhgjhgjhgjhgjhgjhghjgjhg`
  }
});  

export default requests;