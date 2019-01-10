<template>

    <div class="aps">
        <!--黄色头部-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img" @click="breakPage()" alt="">
            <div class="title">待发货</div>
        </div>
        <div class="heder_bg">
            <img src="../assets/image/listbg.png" alt="">
        </div>

        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,background:'#eee'}">{{innerHTML}}</div>

        <!--内容区-->
        <ul class="content"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <li class="listbox" v-for="(item,index) in list " :key="item.id">
                <div class="bor">
                    <div class="loder" @click="orderDetail(item.id)">
                        <div class="loderTop">
                            <div class="shopRight">{{item.buyUserName}}</div>
                            <div class="shopLeft">
                                <span class="spanJ">{{item.createTime}}</span>
                            </div>
                        </div>
                        <div class="heng"></div>
                        <div class="loderBon">
                            <ul class="nav">
                                <li class="list" v-for="(lis,index) in item.items">
                                    {{lis.supplierGoodsResp.name}}{{lis.salesNum}}{{lis.supplierGoodsResp.unitName}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="payment">
                        <span class="money">实付 <span>￥{{item.actPayment}}</span></span>
                        <!--<span class="receipt" @click="sendOrder(item.id)">派单</span>-->
                        <span class="reject" @click="sureOrder(item.id)">发货</span>
                    </div>
                </div>
            </li>

        </ul>


    </div>
</template>

<script>
    export default {
        name: "aps",
        inject:['reload'],
        data() {
            return {
                padd:'',
                innerHTML:'',

                loading:false,
                pageSize:4,
                pageNum:1,
                pages:0,

                len: 0,
                list: "",
                supplierId: 0,
            }
        },
        mounted() {
            //请求数据
            this.loadData(1,this.fitElement);
        },
        methods: {
            fitElement(res){
                this.list = res;
            },
            appendElement(res){
                for (let i = 0; i < res.length; i++) {
                    this.list.push(res[i]);
                }
            },
            loadData(pageNum,fn){
                let that = this;
                let supplierId = that.$route.params.supplierId;
                that.supplierId = supplierId;
                let pageSize = this.pageSize;

                //请求数据
                that.$fetch(apiUrl + '/page/supplier/order/findPage', {
                    "supplierId": supplierId,
                    "orderStatus": 2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response, "待发货")
                        if (response.success) {
                            if (response.data && response.data[1] && response.data[1].size > 0) {
                                that.pages = response.data[1].pages;
                                fn(response.data[1].list);
                            } else {
                                this.padd='5rem'
                                this.innerHTML = '空空如也'
                            }
                        } else {
                            this.innerHTML = '网络错误，请稍后再试'
                            console.log("1111")
                        }
                        that.len = that.list.length;
                    })
            },

            loadMore() {
                if(this.pageNum+1 <= this.pages){
                    this.pageNum = this.pageNum+1;
                    this.loading = true;
                    setTimeout(() => {
                        this.loadData(this.pageNum,this.appendElement);
                        this.loading = false;
                    }, 500);
                }
            },




            goto(path) {
                this.$router.push(path)
            },
            orderDetail(orderNo) {
                let supplierId = this.supplierId;
                this.$router.push({name: 'orderlist', query: {orderNo: orderNo,supplierId:supplierId,preRouter:"PendingShipment"}})
            },
            go(path) {
                this.$router.replace(path)
            },
            //派单分享功能
            state(orderNo) {
                console.log("派单分享功能 ")
                console.log(orderNo)
                // let that = this;
                // that.len = that.len - 1;
                // let id = that.list[index].id;
                // console.log(that.len);
                // that.$post(apiUrl + '/page/supplier/order/confirmOrder', {"token": "test_app", "orderId": id})
                // that.$delete(apiUrl + '/page/supplier/order/confirmOrder')
                // this.getOrder()

            },

            //派单
            sendOrder(orderId){
                this.$fetch(apiUrl + '/page/supplier/order/confirmOrder', {
                    "orderId": orderId,
                    "orderStatus":2
                })
                    .then((response) => {
                        //刷新页面
                        this.reload();
                    });
            },

            //发货
            sureOrder(orderId) {
                // 接单
                // token orderId
                //
                this.$fetch(apiUrl + '/page/supplier/order/confirmOrder', {
                    "orderId": orderId,
                    "orderStatus":3
                })
                    .then((response) => {
                        //刷新页面
                        this.reload();
                    });
            },



            breakPage() {
                let supplierId = this.supplierId;
                this.$router.push({name: "home", params: {id: supplierId}})
            }
        },

    }
