import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

// get
export function get(url, params) {
    return axios.get(url, { params: params })
}
// post
export function post(url, data) {
    return axios.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}