<template>
  <div>
    <el-card style="max-width: 100%" class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号详情</span>
        </div>
      </template>
      <!-- 订单--顶部 -->
      <div class="top">
        <!-- 左侧标签 -->
        <el-tag type="success">
          <div class="tag">
            <el-icon><Select /></el-icon>
            <span class="success">{{
              orderInfo.param?.orderStatusString
            }}</span>
          </div>
        </el-tag>
        <!-- 右侧 -->
        <div class="right_info">
          <img src="../../../../assets/images/code_login_wechat.png" alt="" />
          <div>
            <p>微信 关注“北京医院预约挂号”</p>
            <p>快速预约挂号</p>
          </div>
        </div>
      </div>
      <!-- 订单 底部 -->
      <div class="bottom">
        <div class="left">
          <!-- 左侧展示订单信息 -->
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">服务费</div>
              </template>
              {{ orderInfo.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div
            class="btn"
            v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
          >
            <el-popconfirm title="确定取消预约?" @confirm="cancelOrder">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button
              type="primary"
              v-if="orderInfo.orderStatus == 0"
              @click="openDialog"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right">
          <el-card style="max-width: 100%" class="card">
            <template #header>
              <div>
                <span>注意事项</span>
              </div>
            </template>
            <p>
              1.请确认就诊人信息是否准确，若填写错误将无法就诊，损失由本人承担；
            </p>
            <p>
              2.可以预约一周内的号源，即本周五可以预约下一周全部工作日的号源；
            </p>
            <p>
              3.【取号】就诊当天上午号需要在10:30点前取号，下午号需要在16:00前取号，未取号视为爽约，该号不退不换；
            </p>
            <p>
              4.【退号】未就诊可以提前一天取消预约；就诊当天未取号可以在窗口取消预约；已取号凭挂号单在窗口办理退号退费，逾期将不可办理退号退费；
            </p>
            <p>
              5．3个月内连续3次预约后不就诊也不取消预约将被限制无法再次预约。
            </p>
          </el-card>
        </div>
      </div>
    </el-card>
    <!-- 支付二维码 通过v-model控制显示与隐藏-->
    <el-dialog
      v-model="dialogVisible"
      @close="close"
      title="微信支付"
      width="400"
    >
      <!-- 二维码 -->
      <div class="qrocode">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <el-button @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Select } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import {
  reqCancelOrder,
  reqOrderInfo,
  reqQrcode,
  reqQueryPayState,
} from "@/api/user";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
//s引入生成二维码插件QRcode
//@ts-ignore
import QrCode from "qrcode";
let $route = useRoute();
let orderInfo = ref<any>({});
//控制支付二维码显示与隐藏的数据
let dialogVisible = ref<boolean>(false);
//存储二维码图片路径
let imgUrl = ref<string>("");
//存储定时器
let timer = ref<any>();
onMounted(() => {
  getOrderInfo();
});
//获取预约订单详情
const getOrderInfo = async () => {
  let result: any = await reqOrderInfo($route.query.orderId as string);
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};
//取消预约 orderStatus有三种：-1取消、0预约未支付、1支付成功
const cancelOrder = async () => {
  try {
    //取消订单成功
    await reqCancelOrder($route.query.orderId as string);
    //再次获取订单详情的数据
    getOrderInfo();
  } catch (error) {
    ElMessage({ type: "error", message: "取消预约失败" });
  }
};
//点击支付按钮的回调
const openDialog = async () => {
  dialogVisible.value = true;
  //发请求获取二维码
  let result: any = await reqQrcode($route.query.orderId as string);
  //根据服务器返回的二维码信息生成二维码图片
  imgUrl.value = await QrCode.toDataURL(result.data.codeUrl);
  //询问服务器交易支付结果,隔几秒
  timer.value = setInterval(async () => {
    let result: any = await reqQueryPayState($route.query.orderId as string);
    if (result.data) {
      //关闭对话框
      dialogVisible.value = false;
      //提示信息
      ElMessage({ type: "success", message: "支付成功" });
      clearInterval(timer.value);
      //再次获取订单详情数据
      getOrderInfo();
    }
  }, 2000);
};
//关闭二维码的回调
const closeDialog = () => {
  dialogVisible.value = false;
  clearInterval(timer.value);
};
//对话框右上角关闭的回调
const close = () => {
  clearInterval(timer.value);
};
</script>

<style scoped lang="scss">
.box-card {
  .card-header {
    color: #7f7f7f;
    font-weight: 900;
    font-size: 18px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;

      .success {
        margin-left: 5px;
        font-weight: 800;
      }
    }

    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      p {
        font-size: 13px;
        margin: 5px 5px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left {
      flex: 4;

      .btn {
        margin-top: 10px;
      }
    }

    .right {
      flex: 6;

      .card {
        margin-left: 20px;

        p {
          font-size: 15px;
          margin: 5px 0px;
          line-height: 21px;
        }
      }
    }
  }
}

:deep(.el-dialog__body) {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.qrocode {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    line-height: 20px;
  }
}
</style>
