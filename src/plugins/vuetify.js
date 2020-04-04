import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import * as directives from 'vuetify/es5/directives'

Vue.use(Vuetify, { directives });

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
});
