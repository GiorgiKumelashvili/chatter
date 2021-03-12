import axios from 'axios';
import Back from './Back';

const back = axios.create({
    baseURL: `${process.env.VUE_APP_BACK_URL}/api`
});

back.interceptors.request.use(async config => {
    const { data: accessToken } = await Back.retrieveToken();
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

const backWithoutToken = axios.create({
    baseURL: `${process.env.VUE_APP_BACK_URL}/api`
});

export default {
    back,
    backWithoutToken
};
