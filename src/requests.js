import axios from 'axios';

const baseUrl='https://xeniaweb.online/api';
const basePhotosUrl='https://xeniaweb.online/storage/photos';
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2JhNDkyNDdiMmVmNjQ2YTg3NTE2ZGU4YWE5MmM3MjU4NjIxOGZiNjFhNmU3NTA2YzRjY2U5M2I5M2MyY2Q2YTg0MGExZmQ3NzAyYTQ3YmYiLCJpYXQiOjE2MDIwOTE4MTQsIm5iZiI6MTYwMjA5MTgxNCwiZXhwIjoxNjMzNjI3ODE0LCJzdWIiOiIxOSIsInNjb3BlcyI6W119.aTGY9bL0leG8w9fbSiNpqL7pEetqsblKChzq0awWea77j-qKcrqCgJkj-9wegXp86z1zCMgViWY36DVbfNSDmjile9err7RWPgKNgaBC_Di3_tnagH4J_UfaDv-nE8A1FUx8w3fSRwo8u58BVkz6GugUWwsid-uCP0SWcW7015jbhh5h8iUTopcg63cBGQBoQ4q_PMDu1bFEhDyzm7h2xfqhgvfV466wHjwD-gOhJW4_YpASW46gPfRwxLZ4kFSkBWj-hCws8DsmRKazHPHSJqXm1gmCqxjI3VCAGmjX677fnUedeDRqvyKt93rXu-EgNqzu4kOpChtrDjRGOxlwBGEoGRQC-7TxmDTA6ZLMQdaGAn4Pirfg_wbv66E4vHL6XYz06oIA0vOe8DJdcZkOzglWZEBKzcTg5G11CTfWt8V-U_Ghd17WJDVxrCOFvkfI9MvsvY7pWZpmGyvxlzMr8Fa8N1nycl1PrE4nQPMFSgzQmjECZOK6SRGWoTiOXapeamGkJhrRRXTlgGpekZVmtSY2O4n304aJ_VYyulLjvcEyS7F2EctLXH_mcpKM__dzGSWSRoNZT1OP7eGiULDsSVmATuSC7NB0z9R4HeGlZIxT4eDG55hf-AXNDOMONepSxASZ8Cxwq1d9zSPsTxTGOlgyPJZJHU1OgIC5jGgH-2U';
const token = localStorage.getItem('token') || '';
const userId = localStorage.getItem('userId') || '';

const requests = axios.create({
  baseURL: baseUrl,
  basePhotosUrl: basePhotosUrl,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});  

export default requests;