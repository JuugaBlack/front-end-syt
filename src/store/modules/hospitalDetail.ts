import { defineStore } from "pinia"
import { reqHospitalDeparment, reqHospitalDetail } from "@/api/hospital"
import type { HospitalDetail} from "@/api/hospital/type"
import type { DetailState } from "./interface"
//pinia仓库写法：组合式API、选择式API写法
const useDetaliStore = defineStore('Detail',{
    state:():DetailState => {
        return{
            //医院详情数据
            hospitalInfo : ({} as HospitalDetail),
            //科室数据
            deparmentArr : []
        }
    },
    actions:{
        async getHospital(hoscode:string){
            let result:HospitalDetail = await reqHospitalDetail(hoscode)
            if(result.data.code == 200 ){
                this.hospitalInfo = result.data.data
            }
        },
        //获取科室的数据
        async getDeparment(hoscode:string){
            let result = await reqHospitalDeparment(hoscode)
            if(result.data.code == 200) {
                this.deparmentArr = result.data.data
            }
        }
    },
    getters:{

    }
})

//对外暴露获取该仓库的方法
export default useDetaliStore