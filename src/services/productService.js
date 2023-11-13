import { requester } from "../request.js";


const request = requester();

const endpoints = {
    all: '/data/products',
    getOne: '/data/products/',
    edit: '/data/products/',
    create: '/data/products',
    delete: '/data/products/'
}

async function getAll(query) {
    if(query) {
        
        let queryString = '?where=' 
        const queryArr = Object.entries(query).map(([field, value]) => encodeURIComponent(`${field}="${value}"`));
        queryString += queryArr.join(encodeURIComponent(' AND '))
        return request.get(endpoints.all + queryString);
    }
    return request.get(endpoints.all);

}
async function getProductById(id) {
    return request.get(endpoints.getOne + id);
}
async function editProduct(productId, values, accessToken) {
    return request.put(endpoints.edit + productId, values, accessToken);
}
async function createProduct(values, user) {
    return request.post(endpoints.create, values, user.accessToken);
}
async function deleteProduct(id, accessToken) {
    return request.delete(endpoints.delete + id, null, accessToken);
}

export default {
    getAll,
    getProductById,
    editProduct,
    createProduct,
    deleteProduct
}
