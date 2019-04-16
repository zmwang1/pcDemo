import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue' //主页
import Login from './views/Public/login.vue' //登录页
import Home from './views/Public/home.vue' //首页

Vue.use(Router)
const vueRouter = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Index,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'home',
        component: Home,
      }, ]
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: true,
      },
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

vueRouter.beforeEach(function (to, form, next) {

  // if (process.env.NODE_ENV === 'production') {
  //   window._hmt && window._hmt.push(['_trackPageview', '/PC/#' + to.fullPath]);
  // }
  next()
  // if (to.meta.requireAuth) {
  //   next()
  // } else {
  //   if (localStorage.getItem('loginState') == 'true') {
  //     next();
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // }
})
export default vueRouter