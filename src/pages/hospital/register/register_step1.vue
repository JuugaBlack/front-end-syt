<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="deparment">>{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间展示日期的结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <class
          class="item"
          :class="{
            active: item.status == -1 || item.availableNumber == -1,
            cur: item.workDate == workTime.workDate,
          }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item)"
        >
          <div class="up">{{ item.workDate }} {{ item.dayOfWeek }}</div>
          <div class="down">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber == -1
                  ? "约满了"
                  : `有号(${item.availableNumber})`
              }}
            </div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </class>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="workData.total"
        v-model:currentPage="pageNo"
        @update:currentPage="handlePageChange"
      />
    </div>
    <!-- 底部展示医生的结构 -->
    <div class="bottom">
      <!-- 即将放号 -->
      <div class="will" v-if="workTime.status == 1">
        <span>2024年6月6日8：30</span>
        <span>放号</span>
      </div>
      <div class="doctor" v-else>
        <div class="morning">
          <div class="tip">
            <svg
              t="1717641617398"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3557"
              width="32"
              height="32"
            >
              <path
                d="M510.854034 0c-282.117236 0-510.850586 228.73335-510.850586 510.850586s228.73335 510.850586 510.850586 510.850586 510.850586-228.73335 510.850587-510.850586-228.73335-510.850586-510.850587-510.850586z m239.972063 362.831629l26.819656 27.458219-86.206036 84.034921-26.819656-27.458219 86.206036-84.034921zM491.952563 268.835121h38.441506V389.268147H491.952563v-120.433026z m-224.518833 83.779496l91.314542 93.357945-30.267897 29.629334-91.314542-93.357945 30.267897-29.629334z m9.706161 291.567972v5.363931H146.489854v-42.400598h130.522325v37.036667z m412.511849 11.749564h-362.703917c-1.404839-8.939885-2.043402-18.135196-2.043402-27.585932 0-101.020703 82.374657-183.523073 183.39536-183.523073 101.148416 0 183.523073 82.374657 183.523074 183.523073 0 9.323023-0.766276 18.518334-2.171115 27.585932z m46.742828-7.024196V606.379646H875.090502v42.528311H736.394568z"
                fill="#1296db"
                p-id="3558"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 上午医生信息 -->
          <div class="doctorInfo" v-for="doctor in morningArr" :key="doctor.id">
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>></span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)"
                >剩余 {{ doctor.availableNumber }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="afternoon">
          <div class="tip">
            <svg
              t="1717641640056"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4807"
              width="32"
              height="32"
            >
              <path
                d="M511.360799 0C228.961798 0 0 228.961798 0 511.360799s228.961798 511.360799 511.360799 511.360799 511.360799-228.961798 511.360799-511.360799S793.7598 0 511.360799 0zM154.942322 442.199251v-42.187266h129.757803v42.187266H154.942322z m120.169788 253.123595l-30.042447-29.403246 90.766542-92.811985 30.042447 29.403246-90.766542 92.811985zM536.673159 778.546816h-38.22422v-119.786267h38.22422V778.546816z m-21.988515-175.013233c-100.354557 0-182.427965-81.945568-182.427965-182.427965 0-9.332335 0.767041-18.408989 2.045443-27.357803h360.637204c1.406242 8.948814 2.045443 18.025468 2.045443 27.357803 0.12784 100.482397-81.817728 182.427965-182.300125 182.427965z m241.106617 81.562047l-85.652934-83.47965 26.590762-27.357803 85.652933 83.479651-26.590761 27.357802z m107.385768-242.129338H741.473159v-42.315106h138.067415v42.315106h-16.363545z"
                fill="#1296db"
                p-id="4808"
              ></path>
            </svg>
            <span class="afternoonText">下午号源</span>
          </div>

          <div
            class="doctorInfo"
            v-for="doctor in afternoonArr"
            :key="doctor.id"
          >
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>></span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)"
                >挂号 剩余 {{ doctor.availableNumber }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalBooking, reqHospitalDoctor } from "@/api/hospital";
import { DocArr, Doctor } from "@/api/hospital/type";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { HospitalWordData } from '@/api/hospital/type';
let pageNo = ref<number>(1);
let limit = ref<number>(6);
let workData = ref<any>({});
let $route = useRoute();
let $router = useRouter();
//存储排班日期
let workTime: any = ref({});
//存储医生排版数据
let doctorArr = ref<DocArr>([]);
//获取挂号数据
const fetchWorkData = async () => {
  let result: any = await reqHospitalBooking(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (result.data.code == 200) {
    workData.value = result.data.data;
    //存储第一天的数据
    workTime.value = workData.value.bookingScheduleList[0];
    //获取医生的数据
    getDoctorWorkData();
  }
};
onMounted(() => {
  fetchWorkData();
});
const handlePageChange = () => {
  fetchWorkData();
};
//获取医生排版数据
const getDoctorWorkData = async () => {
  //医院编号和科室编号在路由query参数中获取
  let hoscode: string = $route.query.hoscode as string;
  let depcode: string = $route.query.depcode as string;
  //时间
  let workDate: string = workTime.value.workDate;
  let result: any = await reqHospitalDoctor(hoscode, depcode, workDate);
  if (result.data.code == 200) {
    doctorArr.value = result.data.data;
  }
};
//点击某一天的回调
const changeTime = (item: any) => {
  //存储用户点击的时间
  workTime.value = item;
  //再发一次请求
  getDoctorWorkData();
};

//计算出上午排版的医生数据
let morningArr = computed(() => {
  return doctorArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0;
  });
});
//下午的医生
let afternoonArr = computed(() => {
  return doctorArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1;
  });
});
//路由跳转到选择就诊人
const goStep2 = (doctor: Doctor) => {
  $router.push({
    path: "/hospital/register_step2",
    query: { docId: doctor.id },
  });
};
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;

    .line {
      width: 1px;
      height: 20px;
      background: #7f7f7f;
      margin: 0px 5px;
    }

    .deparment {
      margin-left: 10px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;

    .time {
      font-weight: 900;
      color: #7f7f7f;
    }

    .container {
      display: flex;
      width: 100%;

      .item {
        flex: 1;
        border: 1px solid #55a6fe;
        margin: 10px 5px;
        cursor: pointer;
        transition: all 0.5s;
        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;

          .up {
            background: #ccc;
          }
        }

        &.cur {
          transform: scale(1.1);
        }

        .up {
          background: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }

        .down {
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }

  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      color: #55a6fe;
    }

    .doctor {
      .morning {
        .tip {
          display: flex;
          align-items: center;

          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }

        .doctorInfo {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;

          .left {
            .info {
              color: #55a6fe;

              span {
                margin: 0 3px;
                font-size: 18px;
                font-weight: 900;
              }
            }

            .skill {
              margin: 20px 0px;
              color: #7f7f7f;
              font-size: 16px;
            }
          }

          .right {
            width: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }

      .afternoon {
        .tip {
          display: flex;
          align-items: center;

          .afternoonText {
            color: #7f7f7f;
            font-weight: 900;
          }
        }

        .doctorInfo {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;

          .left {
            .info {
              color: #55a6fe;

              span {
                margin: 0 3px;
                font-size: 18px;
                font-weight: 900;
              }
            }

            .skill {
              margin: 20px 0px;
              color: #7f7f7f;
              font-size: 16px;
            }
          }

          .right {
            width: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>
