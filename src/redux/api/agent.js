import axios from 'axios';

axios.defaults.baseURL = "http://app.code2.io/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01";

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
    new Promise((resolve) =>
        setTimeout(() => resolve(response), ms)
    );

const request = {
    get: (url) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url, body) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url, body) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Products = {
    list: (customerid) => request.get(`/Product/getProductsList?xcustomer_id=${customerid}`)
};

export default {
    Products
}