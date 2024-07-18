<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          v-for="level in levelArr"
          :class="{ active: activeFlag == level.value }"
          :key="level.value"
          @click="changeLevel(level.value)"
        >
          {{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="Level">
import { reqHospitalLevelAndRegion } from "@/api/home";
import type { HospitalLevelAndRegionArr } from "@/api/home/type";
import { onMounted, ref } from "vue";
// import { HospitalLevelAndRegionResponseData } from '@/api/home/type';
let levelArr = ref<HospitalLevelAndRegionArr>([]);
//医院等级高亮
let activeFlag = ref<string>("");
onMounted(() => {
  getLevel();
});
const getLevel = async () => {
  let result: any = await reqHospitalLevelAndRegion("HosType");
  if (result.data.code == 200) {
    levelArr.value = result.data.data;
  }
};

function changeLevel(level: string) {
  activeFlag.value = level;
  //触发自定义事件，将医院等级参数传给父组件
  $emit("getLevel", level);
}

let $emit = defineEmits(["getLevel"]);
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 15px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
