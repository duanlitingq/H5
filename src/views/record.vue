<template>
    <div class="record">

        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="orders()" alt="">
            <div class="title">申请记录</div>
        </div>
        <!--循环开始-->
        <div class="center">
            <!--白色区域内容-->
            <div class="eac_cen">
                <div class="cen_list">
                    <div>提现金额:<span>¥{{detail.amountOfMoney}}</span></div>
                    <div>收款银行:<span>{{detail.bankName}}</span></div>
                    <div>开户行:<span>{{detail.branchBankName}}</span></div>
                    <div>卡号:<span>{{detail.bankCard}}</span></div>
                    <div>收款人:<span>{{detail.receiveName}}</span></div>
                    <div>手机号:<span>{{detail.phone}}</span></div>
                    <div>申请时间:<span>{{detail.createTime}}</span></div>
                </div>
            </div>
            <!--价格列表-->
            <div class="price_lsit">
                <div class="price"><span>&nbsp;&nbsp;&nbsp;</span></div>
                <div class="price_btn">
                    <div class="btn_i" v-if="detail.status == 2">已通过</div>
                    <div class="btn_o" v-if="detail.status == 1">待审批</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "orderlist",
        data() {
            return {
                address: "",
                detail: "",
                id: "",
                preRouter:"",
                supplierId:"",
            }
        },
        mounted() {
            let that = this;
            let preRouter = that.$route.query.preRouter;
            let id = that.$route.query.id;
            let supplierId = that.$route.query.supplierId;
            that.id = id;
            that.preRouter = preRouter;
            that.supplierId = supplierId;
            // //请求数据
            console.log('订单详情页面:===========>', id)
            that.$fetch(apiUrl + '/page/supplier/wallet/getApplyDetail', {"id": id})
                .then((response) => {
                    if (response.success) {

                        that.detail = response.data[1];
                        console.log(this.detail,'查询成功！！！')
                    } else {
                        console.log("查询失败!!!")
                    }
                })
        },
        methods: {
            orders() {
                let preRouter = this.preRouter;
                let supplierId = this.supplierId;

                this.$router.push({name: preRouter, params: {supplierId:supplierId}})
            },
        }
    }
</script>

<style scoped lang="scss">
    .record{
        width: 100%;
        height: 100%;
        background-color: #ECEBEB;
        position: fixed;
        overflow: auto;
    }
    .heder{
        color: #222222;
        font-size: 1.03rem;
        font-weight: bold;
        width: 100%;
        height: 2.34rem;
        line-height: 2.34rem;
        background: #FFD100;
        display: flex;
        position: fixed;

        margin-bottom: 1.06rem;
    .title{
        margin:  0 auto;
    }
    .heder_img{
        width: 0.65rem;
        height: 1rem;
        left: 1.33rem;
        top: 0.65rem;
        position: absolute;
     }
    }
    .center{
        width: 18.4rem;
        height: auto;
        margin: 0 auto;
        margin-top: 4rem;
        .eac_cen{
            width: 100%;
            height: 100%;
            border-radius: 0.3rem;
            background: #fff;
            .cen_list{
                font-size: 0.74rem;
                color: #666666;
                div{
                    line-height: 1.6rem;
                    padding-left: 1.97rem;
                    span{
                        margin-left: .3rem;
                        color: #333;
                        font-weight:bold;
                    }
                }
            }
        }
        .price_lsit{
            text-align: center;
            margin-top: 0.64rem;
            width: 100%;
            height: 1.33rem;
            line-height: 1.33rem;
            display: flex;
            justify-content: space-between;
            .price{
                color: #333;
                font-size: 0.74rem;
                margin-left: 2.02rem;
            }
            .price_btn{
                display: flex;
                font-size: 0.74rem;
                color: #fff;
                .btn_i{
                    width: 3.94rem;
                    height: 1.33rem;
                    background: #00A0E9;
                    border-radius: .3rem;
                    margin-left: 1.17rem;
                }
                .btn_o{
                    width: 3.94rem;
                    height: 1.33rem;
                    background: #FB6125;
                    border-radius: .3rem;
                    margin-left: 1.17rem;
                }
                .btn_s{
                    width: 3.94rem;
                    height: 1.33rem;
                    background: #FB6125;
                    border-radius: .3rem;
                    margin-left: 1.17rem;
                }
                .btn_t{
                    width: 3.94rem;
                    height: 1.33rem;
                    background: #00A0E9;
                    border-radius: .3rem;
                    margin-left: 1.17rem;
                }
            }
        }
    }
</style>