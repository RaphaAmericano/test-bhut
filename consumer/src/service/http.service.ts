import type { AxiosResponse } from "axios"
import axios from "axios"

const service = axios.create({
    baseURL: process.env.WEBHOOK_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json"
    }
});

function parseResponse(response: AxiosResponse){
    return response.data
}

async function handleResponseError(error: unknown){
    return Promise.reject(error);
}
service.interceptors.response.use(parseResponse, handleResponseError);

export default service;