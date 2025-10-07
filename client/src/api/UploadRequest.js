import axios from 'axios';

const API = axios.create({ baseURL: 'http://43.220.2.185:8080' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);