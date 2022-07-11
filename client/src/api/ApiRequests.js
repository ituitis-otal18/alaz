import axios from 'axios';

export const signup = (body) => {
    return axios.post('/api/v1/users', body);
};

export const login = (creds) => {
    return axios.post('/api/v1/auth', {}, { auth: creds });
};

export const getUsers = (page, username = '') => {
    return axios.get(`/api/v1/users?currentPage=${page}&username=${username}`);
};

export const getUserByUsername = (username) => {
    return axios.get(`/api/v1/users/${username}`);
};

export const updatePassword = (username, body) => {
    return axios.put(`/api/v1/users/${username}/password`, body);
};

export const updateImage = (username, body) => {
    return axios.put(`/api/v1/users/${username}/image`, body);
};
