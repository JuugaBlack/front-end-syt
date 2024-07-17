//引入二次封装的axios
import request from "@/utils/request";
import { AddOrUpdateUser, CertationTypeResponseData, OrderResponseData, PayReslt, QrCode, SubmitOrder, UserInfoResponseData,  UserParams } from "./type";
enum API{
    //创建订单POST /api/order/orderInfo/auth/submitOrder/{hoscode}/{scheduleId}/{patientId}
    SUBMITORDER_URL =  '/order/orderInfo/auth/submitOrder/',
    //订单详情 GET /api/order/orderInfo/auth/getOrderInfo/{id}
    ORDERINFO_URL= '/order/orderInfo/auth/getOrderInfo/',
    //取消预约 GET /api/order/orderInfo/auth/cancelOrder/{orderId}
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    //获取支付订单二维码  GET /api/order/weixin/createNative/{orderId}
    QRCODE_URL = '/order/weixin/createNative/',
    //查询支付状态GET /api/order/weixin/queryPayStatus/{orderId}
    PAYRESULT_URL = '/order/weixin/queryPayStatus/',
    //查询当前账号用户信息，是否登录GET /api/user/auth/getUserInfo
    USERINFO_URL = '/user/auth/getUserInfo',
    //获取证件的类型GET /api/cmn/dict/findByDictCode/{dictCode}
    CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
    //用户认证 POST /api/user/auth/userAuah
    USERCERTIFICATION_URL = '/user/auth/userAuah',
    //获取用户挂号订单的数据 GET /api/order/orderInfo/auth/{page}/{limit}
    USERORDERINFO_URL = '/order/orderInfo/auth/',
    //获取全部就诊人GET /api/user/patient/auth/findAll
    ALLUSER_URL = '/user/patient/auth/findAll',
    //获取订单状态
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
    //获取城市的数据GET /api/cmn/dict/findByParentId/{parentId}
    CITY_URL='cmn/dict/findByParentId/',
    //新增就诊人，没有id的POST /api/user/patient/auth/save
    ADDUSER_URL = 'user/patient/auth/save',
    //跟新就诊人接口PUT /api/user/patient/auth/update
    UPDATEUSER_URL = '/user/patient/auth/update',
    //删除就诊人 DELETE /api/user/patient/auth/remove/{id}
    DELETE_URL = '/user/patient/auth/remove/'
}

//创建订单
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:string) =>request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)

//订单详情
export const reqOrderInfo = (id:string) => request.get<any,OrderResponseData>(API.ORDERINFO_URL+id)

//取消订单
export const reqCancelOrder = (orderId:string) =>request.get<any,any>(API.ORDERCANCEL_URL+orderId)

//支付二维码
export const reqQrcode = (orderId:string) => request.get<any,QrCode>(API.QRCODE_URL+orderId)
//查询是否支付
export const reqQueryPayState = (orderId:string) => request.get<any,PayReslt>(API.PAYRESULT_URL+orderId)
//获取当前用户信息
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL)
//获取证件类型
export const reqCertificationType = (CertificatesType='CertificatesType')=> request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+CertificatesType)
//用户认证
export const reqUserCertification = (data:UserParams) => request.post<any,any>(API.USERCERTIFICATION_URL+data)
//用户挂号订单的分页列表
export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string) => request.get<any,any>(API.USERORDERINFO_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
//获取全部就诊人
export const reqAllUser = () => request.get<any,any>(API.ALLUSER_URL)
//获取所有订单状态
export const reqOrderState = () => request.get<any,any>(API.ORDERSTATE_URL)
//获取城市数据
export const reqCity = (parentId:string) => request.get<any,any>(API.CITY_URL+parentId)
//新增与修改就诊人接口方法
export const reqAddOrUpdateUser = (data:AddOrUpdateUser) => {
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any,any>(API.ADDUSER_URL+data)
    }
}
//删除就诊人
export const reqRemoveUser = (id:number) => request.delete<any,any>(API.DELETE_URL+id)