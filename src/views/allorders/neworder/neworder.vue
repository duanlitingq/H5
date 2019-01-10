<template>
    <!--新订单-->
    <div class="box">
        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,background:'#eee',textAlign:'center',}">{{innerHTML}}</div>

        <ul class="navbox"v-infinite-scroll="loadMore"
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
                                <li class="list" v-for="(itlis,index) in item.items">
                                    {{itlis.supplierGoodsResp.name}}{{itlis.salesNum}}{{itlis.supplierGoodsResp.unitName}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="payment">
                    <span class="money">实付 <span>￥{{item.orderMoney}}</span></span>
                    <span class="receipt" @click="sureOrder(item.id)">接单</span>
                    <span class="reject" @click="backOrder(item.id)">驳回</span>
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
                cadd:'',

                loading:false,
                pageSize:4,
                pageNum:1,
                pages:0,

                list:"",
                isShow:false,
                supplierId:0
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
                console.log(supplierId,'---supplierId全部订单的新订单')
                //请求数据
                that.$fetch(apiUrl+'/page/supplier/order/findPage',{
                    "supplierId":supplierId,
                    "orderStatus":1,
                    "payStatus":2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response.data, "全部订单里的新订单")
                        if (response.success) {
                            if (response.data[1].size > 0) {
                                that.pages = response.data[1].pages;
                                fn(response.data[1].list);
                                list.style.backgroundColor = '#eee'
                            } else {
                                this.padd='5rem'
                                this.innerHTML = '空空如也'
                                this.cadd = '26rem'
                            }
                        } else {
                            this.innerHTML = '网络错误，请稍后再试'
                            console.log("1111")
                        }
                    })
                /*.then( res => {
                    console.log(res)
                    that.isShow = !! ( res.success && res.data && res.data[1] && (that.list = res.data[1].list))
                } )*/
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



            backOrder(orderId) {
                // 驳回
                // token orderId
                // url /page/supplier/order/backOrder
                this.$fetch(apiUrl + '/page/supplier/order/backOrder', {
                    "orderId": orderId
                })
                    .then((response) => {
                        console.log(response, "已驳回")
                        //刷新页面
                        this.reload();
                    })
            },
            sureOrder(orderId) {
                // 接单
                // token orderId
                //
                this.$fetch(apiUrl + '/page/supplier/order/confirmOrder', {
                    "orderId": orderId,
                    "orderStatus":2
                })
                    .then((response) => {
                        //刷新页面
                        this.reload();
                    });
            },
            //订单详情
            orderDetail(orderNo) {
                let supplierId = this.supplierId;
                this.$router.push({name: 'orderlist', query: {orderNo: orderNo,supplierId:supplierId,preRouter:"allneworder"}})

                /*this.$router.push({
                    name: 'orderlist',
                    query: {preRouter: "allneworder", orderNo: orderNo, supplierId: this.supplierId}
                })*/
            },
            goto (path){
                this.$router.push(path)

            },
        },
        watch:{
            loadMore(){
                    new Swiper('.swiper-container', {
                        loop:true,
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    })
            }
        }


    }
</script>

<style scoped lang="scss">
    .box{
        width:100%;
        /*height:100%;*/
        position: absolute;
        top:4rem;
        left:0;
        padding: 0 1rem;
        box-sizing: border-box;
        background-color: #eee;
        min-height: 100%
    }
    li{
        list-style: none;
    }
    .navbox{
        width:100%;
        height:100%;
        background-color: #eee;
    }
    .listbox{
        /*background: white;*/
        list-style: none;
        margin: 1rem 0;
        /*border-radius: 5px;*/
        /*border: 5px solid #eee;*/
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
                    width:98%;
                    overflow: hidden;
                    margin: 0 auto;
                    .list{
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
        background: #eee;
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
            margin-left: 0.5rem;
        }
    }


</style>

