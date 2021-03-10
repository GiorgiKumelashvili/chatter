import Vue from 'vue';
import { LoaderPlugin } from 'vue-google-login';

class Func {
    static scrollToBottom(id) {
        if (!id) return;

        const el = document.getElementById(id);
        setTimeout(() => (el.scrollTop = el.scrollHeight), 100);
    }

    static getDarkMode() {
        return JSON.parse(localStorage.getItem('darkMode'));
    }

    static setAuthenticated() {
        localStorage.setItem('authenticated', true);
    }

    static removeAuthenticated() {
        localStorage.removeItem('authenticated');
    }

    static async isAuthenticated() {
        Vue.use(LoaderPlugin, {
            client_id: process.env.VUE_APP_GOOGLE_ID
        });

        let bool = false;

        try {
            const auth2 = await Vue.GoogleAuth;
            bool = auth2.isSignedIn.get();
            localStorage.setItem('authenticated', bool);
        } catch (error) {
            console.log(error);
        }

        return bool;
    }
}

export default Func;
