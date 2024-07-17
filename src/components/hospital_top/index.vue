<template>
    <div class="top">
        <div class="content">
            <!-- 左侧 -->
            <div class="left" @click="goIndex">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <!-- 如果有用户名，就显示用户名，没有的话显示登录/注册 -->
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{userStore.userInfo.name}}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue'
let userStore = useUserStore()
let $router = useRouter()
//点击之后回到首页
const goIndex = () => {
    $router.push({ path: '/home' })
}
//点击登录按钮，弹出dialog
const login = () => {
    userStore.visiable = true
}
//退出登录按钮
const logout = () => {
    userStore.logout()
    $router.push({path:'/home'})
}
//下拉菜单路由跳转
const goUser = (path:string) =>{
    $router.push({path:path})
}
</script>

<style scoped lang="scss">
.top {
    position: fixed; //固定位置
    z-index: 999; //z-index 属性设置元素的堆叠顺序
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex; //弹性盒子
    justify-content: center; //居中

    .content {
        width: 1200px;
        height: 70px;
        background: white;
        display: flex;
        justify-content: space-between; //两端对齐，元素之间的间隔相等

        .left {
            display: flex;
            justify-content: center;
            align-items: center; //垂直居中
            cursor: pointer;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            font-weight: 600;
            color: #bbb;
            cursor: pointer;
            .help {
                margin-right: 10px;
                cursor: pointer;
            }

            .login {
                cursor: pointer;
            }
        }
    }
}
</style>