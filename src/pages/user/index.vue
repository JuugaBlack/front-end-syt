<template>
  <div class="user">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 会员中心</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/user/certification"
          @click="goUser('/user/certification')"
        >
          <el-icon><Avatar /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="goUser('/user/order')">
          <el-icon><Histogram /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="goUser('/user/patient')">
          <el-icon><Operation /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
          <el-icon><InfoFilled /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
          <el-icon><Comment /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧会员中心二级路由组件区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Histogram,
  Avatar,
  Operation,
  Comment,
  InfoFilled,
  HomeFilled,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
let $router = useRouter();
let $route = useRoute();
const goUser = (path: string) => {
  $router.push({ path: path });
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  .top {
    color: #7f7f7f;
    margin-bottom: 10px;
  }
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    flex: 8;
  }
}
</style>
