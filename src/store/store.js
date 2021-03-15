import Back from '@/utils/Back';
import Const from '@/utils/Const';
import Func from '@/utils/Func';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        messages: [],
        messagesx: [
            {
                text: `
					xxLorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore 
					pariatur dignissimos repellendus necessitatibus nisi, nulla itaque, 
					natus laborum error rerum quam iusto? 
					`,
                user_id: '107001323067694768810', // mine (from atheros)
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `
					Lorem ipsum, dolor 
					`,
                user_id: '123001323067694768819', // mine (from atheros)
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore 
					pariatur dignissimos repellendus necessitatibus nisi, nulla itaque, 
					natus laborum error rerum quam iusto? Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita 
					`,
                user_id: '107001323012394768810',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `
					Lorem ipsum, 
					`,
                user_id: '107001323052394768810',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107001323067694768123',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107111323067694768123',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					`,
                user_id: '007001323067694768123',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            },
            {
                text: `Consequatur aspernatur amet 
					rem eaque alias tempora, unde expedita nemo architecto minus, neque
					blanditiis ullam suscipit quisquam ipsum
					`,
                user_id: '107001323067694768153',
                image_url:
                    'https://lh3.googleusercontent.com/-S4eSg4kzCUY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckpFlhtJ-rZViyYjb9Heyyp1xmM8A/s96-c/photo.jpg'
            }
        ]
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

            Back.Service('/messages/create', {
                user_id: payload.user_id,
                text: payload.text
            });

            ctx.commit('SET_NEW_MESSAGE', payload);
        },

        setMessages(ctx, payload) {
            ctx.commit('SET_MESSAGES', payload);
        },

        async getMessages(ctx) {
            const messages = await Back.Service('/messages');
            ctx.dispatch('setMessages', messages.data);
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
        id: state => state.user[Const.user.id]
    },
    modules: {},
    strict: true
});
