import axios from 'axios';

const API = axios.create({ baseURL: 'http://43.207.201.56:8080' });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`post/${id}/like_dislike`, { userId: userId })