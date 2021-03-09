<template>
    <v-container fluid style="height:100%" class="d-flex flex-column justify-space-between pr-1">
        <!-- Message area -->
        <div class="d-flex flex-column flex-grow-1 pr-5" id="mees" :key="messagesKey">
            <template v-for="message in messages">
                <div
                    :key="chatKey(message.name)"
                    class="message-item my-2 d-flex align-end"
                    v-if="profile"
                    :class="{
                        'current-user-item flex-end ml-auto': message.user_id == profile.id
                    }"
                >
                    <v-avatar v-if="message.user_id != profile.id" size="30">
                        <img
                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                            alt="John"
                        />
                    </v-avatar>

                    <p
                        style="margin:0"
                        class="message-item-text pa-2 ml-2 white--text rounded-lg"
                        :class="{
                            'current-user-item-text ma-0': message.user_id == profile.id
                        }"
                    >
                        {{ message.text }}
                    </p>
                </div>
            </template>
        </div>

        <!-- Send Message area -->
        <div class="d-flex">
            <v-textarea
                label="message"
                :key="sendMessage"
                ref="message-arrea"
                rows="1"
                class="ma-0"
                v-model="message"
                :auto-grow="height < 88"
                filled
                hide-details
                dense
                outlined
            />
            <v-btn elevation="2" class="ml-3" icon @click="send()">
                <v-icon>
                    mdi-send
                </v-icon>
            </v-btn>
        </div>
    </v-container>
</template>

<script>
import Func from '@/utils/Func';

export default {
    data: () => ({
        // Message send area
        height: 0,
        sendMessage: 'send message key',

        // Message area
        message: null,
        messagesKey: 'some key',

        // Profile
        profile: {
            id: '107001323067694768810'
        }
    }),
    mounted() {
        this.heightObeserving();
        // start from bottom page
        Func.scrollToBottom('mees');
    },
    methods: {
        heightObeserving() {
            const el = this.$refs['message-arrea']?.$el;
            this.height = el.clientHeight;

            // create an Observer instance
            const resizeObserver = new ResizeObserver(
                () => (this.height = this.$refs['message-arrea']?.$el.clientHeight)
            );

            // start observing a DOM node
            resizeObserver.observe(el);
        },
        send() {
            if (!this.message) {
                return;
            }

            // send message
            const newMessageObject = {
                text: this.message,
                user_id: this.profile.id,
                imageUrl: this.profile.imageUrl,
                index: this.$store.getters.maxIndex + 1
            };

            console.log(newMessageObject);

            this.$store.dispatch('setMessage', newMessageObject);

            // resize height
            this.height = 0;

            // clear message place
            this.message = null;
        },
        chatKey(prop) {
            return `${prop}-${Math.random()}`;
        }
    },
    async created() {
        // const res = await Func.userData();
        // profile.value = res;
    },

    computed: {
        messages() {
            return this.$store.getters.messages;
        }
    }
};
</script>

<style scoped>
@import '../assets/css/test.css';

#mees {
    max-height: 85vh;
    overflow: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
}

#mees::-webkit-scrollbar {
    width: 0.8rem;
}

#mees::-webkit-scrollbar-track {
    background-color: #b0cdff;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#mees::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #005eff;
}

.message-item {
    max-width: var(--width);
}

.current-user-item {
    max-width: calc(var(--width) - 2rem);
}

.message-item-text {
    background-image: linear-gradient(to top right, #2f7bff, #005eff);
}

.current-user-item-text {
    background-image: linear-gradient(to top left, #6d2fff, #4400ff);
}
</style>
