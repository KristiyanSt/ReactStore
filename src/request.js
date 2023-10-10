const host = 'http://localhost:3030'

export async function request(url, body, method, token) {
    const options = {};

    if(body) {
        options.method = method;

        options.headers = {};
        options.headers['content-type'] = 'application/json';
        
        if(token) {
            options.headers['x-authorization'] = token;
        }
        options.body = JSON.stringify(body);
    }

    const result = await fetch(host + url, options);

    if(result.status === 204){
        return result;
    }

    return result.json();
}