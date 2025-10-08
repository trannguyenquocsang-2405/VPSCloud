import axios from 'axios';

const API = axios.create({ baseURL: 'http://13.231.34.129:8080' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);