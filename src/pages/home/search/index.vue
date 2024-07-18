<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院名称"
      v-model="hosname"
      :trigger-on-focus="false"
      :fetch-suggestions="querySearch"
      @select="goDetail"
    />
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts" name="Search">
//引入element-plus提供的图标
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { reqHospitalInfo } from "@/api/home";

//创建路由器对象
let $router = useRouter();
//收集搜索的关键字
let hosname = ref<string>("");

//组件回调
const querySearch = async (keyword: string, cb: any) => {
  let result: any = await reqHospitalInfo(keyword);
  //整理数据,成组件需要的数据
  let showData = result.data.data.map(
    (item: { hosname: string; hoscode: string }) => {
      return {
        value: item.hosname,
        hoscode: item.hoscode,
      };
    }
  );
  cb(showData);
};

//点击推荐项
const goDetail = (item: any) => {
  //点击之后路由跳转到医院详情页/hospital，将来要携带query参数
  $router.push({
    path: "/hospital/register",
    query: { hoscode: item.hoscode },
  });
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  // 深度选择器：:deep()
  :deep(.el-input__wrapper) {
    width: 500px;
    margin-left: 350px;
    margin-right: 10px;
  }
  :deep(.el-button) {
    margin-right: 350px;
  }
}
</style>
