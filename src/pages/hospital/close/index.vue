<template>
  <div>
    <div class="info">
      <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetaliStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetaliStore();
</script>

<style scoped lang="scss">
.info {
  h1 {
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    font-weight: 900;
  }
}
</style>
