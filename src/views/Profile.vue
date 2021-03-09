<template>
    <v-container fluid>
        <v-card max-width="400" elevation="5">
            <v-card-title>
                Profile
            </v-card-title>

            <v-list-item @click="toggleDarkMode()">
                <v-list-item-subtitle>Dark mode</v-list-item-subtitle>
                <v-list-item-icon>
                    <v-icon>{{ darkMode ? 'mdi-sunglasses' : 'mdi-weather-sunny' }}</v-icon>
                    <!-- mdiSunglasses -->
                </v-list-item-icon>
            </v-list-item>

            <GoogleLogin :params="params" :logoutButton="true" style="width:100%">
                <v-list-item ripple @click="logout()">
                    <v-list-item-subtitle class="text-start">
                        Logout
                    </v-list-item-subtitle>
                    <v-list-item-icon>
                        <v-icon>mdi-login-variant</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </GoogleLogin>
        </v-card>
    </v-container>
</template>

<script>
import Func from '@/utils/Func';
import GoogleLogin from 'vue-google-login';

export default {
    components: {
        GoogleLogin
    },
    data: () => ({
        darkMode: null,
        params: {
            client_id: '536889969464-0om7g4vnhcmdaqk9dfrmaikvu7j653ke.apps.googleusercontent.com'
        }
    }),
    created() {
        this.darkMode = Func.getDarkMode();
    },
    methods: {
        toggleDarkMode() {
            const bool = !this.darkMode;

            this.darkMode = bool;
            this.$vuetify.theme.dark = bool;
            localStorage.setItem('darkMode', bool);
        },
        logout() {
            Func.removeAuthenticated();
            this.$router.go({ name: 'Login' });
        }
    }
};
</script>
