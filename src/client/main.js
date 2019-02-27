import Vue from 'vue';
import VueFeathers from 'vue-feathers';
import BootstrapVue from 'bootstrap-vue';
import VueSwal from 'vue-swal'
import App from './App.vue';
import router from './router';
import store from './store';
import feathers from './feathers';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueFeathers, feathers);

Vue.use(VueSwal)

store.dispatch('auth/authenticate')
  .catch(() => {})
  // Render the app
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  })

