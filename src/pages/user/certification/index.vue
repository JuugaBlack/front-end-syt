<template>
  <!-- 实名认证组件 -->
  <el-card style="max-width: 100%" class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <div class="tip">
      <el-icon>
        <InfoFilled />
      </el-icon>
      <p>
        完成实名认证后才能添加就诊人，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <!-- 认证成功 v-if="userInfo.authStatus==1" -->
    <el-descriptions :column="1" border v-if="userInfo.authStatus == 1">
      <el-descriptions-item label="用户姓名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="证件类型">{{
        userInfo.certificatesType == "10" ? "身份证" : "户口本"
      }}</el-descriptions-item>
      <el-descriptions-item label="证件号码">{{
        userInfo.certificatesNo
      }}</el-descriptions-item>
    </el-descriptions>
    <!-- 未验证 v-if="userInfo.authStatus==0"-->
    <el-form
      :model="params"
      :rules="rules"
      v-if="userInfo.authStatus == 0"
      style="width: 80%; margin: 20px auto"
      label-width="80"
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          placeholder="请选择证件类型"
          v-model="params.certificatesType"
        >
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in arrType"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input
          placeholder="请输入证件号码"
          v-model="params.certificatesNo"
        ></el-input>
      </el-form-item>
      <!-- 上传证件 -->
      <el-form-item label="上传证件" prop="certificatesUrl" ref="form">
        <!-- actions上传图片的路径 limit照片数量限制 on-exceed超出数量的钩子 on-success	文件上传成功时的钩子-->
        <!-- on-preview预览的钩子 on-remove删除的钩子-->
        <el-upload
          action="/api/oss/file/fileUpload?fileHost=userAuah"
          list-type="picture-card"
          :on-exceed="exceedHandler"
          :on-success="successHandler"
          :on-preview="previewHandler"
          :on-remove="removeHandler"
          ref="upload"
          :limit="1"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>
        <!-- 放大镜 -->
        <el-dialog v-model="dialogVisible">
          <img
            w-full
            v-if="params.certificatesUrl"
            :src="params.certificatesUrl"
            style="width: 100%; height: 100%"
            alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重新编辑</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqCertificationType,
  reqUserCertification,
  reqUserInfo,
} from "@/api/user";
import {
  CertationArr,
  CertationTypeResponseData,
  UserInfoResponseData,
  UserParams,
} from "@/api/user/type";
import { InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive } from "vue";
let userInfo: any = ref<any>({});
let arrType = ref<CertationArr>([]);
//控制放大镜的显示与隐藏
let dialogVisible = ref<boolean>(false);
let upload = ref();
let form = ref();
// 手机用户表单认证的数据
let params = reactive<UserParams>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});
onMounted(() => {
  getUserInfo();
  //获取证件类型的接口
  getType();
});
//获取用户信息的方法
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqUserInfo();
  if (result.code == 200) {
    userInfo.value = result.data;
    console.log(userInfo.value);
  }
};
//获取证件类型的方法
const getType = async () => {
  let result: CertationTypeResponseData = await reqCertificationType();
  if (result.code == 200) {
    arrType.value = result.data;
  }
};

//超出数量的钩子
const exceedHandler = () => {
  ElMessage({ type: "error", message: "只能上传一张图片" });
};
//上传成功的钩子
const successHandler = (response: any) => {
  //图片上传成功，校验结果清楚
  form.value.clearValidate("certificatesUrl");
  //收集上传成功的图片地址 response服务器返回数据
  params.certificatesUrl = response.data;
};
//预览图片的钩子
const previewHandler = () => {
  dialogVisible.value = true;
};
//删除图片的钩子
const removeHandler = () => {
  params.certificatesUrl = "";
};

//重新编辑按钮的回调
const reset = () => {
  //清除文件上传列表
  upload.value.clearFiles();
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
};

//提交按钮的回调
const submit = async () => {
  //进行全部表单校验
  form.value.validate();
  try {
    //认证成功
    await reqUserCertification(params);
    ElMessage({ type: "success", message: "认证成功" });
    //认证成功之后再次获取用户信息
    getUserInfo();
  } catch (error) {
    ElMessage({ type: "error", message: "认证失败" });
  }
};

//自定义校验规则姓名的方法,rule为当前校验字段的校验规则对象,value文本内容,callback函数
const validateName = (value: any, callBack: any) => {
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的中文名"));
  }
};
//证件类型
const validateType = (value: any, callBack: any) => {
  if (value == "10" || value == "20") {
    callBack();
  } else {
    callBack(new Error("请选择正确的证件类型"));
  }
};
//证件号码校验规则
const validateNo = (value: any, callBack: any) => {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的身份证/户口本号"));
  }
};
//图片链接校验规则
const validateUrl = (value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传手持证件照照片"));
  }
};

//表单校验的规则对象
const rules = {
  //用户姓名的校验规则
  names: [
    {
      required: true,
      validator: validateName, //方法
    },
  ],
  certificatesType: [
    {
      required: true,
      validator: validateType, //方法
    },
  ],
  certificatesNo: [
    {
      required: true,
      validator: validateNo,
    },
  ],
  certificatesUrl: [
    {
      required: true,
      validator: validateUrl,
    },
  ],
};
</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
