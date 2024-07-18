//路由鉴权
//引入路游戏
import router from "./router";
//引入进度条
import Nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
import useUserStore from "./store/modules/user";
import pinia from "@/store";
//进度条加载的小圆球
Nprogress.configure({ showSpinner: false });
let userStore = useUserStore(pinia);

//存储用户未登录也可以访问的网址
let whiteList = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
];
//添加响应的全局守卫
//前置守卫
router.beforeEach((to, _from, next) => {
  //访问路由组件之前，进度条开始动
  Nprogress.start();
  //动态设置网页标题
  document.title = `尚医通-${to.meta.title}`;
  //涌段用户有是否登录--token
  let token = userStore.userInfo.token;
  if (token) {
    next();
  } else {
    //未登录
    if (whiteList.includes(to.path)) {
      next();
    } else {
      userStore.visiable = true;
      next({ path: "/home", query: { redirect: to.fullPath } });
    }
  }
});

//后置守卫
router.afterEach((_to, _from) => {
  //访问路由组件成功，进度条小时
  Nprogress.done();
});
