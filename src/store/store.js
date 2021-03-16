import Vue from 'vue';
import Vuex from 'vuex';
import Back from '@/utils/Back';
import Const from '@/utils/Const';
import Func from '@/utils/Func';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        messages: []
    },
    mutations: {
        SET_USER_DATA(state, payload) {
            if (!payload || !Object.values(payload).length) {
                return null;
            }

            localStorage.setItem('user', JSON.stringify(payload));

            // set user data
            state.user = payload;
        },

        SET_NEW_MESSAGE(state, payload) {
            state.messages.push(payload);

            Func.scrollToBottom('mees');
        },

        SET_MESSAGES(state, payload) {
            state.messages = payload;
        }
    },
    actions: {
        setNewMessage(ctx, payload) {
            if (!Object.entries(payload).length) {
                return null;
            }
            Back.Service(Const.backendRoutes.messageCreate, payload);
            ctx.commit('SET_NEW_MESSAGE', payload);
        },

        setNewMessageUI(ctx, payload) {
            if (!Object.entries(payload).length) {
                return null;
            }

            ctx.commit('SET_NEW_MESSAGE', payload);
        },

        async getMessages(ctx) {
            const messages = await Back.Service(Const.backendRoutes.messageAll);
            ctx.commit('SET_MESSAGES', messages.data);
        }
    },
    getters: {
        user: () => {
            return {
                id: this.getters.id,
                fullName: this.getters.fullName,
                email: this.getters.email,
                img: this.getters.img
            };
        },
        messages: state => state.messages,
        fullName: state => state.user[Const.user.fullName],
        email: state => state.user[Const.user.email],
        img: state => state.user[Const.user.img],
        id: state => state.user[Const.user.id],
        name: state => state.user[Const.user.name]
    },
    modules: {},
    strict: true
});
