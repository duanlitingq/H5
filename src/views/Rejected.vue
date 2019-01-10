<template>

    <div class="aps" >
        <!--黄色头部-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img" @click="goto('/Allorders/:id')" alt="">
            <div class="title">已驳回</div>
        </div>
        <!--内容区-->
        <div class="heder_bg">
            <img src="../assets/image/listbg.png"  alt="">
        </div>
        <div class="content">
            <div class="content-li" v-for="(item,index) in list" :key="index">
                <div class="loder">
                    <div class="payment">
                        <span class="reject">已驳回</span>
                    </div>
                    <div class="loderTop">
                        <div class="shopRight">{{item.buyUserName}}</div>
                        <div class="shopLeft">
                            <span class="spanJ">{{item.productTime}}</span>
                        </div>
                    </div>
                    <div class="heng"></div>
                    <div class="loderBon">
                        <ul class="nav">
                            <li>茄子6斤</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                // id:"",
                // totalMoney:"",//总价前
                // orderNum:"",//订单总数量
                // outMoney:"",//提现总价钱
                // waitOrderNum:"",//代发货
                // name:"",
                productTime:"",//驳回时间

            }
        },
        mounted() {
            let that = this;
            // that.id =  that.$route.params.id;

            //请求数据
            that.$post(apiUrl+'/page/supplier/order/backOrder',{"supplierId":11})
                .then((response) => {
                    console.log(response)
                    that.list = response.data[1].list;
                    that.productTime = response.data.productTime;
                    // that.orderId = response.data.orderId;
                    // that.token = response.data.token;
                    // that.totalMoney = response.data[1].totalMoney;
                    // that.orderNum = response.data[1].orderNum;
                    // that.outMoney = response.data[1].outMoney;
                    // that.waitOrderNum = response.data[1].waitOrderNum;
                    // that.totalMoney = response.data[1].totalMoney;
                    // that.name = response.data[1].name;
                })
        },

        methods: {
            goto (path){
                this.$router.push(path)
            },
        }
    }
</script>

<style scoped lang="scss">
    .aps{
        width: 100%;
        height: 100%;
        /*background-color: red;*/
        position: fixed;
        overflow: auto;
        text-align: center;
        .heder{
            color: #222222;
            font-size: 1.03rem;
            font-weight: bold;
            height: 2.34rem;
            line-height: 2.34rem;
            background: #FFD100;
            display: flex;
            position: relative;
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
        .heder_bg{
            width: 100%;
            height: 0.26rem;
            position: absolute;
            top: 1.72rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            width:100%;
            height:100%;
            background-color: #eee;
            padding-top: 1rem;
            box-sizing: content-box;
            .content-li{
                margin-top: 3rem;
                .loder{
                    width:95%;
                    margin: 0 auto;
                    background-color: white;
                    border-radius: 0.3rem;
                    position: relative;
                    .payment{
                        width:100%;
                        height:1.5rem;
                        line-height: 1.5rem;
                        margin-top:1rem;
                        margin-bottom: 1.5rem;
                        position: absolute;
                        top: -2.3rem;
                        right: 0;
                        span{
                            /*display:inline-block;*/
                        }
                        .reject{
                            float: right;
                            width:18%;
                            height:1.5rem;
                            line-height: 1.3rem;
                            font-size: 0.8rem;
                            background-color: #AAAAAA;
                            object:0.5;
                            color:white;
                            text-align: center;

                        }
                    }
                    .loderTop{
                        width:90%;
                        height:1.5rem;
                        box-sizing: content-box;
                        padding-top: 0.3rem;
                        .shopRight{
                            float: left;
                            width:3rem;
                            height:1.2rem;
                            font-size: 0.8rem;
                            margin-left: 1rem;
                        }
                        .shopLeft{
                            float:right;
                            .spanJ{
                                font-size: 0.6rem;
                                margin-left: 0.3rem;
                            }
                        }
                    }
                    .heng{
                        margin: 0 auto;
                        width:90%;
                        height:0.08rem;
                        background-color: black;
                    }
                    .loderBon{
                        margin: 0 auto;
                        width:90%;
                        overflow: hidden;

                        .nav{
                            width:98%;
                            margin: 0 auto;
                            li{
                                float: left;
                                width:25%;
                                height:2rem;
                                text-align: center;
                                line-height: 2rem;
                                list-style: none;
                                font-size: 0.8rem;
                            }
                        }
                    }
                }
            }


        }
    }


</style>