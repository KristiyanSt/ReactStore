import { PRODUCTS_PAGE_SIZE } from "../constants/constants.js";
import { requester } from "./request.js";

const URL = '/data/products';

const request = requester();

async function getAll(page) {
    const offset = page * PRODUCTS_PAGE_SIZE;
    const query = `?offset=${offset}&pageSize=${PRODUCTS_PAGE_SIZE}`
    return request.get(URL + query);
}
async function getProductsByIds(productsIds) {
    const query = encodeURIComponent(`_id IN (${productsIds.join(',')})`)
    return request.get(URL + `?where=` + query)
}
async function getProductsCount() {
    return request.get(URL + '?count');
}
async function getProductById(id) {
    return request.get(`${URL}/${id}`);
}
async function editProduct(id, values, accessToken) {
    return request.put(`${URL}/${id}`, values, accessToken);
}
async function createProduct(values, user) {
    return request.post(URL, values, user.accessToken);
}
async function deleteProduct(id, accessToken) {
    return request.delete(`${URL}/${id}`, null, accessToken);
}
export default {
    getAll,
    getProductsByIds,
    getProductsCount,
    getProductById,
    editProduct,
    createProduct,
    deleteProduct
}
