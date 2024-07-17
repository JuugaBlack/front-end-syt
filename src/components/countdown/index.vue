<template>
  <div>
    <span>获取验证码({{ time }}s)</span>
  </div>
</template>

<script setup lang="ts">
import {ref,watch} from 'vue'
let time = ref<number>(5)
let prop = defineProps(['countFlag'])
let $emit = defineEmits(['getFlag'])
//监听父组件的prop
watch(()=>prop.countFlag,()=>{
    //开启定时器
    let timer =  setInterval(()=>{
        time.value -- 
        if ( time.value == 0){
            //通知父组件
            $emit('getFlag',false)
            clearInterval(timer)
        }
    },1000)
},{
    immediate:true
})


</script>
<style scoped>
</style>
