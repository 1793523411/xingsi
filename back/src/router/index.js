import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */'../components/login/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Welcome.vue')
const Editor = () => import(/* webpackChunkName: "editor_article" */'../components/editor/Editor.vue')
const Article = () => import(/* webpackChunkName: "editor_article" */'../components/article/Article.vue')
const Swiper = () => import(/* webpackChunkName: "Swiper_Wall" */'../components/image/Swiper.vue')
const Wall = () => import(/* webpackChunkName: "Swiper_Wall" */'../components/image/Wall.vue')



Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component:Home,
    redirect: '/welcome',
    children:[
      {path:'/welcome',component: Welcome},
      {path:'/editor',component: Editor},
      {path:'/article',component: Article},
      {path:'/swiper',component: Swiper},
      {path:'/wall',component: Wall}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
