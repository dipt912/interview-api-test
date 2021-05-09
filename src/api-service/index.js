import axios from 'axios';
const baseUrl = process.env.api_base_url;

export default class API {

    static init() {
        this.instance = axios.create({
            baseURL: 'https://my-json-server.typicode.com/jason-ogasian-walmart/interview-api',
            timeout: 15000,
            headers: {
                'Access-Control-Allow-Origin': 'https://my-json-server.typicode.com/jason-ogasian-walmart/interview-api',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
            // withCredentials: true
        });
    }

    static getInstance() {
        return this.instance;
    }


    static async createRequest({method = 'GET', url, params = null, data = null}) {
        try {
            return await this.instance({
                method,
                url,
                data,
                params
            })
        } catch (err) {
            console.log('error', err)
            throw {
                message: 'Network Error',
                stack: err
            }
        }
    }
}
