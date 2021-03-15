import router from '@/router/router';
import Vue from 'vue';
import { LoaderPlugin } from 'vue-google-login';
import Axios from './Axios';

// retrieve axios objects
const { back, backWithoutToken } = Axios;

class Back {
    static HEADERS = { withCredentials: true };

    /**
     * Connnects To Backend
     * Send access token and user id on every call
     *
     * @param {String} url - url for backendcd
     * @param {Object} obj - object for sending to backend
     * @returns {Promise}
     */
    static Service(url, obj = null) {
        return back
            .post(url, obj)
            .then(res => res.data)
            .catch(() => {
                // redirect
                router.go({ name: 'Login' });
            });
    }

    /**
     * Connnects to backend and authenticates user
     * plus sets httpOnly access_token cookie for
     * authorization of api
     *
     * @param {String} token - google id_token for backend (e.g password)
     * @param {Number} id   - google user id for token creation
     * @returns {null}
     */
    static async Authenticate(token, id) {
        const obj = { id_token: token };
        const obj2 = { id };

        try {
            // create user and then access_token
            await backWithoutToken.post('/authenticate', obj, Back.HEADERS);
            await backWithoutToken.post('/token/create', obj2, Back.HEADERS);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Verifys if user is authenticated by
     * using google plugin and google
     * client id which is registered on my
     * google cloud console in [giorg.kumelashvili21@gmail.com]
     *
     * @returns {Boolean}
     */
    static async isAuthenticated() {
        Vue.use(LoaderPlugin, {
            client_id: process.env.VUE_APP_GOOGLE_ID
        });

        let bool = false;

        try {
            const auth2 = await Vue.GoogleAuth;
            bool = auth2.isSignedIn.get();
        } catch (error) {
            console.log(error);
        }

        return bool;
    }

    /**
     * Retrieves access_token from backend
     * and returns promise
     *
     * @returns {Promise}
     */
    static retrieveToken() {
        const url = '/token/retrieve';

        return backWithoutToken
            .post(url, null, Back.HEADERS)
            .then(res => res)
            .catch(err => console.log(err));
    }

    static logout() {
        const LOGIN_NAME = 'Login';

        // clean localstorage
        localStorage.removeItem('user');

        // redirect
        router.go({ name: LOGIN_NAME });
    }
}

export default Back;
