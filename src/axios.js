import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorizaion'] = 'AUTH TOKEN FROM INSTACE';

// instance.interceptors.request.

export default instance;
