import Const from '@/utils/Const';
import Func from '@/utils/Func';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        // messages: [],
        messages: [
            {
                text: `
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore 
					pariatur dignissimos repellendus necessitatibus nisi, nulla itaque, 
					natus laborum error rerum quam iusto? 
					`,
                user_id: '107001323067694768810', // mine (from atheros)
                imageUrl: '',
                index: 1
            },
            {
                text: `
					Lorem ipsum, dolor 
					`,
                user_id: '123001323067694768819', // mine (from atheros)
                imageUrl: '',
                index: 2
            },
            {
                text: `
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore 
					pariatur dignissimos repellendus necessitatibus nisi, nulla itaque, 
					natus laborum error rerum quam iusto? Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita 
					`,
                user_id: '107001323012394768810',
                imageUrl: '',
                index: 3
            },
            {
                text: `
					Lorem ipsum, 
					`,
                user_id: '107001323052394768810',
                imageUrl: '',
                index: 4
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107001323067694768123',
                imageUrl: '',
                index: 5
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107111323067694768123',
                imageUrl: '',
                index: 6
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					`,
                user_id: '007001323067694768123',
                imageUrl: '',
                index: 7
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107001323067694768153',
                imageUrl: '',
                index: 8
            }
        ]
    },
    mutations: {
        /**
         * @param {Object} payload
         * @returns {null}
         */
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

        SET_USER_TOKEN(_, payload) {
            localStorage.setItem('token', payload);
        }
    },
    actions: {
        setMessage(ctx, payload) {
            if (!Object.entries(payload).length) {
                return null;
            }

            ctx.commit('SET_NEW_MESSAGE', payload);
        }
    },
    getters: {
        user: state => state.user,
        messages: state => state.messages,
        maxIndex: state => {
            if (state.messages.length) {
                return Math.max.apply(
                    Math.max,
                    state.messages.map(o => o.index)
                );
            }

            return 0;
        },

        fullName: state => state.user[Const.user.fullName],
        email: state => state.user[Const.user.email],
        img: state => state.user[Const.user.img]
    },
    modules: {},
    strict: true
});
