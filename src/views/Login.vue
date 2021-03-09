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

            <h2 class="my-7">
                Message random people on chatter, anytime, anywhere
            </h2>

            <v-btn>
                google login
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.login {
    height: 100vh;
    width: 100vw;
    background: url('../assets/img/bg.jpg') no-repeat center center / cover;
}
</style>
