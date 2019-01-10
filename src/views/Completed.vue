<template>

    <div class="aps" >
        <!--黄色头部-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="breakPage()" alt="">
            <div class="title">已完成</div>
        </div>
        <!--内容区-->
        <div class="heder_bg">
            <img src="../assets/image/listbg.png"  alt="">
        </div>

        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,background:'#eee'}">{{innerHTML}}</div>

        <div class="content" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <div class="content-li" v-for="(item,index) in list" @click="orderDetail(item.id)">
                <div class="loder" >
                    <div class="payment">
                        <span class="reject">已收货</span>
                    </div>
                    <div class="loderTop">
                        <div class="shopRight">{{item.buyUserName}}</div>
                        <div class="shopLeft">
                            <span class="spanJ">{{item.createTime}}</span>
                        </div>
                    </div>
                    <div class="heng"></div>
                    <div class="loderBon">
                        <ul class="nav">
                            <li v-for="(lis,index) in item.items">
                                {{lis.supplierGoodsResp.name}}{{lis.salesNum}}{{lis.supplierGoodsResp.unitName}}
                            </li>
                        </ul>
                    </div>
                    <!--<div class="shi">实付{{item.orderMoney}}</div>-->
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
                padd:'',
                innerHTML:'',

                loading:false,
                pageSize:4,
                pageNum:1,
                pages:0,

                list:"",
                supplierId:0,

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
                let supplierId =  that.$route.params.supplierId;
                that.supplierId =  supplierId;
                let pageSize = this.pageSize;
                //请求数据
                that.$fetch(apiUrl+'/page/supplier/order/findPage',{
                    "supplierId":supplierId,
                    "orderStatus":4,
                    "payStatus":2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response,"已完成")
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

            goto (path){
                this.$router.push(path)
            },
            breakPage(router){
                let supplierId = this.supplierId;
                this.$router.push({name:"home", params: {id: supplierId}})
            },
            //订单详情
            orderDetail(orderNo) {
                let supplierId = this.supplierId;
                this.$router.push({name: 'orderlist', query: {orderNo: orderNo,supplierId:supplierId,preRouter:"Completed"}})
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
            width: 100%;
            height: 2.34rem;
            line-height: 2.34rem;
            background: #FFD100;
            z-index: 1;
            position: fixed;
            top: 0;
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
            position: fixed;
            top: 1.6rem;
            z-index: 1;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            width:100%;
            height:100%;
            background-color: #eee;
            padding-top: 2rem;
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
                        height:0rem;
                        border: 1px dashed  black;
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
                                /*width:23%;*/
                                height:1.7rem;
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
            }


        }
    }


</style>