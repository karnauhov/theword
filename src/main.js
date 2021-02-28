import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      get contentUrl() {
        if (process.env.NODE_ENV === "development")
          return "http://127.0.0.1:5500/";
        else
          return "https://raw.githubusercontent.com/karnauhov/theword.content/master/";
      }
    }
  }
})

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
