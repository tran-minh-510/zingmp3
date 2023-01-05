import config from "../../Configs/Config.json";
import endpointsZing from "../../Configs/EndPointZing.json";

const { SERVER_API_ZING } = config;

export default class CallAPIZing {
    constructor() {
        if (Object.keys(endpointsZing).length) {
            Object.keys(endpointsZing).forEach((endpoint) => {
                this[endpoint] = endpointsZing[endpoint];
            });
        }
    }

    callApi = async (url, method = "GET", body = null) => {
        url = SERVER_API_ZING + url;

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();
        return {
            response: response,
            data: data,
        };
    };

    get = (url, params = {}) => {
        if (Object.keys(params).length) {
            const queryString = new URLSearchParams(params).toString();
            return this.callApi(url + "?" + queryString);
        }

        return this.callApi(url);
    };

    post = (url, body) => {
        return this.callApi(url, "POST", body);
    };

    put = (url, id, body) => {
        return this.callApi(url + "/" + id, "PUT", body);
    };

    patch = (url, id, body) => {
        return this.callApi(url + "/" + id, "PATCH", body);
    };

    delete = (url, id) => {
        return this.callApi(url + "/" + id, "DELETE");
    };
}