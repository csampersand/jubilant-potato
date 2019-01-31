import Vue from 'vue';
import VueFeathers from 'vue-feathers';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import feathers from './feathers';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueFeathers, feathers);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
