<template>
    <div class="home">
        <!--<HelloWorld  :msg="msg"/>-->
        <!--黄色头部-->
        <!--1：未接单2：已接单 3 已发货 4 已完成 5：取消订单，6：已取消 7：商家驳回-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img" @click="breakPage()" alt="">
            <div class="title">首页</div>
        </div>
        <!--内容区-->
        <div class="content">
            <div class="shop_name">
                <img src="../assets/image/dplog.png" alt="">
                <div>您好, {{name}}</div>
            </div>
            <div class="content-con">
                <div class="content-li content-left content-mar" @click="toOrderPage('neworder')">
                    <div class="content-number">{{newOrderNum}}</div>
                    <div class="content-text">新订单</div>
                </div>
                <div class="content-li content-right content-mar" @click="waitOrder('PendingShipment')">
                    <div class="content-number">{{waitOrderNum}}</div>
                    <div class="content-text">待发货</div>
                </div>
                <div class="content-li content-left" @click="allOrder('Completed')">
                    <div class="content-text">已完成</div>
                </div>
                <div class="content-li content-right" style="position: relative;" @click="all('whole')">
                    <div class="content-text">全部订单</div>
                    <!--<p class="con-money" style="position: absolute;top:5rem;left:2.5rem;">{{totalMoney}}</p>-->
                </div>
                <!--提现功能不完善-->
                <div class="balance">
                    <div class="balance-num">余额{{totalMoney}}</div>
                    <div class="balance-sub" @click="ordprice('detailsBal')">明细</div>
                    <div class="balance-sub" @click="cenback('apply')">提现</div>
                </div>
            </div>
            <!--<div class="con-message">温馨提示：平台目前暂未开放提现功能，请前往电脑端申请提现。</div>-->
        </div>
    </div>
</template>

<script>
    // import HelloWorld from '@/components/HelloWorld.vue'
    import {Toast} from 'mint-ui';
    import PubSub from 'pubsub-js'

    export default {
        name: 'home',
        data() {
            return {
                id: 0,// 店铺编号
                totalMoney: "",//总价前
                newOrderNum: "",//订单总数量
                outMoney: "",//提现总价钱
                waitOrderNum: "",//代发货
                name: "",
                supplierId: 0
            }
        },
        mounted() {
            let that = this;
            let supplierId = that.$route.params.id;
            console.log(supplierId, '00000')
            that.supplierId = supplierId;
            // let token = localStorage.getItem('token')
            // console.log(id,"home")
            //请求数据
            that.$fetch(apiUrl + '/page/supplier/manage/getSupplier', {
                "supplierId": supplierId
            })
                .then((response) => {
                    console.log(response)
                    that.totalMoney = response.data[1].totalMoney;
                    that.newOrderNum = response.data[1].newOrderNum;
                    that.outMoney = response.data[1].outMoney;
                    that.waitOrderNum = response.data[1].waitOrderNum;
                    that.name = response.data[1].name;

                })
        },
        methods: {
            goto(path) {
                this.$router.push(path)
            },
            shop() {
                console.log(this.data())
            },

            //返回
            breakPage() {
                let supplierId = this.supplierId;
                this.$router.push({name: "shop", params: {id: supplierId}})
            },

            //新订单
            toOrderPage(router) {
                console.log('新订单====================', this.$route.params.id);
                this.$router.push({name:router,params:{supplierId:this.$route.params.id}})
            },

            //待发货
            waitOrder(data) {
                console.log('待发货=============', this.$route.params.id)
                this.$router.push({name: data, params: {supplierId: this.$route.params.id}})
            },

            //已完成
            allOrder(d) {
                console.log('已完成========',this.$route.params.id)
                this.$router.push({name: d, params: {supplierId: this.$route.params.id}})
            },

            //全部订单
            all(d) {
                console.log('全部订单===========',this.$route.params.id)
                this.$router.push({name: d, params: {supplierId: this.$route.params.id}})

            },

            //提现
            cenback(d){
                console.log('提现===========',this.$route.params.id)
                this.$router.push({name: d, params: {supplierId: this.$route.params.id}})
            },

            //明细
            ordprice(d){
                console.log('明细===========',this.$route.params.id)
                this.$router.push({name: d, params: {supplierId: this.$route.params.id}})
            },




            //提现
            // cenback() {
            //     let that = this;
            //     let id = that.id;
            //     that.$router.push({
            //         path: `/apply/${id}`,
            //     })
            // },
            //
            // //明细
            // ordprice() {
            //     let that = this;
            //     let id = that.id;
            //     that.$router.push({
            //         path: `/record/${id}`,
            //     })
            // },

            //全部订单
            ordcter() {
                let that = this;
                let id = that.id;
                that.$router.push({
                    path: `/Allorders/${id}`,
                })
            },

            finish(id) {
                this.$router.push({
                    path: `/Completed/${{id}}`,
                })
            }

        }
    }
