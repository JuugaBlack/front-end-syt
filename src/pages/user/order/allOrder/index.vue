<template>
    <div>
        <el-card style="max-width: 100%">
            <template #header>
                <div class="card-header">
                    <span>挂号订单</span>
                </div>
            </template>
            <!-- 下拉菜单 -->
            <el-form :inline="true">
                <el-form-item label="就诊人"   style="width: 300px;">
                    <el-select  v-model="patientId" @change="changeUser" placeholder="请选择就诊人">
                        <el-option label="全部就诊人" value=""></el-option>
                        <el-option 
                            v-for="user in allUser" 
                            :key="user.id" 
                            :label="user.name" 
                            :value="user.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态" style="width: 300px;">
                    <el-select  @change="changeOrderState" placeholder="请选择订单状态" v-model="orderStatus">
                        <el-option label="全部订单" value=""></el-option>
                            <el-option 
                            v-for="(item,index) in allState" 
                            :key="index" 
                            :label="item.comment"
                            :value="item.status">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 表单 -->
            <el-table border style="margin: 10px 0 ;" :data="allOrderArr">
                <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
                <el-table-column label="就诊医院" prop="hosname"></el-table-column>
                <el-table-column label="就诊科室" prop="depname"></el-table-column>
                <el-table-column label="医生" prop="title"></el-table-column>
                <el-table-column label="服务费" prop="amount"></el-table-column>
                <el-table-column label="就诊人" prop="patientName"></el-table-column>
                <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row}">
                        <el-button type="text" @click="goDetail(row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
                <!-- 分页器 -->
                <el-pagination 
                v-model:current-page="pageNo" 
                v-model:page-size="pageSize" 
                :page-sizes="[10, 20, 30, 40]"  
                layout=" prev, pager, next, jumper, -> , sizes,total" 
                @current-change = "getOrderInfo"
                @size-change = "handler"
                :total="total"/>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {reqAllUser, reqOrderState, reqUserOrderInfo} from '@/api/user'
import { AllOrderState, AllUser, Records } from '@/api/user/type';
import { useRouter } from 'vue-router';
let pageNo = ref<number>(0)
let pageSize = ref<number>(10)
let patientId = ref<string>('')
let orderStatus = ref<string>('')
let allOrderArr = ref<Records>([])
let total = ref<number>(0)
let $router = useRouter()
//就诊人和订单状态
let  allUser = ref<AllUser>([])
let allState = ref<AllOrderState>([])
onMounted(()=>{
    getOrderInfo()
    //就诊人和订单状态
    getData()
})
//获取挂号订单分页数据的方法
const getOrderInfo = async(pager:number=1) => {
    pageNo.value = pager
    let result:any = await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
    if(result.data.code == 200) [
        allOrderArr.value = result.data.data.records,
        total.value = result.data.data.total
    ]
}
//点击详情按钮的回调
const goDetail = (row:any) => {
    $router.push({path:'/user/order',query:{orderId:row.id}})
}

//分页器组件当前页码的回调
// const handler = (pager:number) =>{
//     pageNo.value = pager
//     getOrderInfo()
// }

//分页器下拉菜单的回调
const handler = (pageSizes:number) =>{
    pageSize.value = pageSizes
    getOrderInfo()
}

//获取就诊人和订单状态的方法
const getData = async() =>{
    const result:any = await reqAllUser()
    const result1:any = await reqOrderState()
    if (result.data.code ==200){
        allUser.value= result.data.data
    }
    if(result1.data.code == 200){
        allState.value = result1.data.data
    }
}

//就诊人下拉菜单回调方法
const changeUser = () =>{
    //根据就诊人的id再次获取挂号订单的数据
    //就诊人id绑定在了select上
    getOrderInfo()
} 

//订单状态下拉菜单回调
const changeOrderState = () =>{
    getOrderInfo()
}
</script>
<style scoped></style>