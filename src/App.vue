<template>
    <v-app>
        <v-navigation-drawer floating permanent app dark>
            <v-list dense rounded>
                <v-list-item class="px-2 py-4">
                    <v-avatar class="pr-4">
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                    </v-avatar>
                    <!-- John Donaster -->
                    <div>
                        <v-list-item-title class="title pb-2">
                            Sandra Adams
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            sandra_a88@gmail.com
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
export default {
    name: 'App',

    data: () => ({
        items: [
            { title: 'Chat Group', icon: 'mdi-view-dashboard', name: 'Home' },
            { title: 'Profile', icon: 'mdi-forum', name: 'Profile' }
        ]
    })
};
</script>
