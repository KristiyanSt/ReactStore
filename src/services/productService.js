import { requestFactory } from "../request.js";


const request = requestFactory();

const endpoints = {
    getAll: '/data/products',
    getOne: '/data/products/',
    edit: '/data/products/',
    create: '/data/products',
    delete: '/data/products/'
}

async function getAll() {
    return request.get(endpoints.getAll);
}

async function getProduct(id) {
    return request.get(endpoints.getOne + id);
}

async function editProduct(id, values, accessToken) {
    return request.put(endpoints.edit + id, values, accessToken);
}

async function createProduct(values, accessToken) {
    return request.post(endpoints.create, values, accessToken);
}

async function deleteProduct(id, accessToken) {
    return request.delete(endpoints.delete + id, null, accessToken);
}

async function addWillingUser (id, userId) {
    return request.put()
}
export default {
    getAll,
    getProduct,
    editProduct,
    createProduct,
    deleteProduct
}
