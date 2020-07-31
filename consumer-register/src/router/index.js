import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ConsumerForm from "../views/ConsumerForm.vue";
import ConsumerList from "../views/ConsumerList.vue";
import ConsumerDetail from "../views/ConsumerDetail.vue";
import { getCurrentUser } from "../services/authService";

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  if (getCurrentUser()) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/consumers",
    name: "ConsumerList",
    component: ConsumerList,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/consumers/edit/:id",
    name: "Edit",
    component: ConsumerForm,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/consumers/new",
    name: "New",
    component: ConsumerForm,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/consumers/details/:id",
    name: "Detail",
    component: ConsumerDetail,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
