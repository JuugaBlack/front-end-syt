import request from "@/utils/request";
import type {
  HospitalDetail,
  DeparmentResponseData,
  LoginData,
  UserLoginResponseData,
  WXLoginResponseData,
  HospitalWorkData,
  DoctorResponseData,
  UserResponseData,
  DoctorInfoData,
} from "./type";
//通过枚举管理医院模块的接口地址
enum API {
  HOSPITALDETAIL_URL = "/hosp/hospital/",
  //医院科室列表
  HOSPITALDEPARMENT_URL = "/hosp/hospital/department/",
  //获取短信验证码
  GETUSERCODE_URL = "/sms/send/",
  //用户登录接口
  USERLOGIN_URL = "/user/login",
  //获取微信扫码登陆的参数
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  //获取科室数据{page}/{limit}/{hoscode}/{depcode}
  BOOKING_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  //医生排班数据/hosp/hospital/auth/findScheduleList/{hoscode}/{depcode}/{workDate}
  HOSPITALDOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  //获取某个账号下就诊人信息GET /api/user/patient/auth/findAll
  GETUSER_URL = "/user/patient/auth/findAll",
  // 获取挂号医生的数据GET /api/hosp/hospital/getSchedule/{scheduleId}
  GETDOCTOR_URL = "/hosp/hospital/getSchedule/",
}

//获取医院详情的接口
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode);

//获取医院科室的接口
export const reqHospitalDeparment = (hoscode: string) =>
  request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);

//获取验证码的接口
export const reqCode = (phone: string) =>
  request.get<any, any>(API.GETUSERCODE_URL + phone);

//用户登录接口
export const reqUserLogin = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

//微信登录二维码接口
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WXLoginResponseData>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );

//预约挂号数据接口
export const reqHospitalBooking = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, HospitalWorkData>(
    API.BOOKING_URL + `${page}/${limit}/${hoscode}/${depcode}`
  );

//医生排版接口
export const reqHospitalDoctor = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`
  );

//获取某个账号下就诊人信息
export const reqGetUser = () =>
  request.get<any, UserResponseData>(API.GETUSER_URL);

//获取挂号医生的信息
export const reqGetDoctor = (scheduleId: string) =>
  request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId);
