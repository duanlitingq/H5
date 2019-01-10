<template>

        <div class="orderlist">
            <div class="contentjs">
                <div class="heder">
                    <img src="../assets/image/fanhui.png" class="heder_img" @click="orders(detail.id)" alt="">
                    <div class="title">订单详情</div>
                </div>
                <!--收货地址-->
                <div class="address">
                    <div class="address_title">
                        <div>收货人： <span>{{detail.buyUserName}}</span></div>
                        <div><span>收货地址：{{detail.address}}({{detail.column1}})</span></div>
                        <div>联系电话：{{detail.buyUserPhone}}</div>
                    </div>
                    <div class="heder_bg">
                        <img src="../assets/image/listbg.png" alt="">
                    </div>
                </div>
                <!--白色内容-->
                <div class="center">
                    <!--白色区域内容-->
                    <div class="eac_cen">
                        <div class="cen_title">
                            <div class="name">商品信息</div>
                        </div>
                        <div class="cen_list">
                            <div v-for="(item,index) in detail.items">
                                {{item.supplierGoodsResp.name}} {{item.salesNum}} {{item.supplierGoodsResp.unitName}}
                            </div>
                        </div>
                    </div>
                    <!--价格列表-->
                    <div class="price_lsit">
                        <div>商品小计: {{detail.orderMoney}}</div>
                        <div>议价: {{detail.hagglePrice}}</div>
                        <div>积分抵现: {{detail.integral}}</div>
                        <div class="cen_price">实付金额: {{detail.actPayment}}</div>
                    </div>
                </div>
                <!--订单信息-->
                <div class="center">
                    <!--白色区域内容-->
                    <div class="eac_cen">
                        <div class="cen_title">
                            <div class="name">订单信息</div>
                        </div>
                        <div class="cen_lists">
                            <div>订单编号：{{detail.orderNo}}</div>
                            <div>下单时间：{{detail.createTime}}</div>
                            <div>接单时间：{{detail.confirmTime}}</div>
                        </div>
                    </div>
                </div>
            </div>


                <!--保存图片-->
                <div class="savethepage" @click="cropCar">保存图片</div>
            <div v-if="boxdis" class="mask">
                <div class="mybox">
                    <i class="iclose" @click="boxClose"><img src="../assets/image/close.png" alt=""></i>
                    <img :src="imgUrl" width="100%"/>
                </div>
            </div>
        </div>

</template>

<script>
    import domtoimage from 'dom-to-image';
    export default {
        name: "orderlist",
        data() {
            return {
                tests:true,
                boxdis:false,
                imgUrl:"",
                address: "",
                detail: "",
                orderNo: '',
                preRouter:"",
                supplierId:"",
            }
        },
        mounted() {
            let that = this;
            let orderNo = that.$route.query.orderNo;
            let preRouter = that.$route.query.preRouter;
            let supplierId = that.$route.query.supplierId;
            that.orderNo = orderNo;
            that.preRouter = preRouter;
            that.supplierId = supplierId;
            // //请求数据
            console.log('订单详情页面:===========>', orderNo)
            that.$fetch(apiUrl + '/page/supplier/order/getOrderDetail', {"orderId": orderNo})
                .then((response) => {
                    console.log(response)
                    if (response.success) {
                        that.detail = response.data[1];
                        console.log(this.detail,'00000')
                    } else {
                        console.log("查询失败!!!")
                    }
                })

        },
        methods: {
            boxClose(){
                this.boxdis = false;
                this.tests = true;
            },
            cropCar() {
                let self = this;
                // 获取dom结构
                //let card_target = this.refs.copyCardArea;
                let card_target = document.querySelector('.contentjs');
                domtoimage.toJpeg(card_target, { quality: 0.95 })
                    .then(function (dataUrl) {
                        self.imgUrl = dataUrl;
                        self.boxdis = true;
                    });
                this.tests=false
            },

            // 裁剪名片
            cropCard() {

                /*var box = document.createElement(
                    '<div style="width:100px;height:100px;box-shadow:2px 2px 5px black  "></div>')
                document.body.appendChild(box);*/
            },
           // let guanb = document.querySelector('.guanbi');

            // $(back).addEventListener("click",console.log('大野'))
            // back.addEventListener("click",console.log('打野'))

            // backshanc(){
            //     removeChild()
            // },


            dataURLtoBlob(dataurl) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },

            orders(orderNo) {
                let preRouter = this.preRouter;
                let supplierId = this.supplierId;
                console.log(preRouter,supplierId,"-----------------------------------------------------------");
                this.$router.push({name: preRouter, params:{supplierId:supplierId}})
            },
        }
    }
</script>

<style scoped lang="scss">
    .mask{
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        background:rgba(0,0,0,0.2);
    }
    .iclose{
        position:absolute;
        top:0;
        right:0;
        width:10%;
        height:10%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .mybox{
       position:fixed;
       top:5rem;
       width:85%;
       height:50%;
       margin:0 auto;
       left:0;
       right:0;
       text-align : center;
       background:#fff;
       border : 1px solid #000;
    }
    .orderlist {
        width: 100%;
        height: 100%;
        background-color: #ECEBEB;
        position: fixed;
        overflow: auto;
    }
    .contentjs{
       background-color: #ECEBEB;
        padding-bottom: 1rem;
    }
    .heder {
        color: #222222;
        font-size: 1.03rem;
        font-weight: bold;
        height: 2.34rem;
        line-height: 2.34rem;
        background: #FFD100;
        display: flex;
        position: relative;

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

    .address {
        width: 100%;
        height: auto;
        background: #fff;
        color: #333333;
        font-size: 0.8rem;
        position: relative;
        padding-bottom: .3rem;

        .address_title {
            padding-left: 1.28rem;
            padding-right: 1.28rem;
            line-height: 1.6rem;
        }

        span {
            font-weight: bold;
        }

        .heder_bg {
            width: 100%;
            height: 0.26rem;
            position: absolute;
            bottom: .5rem;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .center {
        width: 18.4rem;
        height: auto;
        margin: 0 auto;
        margin-bottom: 0.74rem;
        margin-top: 0.74rem;

        .eac_cen {
            width: 100%;
            height: 100%;
            border-radius: 0.3rem;
            background: #fff;

            .cen_title {
                width: 16.3rem;
                display: flex;
                padding: 0.64rem 1.06rem 0.26rem 1.06rem;
                justify-content: space-between;
                border-bottom: 0.05rem dotted #b5b5b5;

                .name {
                    color: #333333;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
            }

            .cen_list {
                display: flex;
                flex-wrap: wrap;
                padding: 0.64rem 1.06rem 0.74rem 1.06rem;

                div {
                    margin-top: 0.74rem;
                    padding: 0.26rem 0.37rem 0.26rem 0.37rem;
                    color: #333333;
                    font-size: 0.64rem;
                    border: 0.05rem solid #ECEBEB;
                    margin-right: 0.74rem;
                }
            }

            .cen_lists {
                color: #666666;
                font-size: 0.69rem;
                line-height: 1.8rem;
                margin-left: 2.34rem;
            }
        }

        .price_lsit {
            margin-top: .5rem;
            color: #666666;
            font-size: 0.69rem;
            margin-left: 11.84rem;
            line-height: 1.4rem;
        }

        .cen_price {
            font-size: 0.74rem;
            color: #333333;
        }
    }

    .savethepage{
        width: 20%;
        height: 1.3rem;
        text-align: center;
        font-size: 0.8rem;
        line-height: 1.3rem;
        border-radius: 0.3rem;
        color: white;
        background-color: #FC0019;

        /*margin-top: 3rem;*/
    }

</style>