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
    path: "/search",
    component: () => import("@/views/search")
  },
  {
    path: "/user/collect",
    component: () => import("@/views/user/collect"),
    meta: {
      // 需要登录
      needLogin: true
    }
  },
  {
    path: "/user/history",
    component: () => import("@/views/user/history"),
    meta: {
      // 需要登录
      needLogin: true
    }
  },
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 设置路由守卫 
router.beforeEach((to, from, next) => {
  // console.log("to", to); // 到哪去
  // console.log("from", from); // 从哪来
  const token = store.getters.token
  // 判断当前页面是否需要登陆
  if (to.meta.needLogin) {
    // 需要登录的，查看是否登录
    if (token) {
      // 已登录
      next()
    } else {
      // 未登录,跳转到登录页面，携带要去的地址，方便下一步操作
      next("/login?url=" + to.path)
    }
  } else {
    // 不需要登录直接放行
    next()
  }
})

export default router
