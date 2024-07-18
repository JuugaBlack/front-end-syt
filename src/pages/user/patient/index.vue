<template>
  <el-card style="max-width: 100%">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
      </div>
    </template>
    <div class="visitors" v-if="scene == 0">
      <Visitor 
      class="item" 
      v-for="(user, index) in userArr" 
      :key="user.id" :user="user" :index="index"
      :showDelete="showDelete" @changeScene="changeScene" 
      @removeUser = "removeUser"/>
    </div>
    <!-- 添加或者修改就诊人 -->
    <div class="form" v-if="scene == 1" >
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 80%;margin: 10px auto" label-width="80px">
        <el-form-item label="用户姓名" >
          <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" >
          <el-select placeholder="请选择证件类型" v-model="userParams.certificatesType">
            <el-option 
              v-for="item in certationArr" 
              :key="item.id" 
              :label="item.name" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"</el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group  v-model="userParams.sex">
            <el-radio value="1">男</el-radio>
            <el-radio value="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker 
            v-model="userParams.birthdate" 
            type="datetime" 
            value-format="YYYY-MM-DD"
            placeholder="请选择出生日期" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left">建档信息(完善后部分医院首次就诊不用排队建档)</el-divider>
      <el-form style="width: 80%;margin: 10px auto" label-width="80px">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio value="1">已婚</el-radio>
            <el-radio value="2">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio value="1">自费</el-radio>
            <el-radio value="2">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader :props="props" v-model="userParams.addressSelected" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请输入详细地址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>

      <el-divider content-position="left">紧急联系人信息(选填)</el-divider>
      <el-form style="width: 80%;margin: 10px auto;" label-width="80px">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" v-model="userParams.contactsCertificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="" @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { reqGetUser } from '@/api/hospital';
import { onMounted, reactive, ref,watch } from 'vue';
import { UserArr } from '@/api/hospital/type';
import { reqAddOrUpdateUser, reqCertificationType, reqCity } from '@/api/user';
import { AddOrUpdateUser, CertationArr } from '@/api/user/type';
import { CascaderProps, ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
let userArr = ref<UserArr>([])
//决定卡片展示的内容
let scene = ref<number>(0)
let showDelete = ref<boolean>(true)
let certationArr = ref<CertationArr>([])
let $route = useRoute()
let $router = useRouter()
//收集新增就诊人信息
let userParams = reactive<any>({
    name: null,
    certificatesType: '',
    certificatesNo:'',
    sex:0,
    birthdate:'',
    phone:'',
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:'',
    contactsName:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    contactsPhone:''
})
onMounted(() => {
  //获取就诊人信息
  getAllUser()
  //获取证件类型数据
  getCertificationType()
  //判断当前路由组件是不是从挂号组件来【路径上携带query，type为add】
  if($route.query.type == 'add'){
    scene.value= 1
  }
  if($route.query.type == 'edit'){
    scene.value= 1

  }
})
const getAllUser = async () => {
  let result: any = await reqGetUser()
  if (result.code == 200) {
    userArr.value = result.data
  }
}
//添加就诊人按钮回调
const addUser = () => {
  //情况上次的数据
  reset()
  scene.value = 1
}

//就诊人子组件的回调
const changeScene = (user:AddOrUpdateUser) => {
  scene.value = 1
  //收集已有的信息
  Object.assign(userParams,user)
}

//清空表单
const reset = () => {
  Object.assign(userParams,{
    name: '',
    certificatesType: '',
    certificatesNo:'',
    sex:0,
    birthdate:'',
    phone:'',
    isMarry:0,
    isInsure:0,
    addressSelected:[],
    address:'',
    contactsName:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    contactsPhone:''
})
}

//获取证件类型
const getCertificationType = async() => {
  let result:any =  await reqCertificationType()
  console.log(result)
  if(result.code == 200){
    certationArr.value = result.data
  }
}

//级联选择器数据
const props:CascaderProps = {
  lazy:true,
  async lazyLoad(node, resolve) {
    let result:any = await reqCity(node.data?.id as string || '86')
    //整理数据
    let showData = result.data.map((item:any) => ({
        id:item.id,
        label:item.name,
        value:item.value,
        leaf:!item.hasChildren
      }))
    //注入组件需要展示的数据
    resolve(showData)
  },
}

//提交按钮的回调
const submit = async() => {
  try{
    let result = await reqAddOrUpdateUser(userParams)
    console.log(result)
    ElMessage({type:'success',message:userParams.id?'更新成功':'新增成功'})
    //切换场景
    if($route.query.type=='add'||$route.query.type=='edit'){
      $router.back()
    }else{
      scene.value = 0
    }
    getAllUser()
  }catch(error){
    ElMessage({type:'error',message:userParams.id?'更新失败':'新增失败'})
  }
}

//监听全部就诊人的数据
watch(()=>userArr.value,()=>{
  if($route.query.type == 'edit'){
    let user = userArr.value.find((item:any)=>{
      return item.id == $route.query.id
    })
    Object.assign(userParams,user)
  }
})

//子组件的自定义事件：删除按钮的触发
const removeUser = () =>{
  getAllUser()
}
</script>


<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visitors {
  display: flex;
  flex-wrap: wrap;

  .item {
    // flex: 32%;
    width: 32%;
    margin: 5px;
  }
}
</style>