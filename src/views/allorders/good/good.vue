<template>
    <!--待发货-->
    <div class="box">
        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,textAlign:'center',}">{{innerHTML}}</div>

        <ul class="navbox" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="listbox" v-for="(item,index) in list" :key="item.id">
                <div class="bor" @click="orderDetail(item.id)">
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
                                <li class="list" v-for="(itelis,index) in item.items">
                                    {{itelis.supplierGoodsResp.name}}{{itelis.salesNum}}{{itelis.supplierGoodsResp.unitName}}
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="payment">
                    <span class="money">实付 <span>￥{{item.orderMoney}}</span></span>
                    <!--<span class="receipt" @click="goto('/PendingShipment')">派单</span>-->
                    <span class="reject" @click="sureOrder(item.id)">发货</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        data() {
            return {
                padd:'',
                innerHTML:'',
                cadd:'',

                loading:false,
                pageSize:4,
                pageNum:1,
                pages:0,

                len: 0,
                list: "",
                supplierId: 0
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
                let that = this;
                let supplierId = that.$route.params.supplierId;
                that.supplierId = supplierId;
                let pageSize = this.pageSize;
                //请求数据
                that.$fetch(apiUrl + '/page/supplier/order/findPage', {
                    "supplierId": supplierId,
                    "orderStatus": 2,
                    "payStatus":2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response, "全部订单的待发货")
                        if (response.success) {
                            if (response.data && response.data[1] && response.data[1].size > 0) {
                                that.pages = response.data[1].pages;
                                fn(response.data[1].list);
                                if(list.index<4){
                                    this.box.style.height= '100%'
                                }
                            } else {
                                this.padd='5rem';
                                this.innerHTML = '空空如也';
                                this.cadd='26rem';
                            }
                        } else {
                            this.innerHTML = '网络错误，请稍后再试';
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

            orderDetail(orderNo) {

                let supplierId = this.supplierId;
                this.$router.push({name: 'orderlist', query: {orderNo: orderNo,supplierId:supplierId,preRouter:"good"}})
            },
        },
        watch:{
            list(){
              this.$nextTick(loadData,()=>{
                  box.style.backgroundColor = '#eee'
              })
            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width:100%;
        /*height: 100%;*/
        position: absolute;
        top:4rem;
        left:0;
        padding: 1rem 1rem;
        box-sizing: border-box;
        background-color: #eee;
        min-height: 100%
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
        background-color: #eee;
        margin:0 auto;
    }
    .listbox{
        width:100%;
        list-style: none;
        margin: 2rem 0;
    }
    .bor{
        width: 100%;
        background: white;
        margin: 0 auto;
        border-radius: 5px;
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
                        height:1.7rem;
                        text-align: left;
                        line-height: 2rem;
                        list-style: none;
                        font-size: 0.7rem;

                        padding-left: 0.1rem;
                        padding-right: 0.1rem;
                        box-sizing: border-box;
                        margin: 0.1rem;
                        margin-right: 0.5rem;
                        border: 1px solid #F6F6F6;


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
        .money{
            width:33%;
            height:1.3rem;
            line-height: 1.3rem;
            font-size: 1rem;
            margin-left: 0.5rem;
            span{
                font-size: 1rem;
            }
        }
        .receipt,.reject{
            width:15%;
            height:1.3rem;
            line-height: 1.3rem;
            font-size: 0.8rem;
            background-color: #FC0019;
            color:white;
            border-radius: 0.3rem;
            margin-left: 5rem;
            text-align: center;
        }
        .reject{
            background-color: #1AA1E6;
            margin-left: 7.5rem;
        }
    }




</style>