</script>

<style scoped lang="scss">
    .aps {
        width: 100%;
        height: 100%;
        background-color: #EEEEEE;
        position: fixed;
        overflow: auto;
        text-align: center;

        .heder {
            color: #222222;
            font-size: 1.03rem;
            font-weight: bold;
            height: 2.34rem;
            line-height: 2.34rem;
            background: #FFD100;
            width: 100%;
            position: fixed;
            top: 0;

            .title {
                margin: 0 auto;
            }

            .heder_img {
                width: 0.65rem;
                height: 1rem;
                left: 1.33rem;
                top: 0.65rem;
                position: absolute;
            }

        }

        .heder_bg {
            width: 100%;
            height: 0.26rem;
            position: fixed;
            top: 1.6rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .content {
            width: 100%;
            height: 100%;
            background-color: #eee;
            padding-top: 3.5rem;
            box-sizing: content-box;

            .listbox{
                list-style: none;
                margin: 1rem 0;
                border-radius: 5px;
            }
           /* .bor{
                width: 100%;
                background: white;
                margin: 0 auto;
                !*border: 1px dashed #000 ;*!
                border-radius: 5px;
                padding-bottom: 0.3rem;
                box-sizing: border-box;
            }*/
            .loder {
                width: 95%;
                margin: 0 auto;
                background-color: white;
                border-radius: 5px;

                .loderTop {
                    width: 90%;
                    height: 1.5rem;
                    box-sizing: content-box;
                    padding-top: 0.3rem;
                    /*display: flex;*/
                    .shopRight {
                        float: left;
                        width: 3rem;
                        height: 1.2rem;
                        font-size: 0.8rem;
                        margin-left: 1rem;
                    }

                    .shopLeft {
                        float: right;

                        .spanJ {
                            font-size: 0.6rem;
                            margin-left: 0.3rem;
                        }
                    }
                }

                .heng {
                    /*margin: 0 auto;*/
                    width: 90%;
                    border: 1px dashed black;
                }

                .loderBon {
                    margin: 0 auto;
                    width: 90%;
                    overflow: hidden;
                    margin-top: 0.5rem;
                    .nav {
                        width: 98%;
                        margin: 0 auto;

                        li {
                            float: left;
                            /*width: 23%;*/
                            height: 1.7rem;
                            text-align: left;
                            line-height: 2rem;
                            list-style: none;
                            font-size: 0.7rem;

                            padding-left: 0.1rem;
                            padding-right: 0.1rem;
                            box-sizing: border-box;
                            margin:0.1rem;
                            margin-right: 0.5rem;
                            border: 1px solid #F6F6F6;

                        }
                    }
                }
            }

            .payment {
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                margin-top: 1rem;
                margin-bottom: 1.5rem;
                display: inline-flex;
                span {
                    display: inline-block;
                }

                .money {
                    width: 33%;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    font-size: 1rem;

                    span {
                        font-size: 1rem;
                    }
                }

                .receipt, .reject {

                    width: 15%;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    font-size: 0.8rem;
                    background-color: #FC0019;
                    color: white;
                    border-radius: 0.3rem;
                    margin-left: 5rem;
                }

                .reject {
                    margin-left: 7.5rem;
                    background-color: #1AA1E6;
                }
            }
        }
    }


</style>