import { createApp } from "vue";
//引入清除默认样式
import "@/style/reset.scss";
import App from "@/App.vue";
//引入全局组件---顶部、底部
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";
import Login from "@/components/login/index.vue";
import Visitor from "@/components/visitor/index.vue";
//引入vue-router核心插件
import router from "@/router";
//引入ElementPlus插件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
//引入pinia仓库
import pinia from "@/store";
//引入路由鉴权的文件
import "./permission";

const app = createApp(App);
app.component("HospitalTop", HospitalTop);
app.component("HospitalBottom", HospitalBottom);
app.component("Login", Login);
app.component("Visitor", Visitor);
//安装router
app.use(router);
//安装ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
});
//安装pinia仓库
app.use(pinia);
app.mount("#app");
