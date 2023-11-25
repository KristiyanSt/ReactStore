const host = 'http://localhost:3030'

// todo error handling with fake accesstoken

async function request(method, url, body, token) {
    const options = {
        method,
        headers: {}
    };

    if (token) {
        options.headers['x-authorization'] = token;
    }
    if (body) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    const response = await fetch(host + url, options);
    if(response.status == 204 ) {
        return null;
    }
    if(!response.ok) {
        throw response;
    }
    return response.json();

}

export function requester() {
    return {
        get: request.bind(null, 'get'),
        post: request.bind(null, 'post'),
        delete: request.bind(null, 'delete'),
        put: request.bind(null, 'put'),
        patch: request.bind(null, 'patch')
    }
}