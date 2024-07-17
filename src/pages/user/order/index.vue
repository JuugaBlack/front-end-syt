<template>
    <div>
      <div v-if="$route.query.orderId">
        <Detail />
      </div>
      <div v-else>
        <All />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  //引入子组件
  import Detail from '@/pages/user/order/detail/index.vue'
  import All from '@/pages/user/order/allOrder/index.vue'
  let $route = useRoute()

  </script>
  <style scoped>
  </style>
  