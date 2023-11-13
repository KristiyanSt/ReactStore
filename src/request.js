const host = 'http://localhost:3030'

// todo error handling with fake accesstoken

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
    try {
        const result = await fetch(host + url, options);

        switch (result.status) {
            case 204:
            case 404:
                return [];
            case 400:
                throw new Error('Please fill all fields !');
            case 401:
                throw new Error('You are unauthorized');
            // case 403:
            //     //TODO THIS IS FORBIDDEN 403 , server throws this with invalid logout also
            //CLEAR LOCALSTORAGE
            //     throw new Error('Email or password don\'t match !');
            case 409:
                const response = await result.json();
                throw new Error(response.message)
        }

        return result.json();

    } catch (error) {

        if (error.message == "Failed to fetch") {
            throw new Error('Something went wrong!')
        }
        throw error;
    }
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