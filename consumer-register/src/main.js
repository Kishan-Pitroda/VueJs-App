import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";
import NProgress from "nprogress";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import Toasted from "vue-toasted";

Vue.use(VueAxios, axios);
Vue.use(Toasted, { duration: 1000 });
Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
