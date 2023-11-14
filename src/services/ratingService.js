import { requester } from "../request.js";

const request = requester();
const endpoints = {
    ratings: '/data/ratings',
    userRating: (query) => `/data/ratings/?where=${query}`,
}
async function rateProduct(productId, rating, accessToken) {
    const body = {
        productId,
        rating
    }
    return request.post(endpoints.ratings, body, accessToken );
}

async function getUserRating(productId, userId){
    const query = encodeURIComponent(`productId="${productId}" AND _ownerId="${userId}"`);
    return request.get(endpoints.userRating(query));
}

export default{ 
    rateProduct,
    getUserRating
}