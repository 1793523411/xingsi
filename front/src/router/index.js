import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: '/main',
    children: [
      {
        path: "/main",
        name: "main",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/Main/Main.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/About/About.vue"
          ),
      },
      {
        path: "/history",
        name: "history",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/History/History.vue"
          ),
      },
      {
        path: "/article/:id",
        name: "article",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/Article/Article.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
