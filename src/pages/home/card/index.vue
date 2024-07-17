<template>
  <div>
    <el-card style="max-width: 480px" shadow="hover" @click="goDetail">
        <div class="content">
            <div class="left">
                <div class="hospital_name">
                    {{ hospitalInfo.hosname }}
                </div>
                <div class="tip">
                    <div class="level">
                        <svg t="1716814951802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2800" width="16" height="16"><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="2801" fill="#bfbfbf"></path></svg>    
                        <span>{{ hospitalInfo.hostypeString }}</span>     
                    </div>
                    <div class="time">
                        <svg t="1716814993432" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4001" width="16" height="16"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM533.333333 362.666667a21.333333 21.333333 0 0 0-42.666666 0v170.666666a21.333333 21.333333 0 0 0 6.250666 15.082667l128 128a21.333333 21.333333 0 0 0 30.165334-30.165333L533.333333 524.501333V362.666667z" fill="#8a8a8a" p-id="4002"></path></svg>
                        <span>每天{{ hospitalInfo.bookingRule?.releaseTime }}放号</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="" />            </div>
        </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Card">
import { useRouter } from 'vue-router';
let $router = useRouter()  //获取路由器对象
//接收父组件传过来的props
let props = defineProps(['hospitalInfo'])
//点击医院卡片跳转到医院详情页
const goDetail = () =>{
    $router.push({path:'/hospital/register',query:{hoscode:props.hospitalInfo.hoscode}})
}
</script>


<style scoped lang="scss">
.content{
    display: flex;
    justify-content: space-between;
    .left{
        width: 60%;
        .tip{
            color: #7f7f7f;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .level,.time{
                display: flex;
                align-items: center;
                span{
                    margin-left: 5px;
                }
            }
        }
    }
    .right{
        img{
            width: 50px;
            height: 50px;
        }
    }
}
</style>
