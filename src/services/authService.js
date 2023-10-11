import { requestFactory } from "../request.js";

const request = requestFactory();

async function login(values) {
    return request.post('/users/login', values);
}
async function register(values) {
    return request.post('/users/register', values);
}
async function logout(token) {
    return request.get('/users/logout', null, token);
}

export {
    login,
    register,
    logout
}
