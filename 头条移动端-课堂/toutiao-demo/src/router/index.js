import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter)

// 路由映射数组
const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/layout/home")
      },
      {
        path: "qa",
        component: () => import("@/views/layout/qa")
      },
      {
        path: "video",
        component: () => import("@/views/layout/video")
      },
      {
        path: "my",
        component: () => import("@/views/layout/my")
      },
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login")
  },
  {
    path: "/user/collect",
    component: () => import("@/views/user/collect"),
    // 路由元信息（meta可以添加自定义信息）
    meta: {
      needLogin: true
    }
  },
  {
    path: "/user/history",
    component: () => import("@/views/user/history"),
    meta: {
      needLogin: true
    }
  },
  {
    path: "/search",
    component: () => import("@/views/search")
  },
]
// 实例化路由对象
const router = new VueRouter({
  routes,
})
// 导航守卫（前置守卫）
router.beforeEach((to, from, next) => {
  // console.log("to", to); // 到哪去
  // console.log("from", from); // 从哪来

  // 需要登录才可以访问的界面路由信息会有needLogin
  // 判断去的页面是否需要登录
  if (to.meta.needLogin) {
    // 需要登录,判断是否登录
    if (store.getters.token) {
      // 登录了放行
      next()
    } else {
      // 未登录，跳转登录
      next("/login?url=" + to.path)
    }
  } else {
    // 不需要登录，直接放行
    next() // 放行
  }
})

export default router