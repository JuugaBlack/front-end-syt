<template>
  <div class="container">
    <HospitalTop />
    <!-- 路由组件区域 -->
    <div class="content">
      <!-- 展示路由组件 -->
      <!-- <Home/> -->
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <Login />
  </div>
</template>

<script setup lang="ts">
// import Home from '@/pages/home/index.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 860px;
  }
  .bottom {
    width: 100%;
    height: 50px;
    background: blue;
  }
}
</style>
