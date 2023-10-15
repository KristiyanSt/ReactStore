const host = 'http://localhost:3030'

async function request(method, url, body, token) {
    const options = {};
    options.method = method;
    options.headers = {};

    if (token) {
        options.headers['x-authorization'] = token;
    }
    if (body) {
        options.headers['content-type'] = 'application/json';


        options.body = JSON.stringify(body);
    }

    const result = await fetch(host + url, options);

    if (result.status === 204) {
        return result;
    }
    if (result.status === 404) {
        return [];
    }

    return result.json();


}

export function requestFactory() {
    return {
        get: request.bind(null, 'get'),
        post: request.bind(null, 'post'),
        delete: request.bind(null, 'delete'),
        put: request.bind(null, 'put')
    }
}