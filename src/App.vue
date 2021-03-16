<template>
    <v-app>
        <v-navigation-drawer
            v-if="isProfileSet"
            v-model="drawer"
            app
            dark
            :temporary="toogleToSmallDevice"
            :absolute="toogleToSmallDevice"
            :floating="!toogleToSmallDevice"
            :permanent="!toogleToSmallDevice"
        >
            <Navbar />
        </v-navigation-drawer>

        <v-app-bar app dense v-if="toogleToSmallDevice && isProfileSet">
            <v-btn icon @click="drawer = !drawer">
                <v-icon v-if="drawer">mdi-chevron-left</v-icon>
                <v-icon v-else>mdi-chevron-right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <p class="text-uppercase ma-0">
                {{ name }}
            </p>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Socket from '@/utils/Socket';

export default {
    name: 'App',

    components: {
        Navbar
    },

    data: () => ({
        isProfileSet: false,
        minWidth: 800,

        // navbar
        drawer: false,
        toogleToSmallDevice: false
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

                if (this.$store.getters.id !== data.user_id)
                    this.$store.dispatch('setNewMessageUI', data);
            });
        },
        setUserProfile() {
            const user = localStorage.getItem('user');

            if (user) {
                this.$store.commit('SET_USER_DATA', JSON.parse(user));
                this.isProfileSet = true;
            }
        }
    },

    watch: {
        '$vuetify.breakpoint.width': {
            handler() {
                this.toogleToSmallDevice = this.$vuetify.breakpoint.width < this.minWidth;
            },
            immediate: true
        }
    },

    computed: {
        name() {
            return this.$store.getters.name;
        }
    }
};
</script>
