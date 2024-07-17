//定义用户相关的pina仓库
import { reqCode,reqUserLogin } from "@/api/hospital";
import { LoginData} from "@/api/hospital/type";
import { defineStore } from "pinia";
import { GET_TOKEN,REMOVE_TOKEN,SET_TOKEN } from "@/utils/user";

const useUserStore = defineStore('User',{
    state:() => {
        return{
            visiable : false,  //用于控制登陆dialog的显示/隐藏
            code:'', //存储验证码
            userInfo:JSON.parse(GET_TOKEN() as string) || {} //存储用户信息
        }   
    },
    actions:{
        //获取验证码的方法
        async getCode(phone:string){
            let result:any = await reqCode(phone)
            if(result.data.code == 200){
                this.code = result.data.data
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },

        //用户手机号码登录的方法
        async userLogin(loginParam:LoginData){
            let result:any =  await reqUserLogin(loginParam)
            if(result.data.code == 200){
                this.userInfo = result.data.data
                //本地存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo)) 
                //返回成功的Promise
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },

        //退出登录方法
        logout(){
            this.userInfo = {name:'',code:''}  //清空仓库数据
            REMOVE_TOKEN()  //清空本地存储数据
        },
        //查询微信扫码结果（看本地存储是否存储数据）
        queryState(){
            //开启定时器，每隔一段时间，问本地存储是否有用户信息
            let timer = setInterval(()=>{
                //本地存储有数据。扫码成功
                if(GET_TOKEN()){
                    //关闭对话框
                    this.visiable = false
                    this.userInfo = JSON.parse(GET_TOKEN() as string)
                    clearInterval(timer)
                }
            },1000)
        }
    },
    getters:{

    }
})

export default useUserStore