<template>
    <v-app>
        <v-navigation-drawer floating permanent app dark v-if="isProfileSet">
            <v-list dense rounded>
                <v-list-item class="px-2 py-4">
                    <v-avatar class="mr-3">
                        <img :src="img" alt="John" />
                    </v-avatar>
                    <div>
                        <v-list-item-title class="title pb-2 text-truncate" style="max-width:10rem">
                            {{ fullName }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-truncate" style="max-width:10rem">
                            {{ email }}
                        </v-list-item-subtitle>
                    </div>
                </v-list-item>

                <router-link
                    v-for="item in items"
                    :key="item.title"
                    :to="{ name: item.name }"
                    class="d-flex text-decoration-none"
                >
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Socket from '@/utils/Socket';

export default {
    name: 'App',

    data: () => ({
        items: [
            { title: 'Chat Group', icon: 'mdi-forum', name: 'Home' },
            { title: 'Profile', icon: 'mdi-account-circle', name: 'Profile' }
        ],
        isProfileSet: false
    }),

    created() {
        this.setUserProfile();

        if (this.isProfileSet) {
            this.$store.dispatch('getMessages');

            this.startListeningToChannel();
        }
    },

    methods: {
        startListeningToChannel() {
            const channel = process.env.VUE_APP_WEBSOCKETS_CHANNEL;
            const listener = process.env.VUE_APP_WEBSOCKETS_LISTEN;

            Socket.channel(channel).listen(listener, e => {
                const { data } = e;
                if (this.$store.getters.id !== data.user_id) {
                    this.$store.dispatch('setNewMessageUI', data);
                }
            });
        },
        setUserProfile() {
            //TODO gadaitane navigation componentshi roca gaaketeb
            const user = localStorage.getItem('user');

            if (user) {
                this.$store.commit('SET_USER_DATA', JSON.parse(user));
                this.isProfileSet = true;
            }
        }
    },
    computed: {
        fullName() {
            return this.$store.getters.fullName;
        },
        email() {
            return this.$store.getters.email;
        },
        img() {
            return this.$store.getters.img;
        }
    }
};
</script>
