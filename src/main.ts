import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/base.css";
import router from './router';
import { createPinia, PiniaVuePlugin  } from 'pinia';

const pinia = createPinia();

Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount("#app");