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

            <v-list-item ripple @click="() => {}">
                <v-list-item-subtitle>Logout</v-list-item-subtitle>
                <v-list-item-icon>
                    <v-icon>mdi-login-variant</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-card>
    </v-container>
</template>

<script>
import Func from '@/utils/Func';

export default {
    data: () => ({
        darkMode: null
    }),
    created() {
        this.darkMode = Func.getDarkMode();
    },
    methods: {
        toggleDarkMode() {
            const bool = !this.darkMode;
            console.log(bool);

            this.darkMode = bool;
            this.$vuetify.theme.dark = bool;
            localStorage.setItem('darkMode', bool);
        }
    }
};
</script>
