<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 医院详情</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item
          index="/hospital/register"
          @click="changeActive('/hospital/register')"
        >
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/detail"
          @click="changeActive('/hospital/detail')"
        >
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/notice"
          @click="changeActive('/hospital/notice')"
        >
          <el-icon><InfoFilled /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/close"
          @click="changeActive('/hospital/close')"
        >
          <el-icon><message /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/search"
          @click="changeActive('/hospital/search')"
        >
          <el-icon><search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区：路由组件展示位置 -->
    <div class="content">
      <!-- 子组件 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Message,
  InfoFilled,
  Search,
  HomeFilled,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import useDetaliStore from "@/store/modules/hospitalDetail";
//获取仓库对象
let detailStore = useDetaliStore();
//获取路由器
let $router = useRouter();
//获取当前路由信息
let $route = useRoute();
//左侧菜单点击事件回调
const changeActive = (path: string) => {
  $router.push({ path, query: { hoscode: $route.query.hoscode } });
};
//组件挂载完毕后通知pinia仓库发请求获取医院详情，存储到仓库中
onMounted(() => {
  detailStore.getHospital($route.query.hoscode as string);
  //获取科室数据
  detailStore.getDeparment($route.query.hoscode as string);
});
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      color: #7f7f7f;
      margin-bottom: 10px;
    }
    flex: 2;
  }
  .content {
    flex: 8;
  }
}
</style>
