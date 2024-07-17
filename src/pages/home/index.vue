<template>
  <div>
    <!-- 首页轮播图组件 -->
    <Carousel />
    <!-- 首页搜索医院表单组件 -->
    <Search />
    <!-- 展示医院的组件 -->
    <el-row gutter="20">
      <el-col :span="20">
        <Level  @getLevel="getLevel"/> <!-- 等级组件 -->
        <Region @getRegion="getRegion"/> <!-- 地区组件 -->
        <div class="hospital"  v-if="hasHospitalArr.length > 0">
          <!-- 医院组件 -->
          <!-- <Card class="item" v-for="item in 10" :key="item" /> -->
          <Card 
          class="item" 
          v-for="(item,index) in hasHospitalArr" 
          :key="index" 
          :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器组件 -->
        <el-pagination 
        v-model:current-page="pageNo" 
        v-model:page-size="pageSize" 
        :page-sizes="[10, 20, 30, 40]"
        :background="true" 
        layout="prev, pager, next, jumper,total " 
        :total="total" 
        @current-change="currentChange"/>
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Search">
import { onMounted, ref } from 'vue'
import { reqHospital } from '@/api/home'
//引入轮播图组件
import Carousel from '@/pages/home/carousel/index.vue'
import Search from '@/pages/home/search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import Tip from '@/pages/home/tip/index.vue'
import type { Content } from '@/api/home/type'
//分页器需要的数据
//分页器当前页码
let pageNo = ref<number>(1)
//一页展示几条数据
let pageSize = ref<number>(10)
//存储已有的医院数据
let hasHospitalArr = ref<Content>([])
//存储医院总个数
let total = ref<number>(0)
//存储子组件传递的医院等级\地区的响应式数据
let hostype = ref<string>('')
let districtCode = ref<string>('')
const getHospitalInfo = async() => {
  //获取医院数据，默认获取第一页，一页10个医院的数据
  let result:any = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value) 
  if(result.data.code == 200)
  {
    hasHospitalArr = result.data.data.content
    total.value = result.data.data.totalElements
  }
}
//组件挂在完毕，发一次请求
onMounted(() => {
  getHospitalInfo()
})
//el-pagination分页器页码发生变化时的回调
const currentChange = () =>{
  getHospitalInfo()
}

//子组件自定义事件，获取子组件Level的等级信息
const getLevel = (level:string)=>{
  //收集等级参数
  hostype.value = level
  //再次发请求
  getHospitalInfo()
}

//子组件自定义事件，获取子组件Region的地区信息
const getRegion = (region:string) =>{
  //收集地区数据
  districtCode.value = region
  //再发一次请求
  getHospitalInfo()
}
</script>


<style lang="scss" scoped>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0px;
    cursor: pointer;
  }
}
</style>
