import { requester } from "../request.js";

const request = requester();

const endpoints = {
    ratings: '/data/ratings',
    userRating: (query) => `/data/ratings/?where=${query}`,
    singleRatingsCount: (query) => `/data/ratings/?where=${query}&count`
}

async function rateProduct(productId, rating, accessToken) {
    const body = {
        productId,
        rating
    }
    return request.post(endpoints.ratings, body, accessToken );
}

async function getUserRating(productId, userId){
    const queryString = `productId="${productId}" AND _ownerId="${userId}"`;
    const query = encodeURIComponent(queryString);
    return request.get(endpoints.userRating(query));
}

async function getRatingsCountById(productId) {
    const queryString = `productId="${productId}"`;
    const query = encodeURIComponent(queryString);
    return request.get(endpoints.singleRatingsCount(query));
}

export default{ 
    rateProduct,
    getUserRating,
    getRatingsCountById
}