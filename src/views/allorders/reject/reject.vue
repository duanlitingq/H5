<template>
    <!--已驳回-->
    <div class="box">
        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,textAlign:'center'}">{{innerHTML}}</div>

        <ul class="navbox" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="listbox" v-for="(item,index) in list" @click="orderDetail(item.id)">
                <div class="bor" >
                    <div class="loder">
                        <div class="loderTop" >
                            <div class="shopRight">{{item.buyUserName}}</div>
                            <div class="shopLeft">
                                <span class="spanJ">{{item.createTime}}</span>
                            </div>
                        </div>
                        <div class="heng"></div>
                        <div class="loderBon">
                            <ul class="nav" >
                                <li class="list" v-for="(ite,index) in item.items">
                                    {{ite.supplierGoodsResp.name}}{{ite.salesNum}}{{ite.supplierGoodsResp.unitName}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="payment">
                    <!--<span class="money">实付 <span>￥150</span></span>-->
                    <!--<span class="receipt" @click="goto('/PendingShipment')">接单</span>-->
                    <span class="reject">已驳回</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                padd:'',
                innerHTML:'',

                loading:false,
                pageSize:4,
                pageNum:1,
                pages:0,

                list:"",
                productTime:"",//驳回时间
                supplierId:0,
                orderId:0

            }
        },
        mounted() {
            //请求数据
            this.loadData(1,this.fitElement);
        },
        methods:{
            fitElement(res){
                this.list = res;
            },
            appendElement(res){
                for (let i = 0; i < res.length; i++) {
                    this.list.push(res[i]);
                }
            },
            loadData(pageNum,fn){
                console.log(this.$route.params.supplierId,777)
                let that = this;
                let supplierId = that.$route.params.supplierId;
                that.supplierId = supplierId;
                let pageSize = this.pageSize;
                console.log(supplierId,'-----reject')
                //请求数据
                that.$fetch(apiUrl+'/page/supplier/order/findPage',{
                    "supplierId":supplierId,
                    "orderStatus":7,
                    "payStatus":2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response.data[1].list,'全部订单的已驳回')
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

            //订单详情
            orderDetail(orderNo) {
                let supplierId = this.supplierId;
                this.$router.push({name: 'orderlist', query: {orderNo: orderNo,supplierId:supplierId,preRouter:"reject"}})

                /*this.$router.push({
                    name: 'orderlist',
                    query: {preRouter: "allneworder", orderNo: orderNo, supplierId: this.supplierId}
                })*/
            },
        },



    }
</script>

<style scoped lang="scss">
    .box{
        width:100%;
        /*height:100%;*/
        position: absolute;
        top:4rem;
        left:0;
        padding: 1rem 1rem;
        box-sizing: border-box;
        background-color: #eee;
        min-height: 100%;
    }
    li{
        list-style: none;
        margin-bottom: 2.5rem;
        position: relative;
        top:0;
        left:0;
    }
    .navbox{
        width:100%;
        height:100%;

    }
    .listbox{
        list-style: none;
        margin: 2rem 0;

    }
    /*listbox:nth-child(even){*/
    /*width: 100%;*/
    /*height: 100px;*/
    /*}*/
    .bor{
        width: 100%;
        background: white;
        margin: 0 auto;
        /*border: 1px dashed #000 ;*/
        border-radius:5px;
        padding-bottom: 0.3rem;
        box-sizing: border-box;
        .loder{
            width:95%;
            margin: 0 auto;
            background-color: white;
            border-radius: 5px;
            .loderTop{
                width:90%;
                height:1.5rem;
                box-sizing: content-box;
                padding-top: 0.3rem;
                display: flex;
                .shopRight{
                    flex: 1;
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
                width:95%;
                border: 1px solid #ccc ;
            }
            .loderBon{
                width:90%;
                overflow: hidden;
                margin:0 auto;
                margin-top: 0.5rem;
                .nav{
                    width:100%;
                    overflow: hidden;
                    margin: 0 auto;
                    .list{
                        float: left;
                        /*width:23%;*/
                        height:1.7rem;
                        line-height: 2rem;
                        text-align: center;
                        font-size: 0.7rem;
                        border: 1px solid #F6F6F6 ;
                        padding-left: 0.1rem;
                        padding-right: 0.1rem;
                        box-sizing: border-box;
                        margin:0.1rem;
                        margin-right: 0.5rem;
                        /* white-space: nowrap;
                         overflow: hidden;
                         text-overflow: ellipsis;*/

                    }
                }
            }
        }
    }
    .payment{
        width:100%;
        height:1.5rem;
        line-height: 1.5rem;
        margin:1rem 0;
        span{
            display:inline-block;
        }
        .reject{
            width:23%;
            height:1.5rem;
            line-height: 1.5rem;
            font-size: 0.9rem;
            color:white;
            border-radius: 0.3rem;
            text-align: center;
            background-color: #ccc;
            margin-left: 0.5rem;
            float: right;
        }
    }


</style>
