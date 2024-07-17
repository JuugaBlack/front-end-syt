<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <!-- 卡片，展示就诊人信息 -->
        <el-card style="max-width: 100%">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" :icon="User" @click="goUser">添加就诊人</el-button>
                </div>
            </template>
            <div class="user">
                <Visitor class="item" v-for="(user, index) in userArr" :key="user.id" :user="user"
                    @click="changeindex(index)" :index="index" :currentIndex="currentIndex" :showDelete="showDelete"/>
            </div>
        </el-card>
        <!-- 卡片，展示医生信息 -->
        <div class="doctorInfo">
            <el-card style="max-width: 100%">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>
                    </div>
                </template>
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期
                            </div>
                        </template>
                        {{ docInfo.workDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院
                            </div>
                        </template>
                        {{ docInfo.param?.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室
                            </div>
                        </template>
                        {{ docInfo.param?.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生姓名
                            </div>
                        </template>
                        {{ docInfo.docname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职称
                            </div>
                        </template>
                        {{ docInfo.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生专长
                            </div>
                        </template>
                        {{ docInfo.skill }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                服务费
                            </div>
                        </template>
                        <span>{{ docInfo.amount }}</span>
                    </el-descriptions-item>
                </el-descriptions>
                <div class="btn">
                    <el-button type="primary" :disabled="currentIndex == -1" @click="sumbitOrder">确认挂号</el-button>
                </div>
            </el-card>
        </div>


    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { reqGetUser, reqGetDoctor } from '@/api/hospital';
import { onMounted, ref } from 'vue';
import { UserArr } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import { reqSubmitOrder } from '@/api/user';
import { ElMessage } from 'element-plus';
let userArr = ref<UserArr>([])
let $route = useRoute()
let docInfo = ref<any>({})
//存储用户确认就诊人的索引值
let currentIndex = ref<number>(-1)
let $router = useRouter()
let showDelete = ref<boolean>(false)
onMounted(() => {
    fetchUserData()
    fetchDoctorData()
})
//获取就诊人信息
const fetchUserData = async () => {
    let result: any = await reqGetUser()
    if (result.data.code == 200) {
        userArr.value = result.data.data
    }
}
//获取医生信息
const fetchDoctorData = async () => {
    let result: any = await reqGetDoctor($route.query.docId as string)
    if (result.data.code == 200) {
        docInfo.value = result.data.data
    }
}

//点击就诊人子组件的回调
const changeindex = (index: number) => {
    //存储用户选中就诊人的索引值
    currentIndex.value = index
}

//确定挂号按钮的回调
const sumbitOrder = async () => {
    let hoscode = docInfo.value.hoscode
    let scheduleId = docInfo.value.id
    let patientId = userArr.value[currentIndex.value].id
    let result: any = await reqSubmitOrder(hoscode, scheduleId, patientId)
    if (result.data.code == 200) {
        $router.push({ path: '/user/order', query: { orderId: result.data.data } })
    } else {
        ElMessage({
            type: 'error',
            message: result.data.message
        })
    }
}

//添加就诊人按钮
const goUser = () =>{
    $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>



<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 23px;
        margin-bottom: 20px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user {
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;

        .item {
            width: 32%;
            margin: 5px 5px;
        }
    }

    .doctorInfo {
        margin: 10px 0;
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
}
</style>
