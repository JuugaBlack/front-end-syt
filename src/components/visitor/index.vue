<template>
  <div class="visitor">
    <!-- 就诊人组件 -->
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 1 ? "医保" : "自费" }}</span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button
          circle
          type="primary"
          :icon="Edit"
          @click="handler"
        ></el-button>
        <el-popconfirm
          :title="`确定要删除${user.name}的信息吗?`"
          width="250px"
          @confirm="removeUser"
        >
          <template #reference>
            <el-button
              circle
              type="danger"
              :icon="Delete"
              v-if="showDelete"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTypeString }}</p>
      <p>证件号码：{{ user.certificatesNo }}</p>
      <p>用户性别：{{ user.sex == 0 ? "女" : "男" }}</p>
      <p>出生日期：{{ user.birthday }}</p>
      <p>手机号码：{{ user.phone }}</p>
      <p>婚姻状况：{{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
      <p>当前住址：{{ user.param.cityString }}</p>
      <p>详细地址：{{ user.param.fullAddress }}</p>
      <!-- 已选择效果 -->
      <div class="confirm" v-if="index === currentIndex">已选择</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqRemoveUser } from "@/api/user";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();
//接受父组件就诊人信息
let props = defineProps(["user", "index", "currentIndex", "showDelete"]);
let $emit = defineEmits(["changeScene", "removeUser"]);
const handler = () => {
  //就诊人模块 和  预约挂号点击
  if ($route.path == "/user/patient") {
    $emit("changeScene", props.user);
  } else {
    //路由跳转携带参数
    $router.push({
      path: "/user/patient",
      query: { type: "edit", id: props.user.id },
    });
  }
};

//删除某个用户
const removeUser = async () => {
  try {
    await reqRemoveUser(props.user.id);
    ElMessage({ type: "success", message: "删除成功" });
    $emit("removeUser");
  } catch (error) {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 20%;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 10px;
    p {
      line-height: 25px;
      margin-left: 30px;
    }
    .confirm {
      position: absolute;
      width: 150px;
      height: 150px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 150px;
      left: 20%;
      top: 20%;
      opacity: 0.2;
      transform: rotate(45deg);
      font-weight: 900;
    }
  }
}
</style>