</script>
<style scoped lang="scss">

    .con-message{
        font-size:0.6rem;
        position: relative;
        top:-8rem;
    }
    .home {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        position: fixed;
        overflow: auto;
        text-align: center;
    }

    .heder {
        background: #FFD100;
        width: 100%;
        height:2.34rem;

        .heder_img {
            width: 0.65rem;
            height: 1rem;
            left: 1.33rem;
            top: 0.65rem;
            position: absolute;
        }

        .title {
            color: #222222;
            font-size: 1.03rem;
            font-weight: bold;
            padding-top: 0.5rem;
        }

        .en_ue {
            color: #333;
            font-size: 0.8rem;
            margin: 0 auto;
            margin-top: 1.06rem;
        }

        .price {
            color: #333;
            font-size: 2.34rem;
            margin: 0 auto;
            margin-top: 1.28rem;
            font-weight: bold;
        }

        .btn_price {
            width: 8.16rem;
            height: 2.02rem;
            line-height: 2.02rem;
            text-align: center;
            background: #fb6125;
            text-align: center;
            margin: 0 auto;
            margin-top: 1.76rem;
            color: #fff;
            font-size: 0.85rem;
            border-radius: 0.3rem;
        }
    }

    .content {
        .shop_name {
            width: 14rem;
            height: 2.3rem;
            line-height: 1.3rem;
            background: #00a0e9;
            border-radius: 5px;
            margin: 0 auto;
            margin-top: 0.9rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;

            img {
                width: 1.5rem;
                height: 1.5rem;
                margin-left: 0.37rem;
            }

            div {
                display: inline-block;
                color: #fff;
                font-size: 1rem;
                width: 8.05rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 0.33rem;
            }
        }

        .content-con {
            width: 85%;
            height: 27rem;
            padding: 0 1.5rem 0 1.5rem;

            .content-li {
                width: 45%;
                height: 29%;
                background: #FFD100;
                float: left;
                border-radius: 5px;
                position: relative;

                .content-number {
                    width: 1.7rem;
                    height: 1.7rem;
                    border-radius: 50%;
                    background: red;
                    color: white;
                    float: right;
                    line-height: 1.6rem;
                    margin: 0.5rem 0.5rem 0 0;
                }

                .content-text {
                    position: absolute;
                    top: 1.5rem;
                    left: 0;
                    width: 100%;
                    height: 5rem;
                    /*background: pink;*/
                    line-height: 5rem;
                    font-size:1.2rem;
                    font-weight: 600;


                }

            }
            .con-message{
                font-size:0.5rem;
            }

            .content-left {
                float: left;
            }

            .content-right {
                float: right;
            }

            .content-mar {
                margin-bottom: 1rem;
            }

            .balance {
                position: absolute;
                top: 24rem;
                width: 84%;
                height: 4rem;
                /*background: pink;*/
                padding-top: 2.5rem;

                .balance-num {
                    width: 8rem;
                    height: 2.5rem;
                    background: #ECEBEB;
                    border-radius: 5px;
                    float: left;
                    line-height: 2.5rem;
                }

                .balance-sub {
                    width: 2.5rem;
                    height: 1.4rem;
                    background: #F95E31;
                    float: right;
                    margin-right: 0.5rem;
                    margin-top: 0.5rem;
                    color: #fff;
                    font-size: 0.8rem;
                    text-align: center;
                    border-radius: 5px;
                }

                .balance-sub:nth-child(2) {
                    background: #A0A0A0;
                }
            }
        }

    }


</style>
