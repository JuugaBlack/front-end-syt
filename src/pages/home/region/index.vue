<template>
  <div class="region">
    <div class="content">
        <div class="left">地区：</div>
        <ul>
            <li :class="{active:RegionFlag == ''}"  @click="changeRegion('')">全部</li>
            <li 
            v-for="region in regionArr" 
            :key="region.value"
            @click="changeRegion(region.value)"
            :class="{active:RegionFlag == region.value}">
            {{region.name}}
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="Region">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { HospitalLevelAndRegionArr } from '@/api/home/type';
import { onMounted, ref } from 'vue';
let regionArr = ref<HospitalLevelAndRegionArr>([])
onMounted(()=>{
    getRegion()
})
const getRegion= async() =>{
    let result:any = await reqHospitalLevelAndRegion("Beijin")
    if(result.data.code==200){
        regionArr.value = result.data.data
    }
}
//地区高亮的响应式数据
let RegionFlag = ref<string>('')
function changeRegion(region:string){
    RegionFlag.value = region
    //将地区数据传给父组件
    $emit('getRegion',region)
}

//触发自定义事件
let $emit = defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 59px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>
