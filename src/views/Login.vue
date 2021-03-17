<template>
    <div class="login white--text d-flex justify-center ">
        <div class="d-flex flex-column align-center" style="margin-top:18%">
            <div class="d-flex">
                <h1>
                    CHATTER
                </h1>
                <v-icon color="white" large class="pl-3">
                    mdi-earth
                </v-icon>
            </div>

            <h2 class="my-7 text-center">
                Message random people on chatter, anytime, anywhere
            </h2>

            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" />
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
// import axios from 'axios';
import Const from '@/utils/Const';
import Back from '@/utils/Back';

export default {
    components: {
        GoogleLogin
    },
    data() {
        return {
            // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
            params: {
                client_id: process.env.VUE_APP_GOOGLE_ID
            },
            // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        };
    },
    methods: {
        async onSuccess(googleUser) {
            const basicProfile = googleUser.getBasicProfile();
            const token = googleUser[Const.user.idToken].id_token;
            const id = basicProfile[Const.user.id];

            // This only gets the user information: id, name, imageUrl and email
            this.$store.commit('SET_USER_DATA', basicProfile);

            // authenticate on backend
            await Back.Authenticate(token, id);

            // Redirect
            this.$router.push({ name: 'Home' });
            // this.$router.go({ name: 'Home' });
        }
    }
};
</script>

<style scoped>
.login {
    height: 100vh;
    width: 100vw;
    background: url('../assets/img/bg.jpg') no-repeat center center / cover;
}
</style>
