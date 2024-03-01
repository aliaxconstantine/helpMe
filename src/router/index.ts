import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/utils/role";
import { validateToken } from "@/apis/apis";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../components/mainBack.vue"),
    },
    {
      path: "/loginback",
      name: "loginback",
      component: () => import("../components/LoginBack.vue"),
    },
    {
      path: "/tesk/:id",
      name: "tesk",
      component: () => import("../views/TeskDateils.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/message/:id",
      name: "message",
      component: () => import("../views/ChatView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/makeTesk",
      name: "makeTask",
      component: () => import("@/views/CreateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/area",
      name: "area",
      component: () => import("@/views/SelectAreaView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/search/:select",
      name: "search",
      component: () => import("@/views/ReachTaskView.vue"),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: "/state/:what",
      name: "state",
      component: () => import("@/views/stateTeskView.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/ok/:id",
      name: "ok",
      component: () => import("@/views/OkTesk.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/state",
      name: "state",
      component: () => import("@/views/stateTeskView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/taskinfo/:id/:isPublish",
      name: "taskinfo",
      component: () => import("@/views/TeskUserView.vue"),
      meta: { requiresAuth: true },
      props: (route) => ({
        teskid: Number(route.params.id),
        isPublisher: Number(route.params.isPublis),
      }),
    },
    {
      path: "/config",
      name:"config",
      component: () => import("@/views/ConfigView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/other/:id",
      name: "other",
      component: () => import("@/views/OtherView.vue"),
      meta: { requiresAuth: true },
      props: (route) => ({
        otherUserId: Number(route.params.id),
      }),
    },
    {
      //视频通话
      path: "/video/:id",
      name: "video",
      component: () => import("@/views/VideoView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

export async function checkLoginStatus() {
  // 从存储中读取登录凭证，进行验证
  const token = localStorage.getItem("token");
  // 进行验证逻辑，根据实际情况判断登录状态
  if (token) {
    const flag = await validateToken(token);
    return flag;
  }
  return false; // 返回登录状态，true表示已登录，false表示未登录
}

router.beforeEach(async (to, from, next) => {
  const use = userStore();
  const isAuthenticated = async () => {
    // 从存储中读取登录凭证，进行验证
    const token = localStorage.getItem("token");
    // 进行验证逻辑，根据实际情况判断登录状态
    if (token) {
      const flag = await validateToken(token);
      return flag;
    }
    return false;
    // 返回登录状态，true表示已登录，false表示未登录
  }; // 检查登录状态的函数

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 需要登录验证的路由
    if (await isAuthenticated()) {
      // 已登录
      next();
    } else {
      // 未登录，跳转到登录页
      next("/loginback");
    }
  } else {
    // 不需要登录验证的路由
    next();
  }
});




export default router;
