import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Func from '@/utils/Func';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: Func.getDarkMode() }
});
