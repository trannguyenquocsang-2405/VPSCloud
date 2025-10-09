import axios from 'axios';

const API = axios.create({ baseURL: 'http://43.207.201.56:8080' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);