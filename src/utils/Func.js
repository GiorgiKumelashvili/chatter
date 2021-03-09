import Vue from 'vue';
import { LoaderPlugin } from 'vue-google-login';

class Func {
    static scrollToBottom(id) {
        if (!id) return;

        const el = document.getElementById(id);
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 100);
    }

    static getDarkMode() {
        let isDark = localStorage.getItem('darkMode') ?? false;

        if (typeof isDark !== 'undefined' && isDark !== null) {
            isDark = isDark == 'true';
        }

        return isDark;
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
        } catch (error) {
            console.log(error);
        }

        localStorage.setItem('authenticated', bool);

        return bool;
    }
}

export default Func;
