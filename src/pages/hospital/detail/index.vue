<template>
    <div class="detail">
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1717053007720" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2611" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="2612" fill="#515151"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="logo">
            <div class="left">
                <img :src="`data:images/jepg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`" alt="">
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1717056515752" class="icon" viewBox="0 0 1035 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2615" width="16" height="16">
                        <path
                            d="M1035.52 1024H0l74.56-448h123.2v64H128.96L75.52 960H960l-53.44-320h-68.8v-64h123.2l74.56 448zM517.76 448a128 128 0 1 1 128-128 128 128 0 0 1-128 128z m0-192a64 64 0 1 0 64 64 64 64 0 0 0-64-64z"
                            fill="#515151" p-id="2616"></path>
                        <path
                            d="M517.76 889.92L236.48 464A291.2 291.2 0 0 1 197.76 320a320 320 0 0 1 640 0A289.6 289.6 0 0 1 800 464c-18.88 29.12-256 385.6-256 385.6z m0-825.92a256 256 0 0 0-256 256 224 224 0 0 0 29.44 110.72l226.56 343.36c62.08-96 212.8-322.24 227.52-344.96a224 224 0 0 0 28.48-109.12 256 256 0 0 0-256-256z"
                            fill="#515151" p-id="2617"></path>
                    </svg>
                    <span>具体位置：{{hospitalStore.hospitalInfo.hospital?.param.fullAddress}}</span>
                </div>
                <div class="route">
                    规划路线：{{ hospitalStore.hospitalInfo.hospital?.route }}
                </div>
            </div>
        </div>
        <div class="footer">
            <h1>医院介绍</h1>
            <p>{{hospitalStore.hospitalInfo.hospital?.intro}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取医院详情仓库数据进行展示
import useDetaliStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetaliStore()
</script>

<style scoped lang="scss">
.detail {
    .top {
        display: flex;
        align-items: center;

        .name {
            font-size: 25px;
            font-weight: 900;
        }

        .level {
            color: #7f7f7f;
            margin-left: 10px;

            span {
                margin-left: 10px;
            }
        }
    }

    .logo {
        display: flex;
        margin-top: 10px;

        .left {
            width: 150px;

            img {
                width: 150px;
            }
        }

        .right {
            color: #7f7f7f;

            div {
                margin: 10px 5px;
            }
            .route{
                margin-left: 25px;
                line-height: 20px;
            }
            .address{
                span{
                    margin-left: 5px;
                }
            }
        }
    }

    .footer{
        margin-top: 10px;
        color: #7f7f7f;
        p{
            margin-top: 10px;
            line-height: 25px;
        }
    }
}
</style>