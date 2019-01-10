<template>
    <div class="orderlist">
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="$router.back(-1)" alt="">
            <div class="title">自提详情</div>
        </div>
        <!--收货地址-->
        <div class="address">
            <div class="address_title">
                <div>收货人： <span>刘明明</span> </div>
                <div><span>配送方式：到店自提</span></div>
                <div>联系电话：1568888888</div>
            </div>
            <div class="heder_bg">
                <img src="../assets/image/listbg.png"  alt="">
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
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                    <div>茄子6斤</div>
                </div>
            </div>
            <!--价格列表-->
            <div class="price_lsit">
                <div>商品小计: ¥368</div>
                <div>议价: ¥368</div>
                <div>积分抵现: ¥368</div>
                <div class="cen_price">实付金额: ¥368</div>
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
                   <div>订单编号：201866881653521</div>
                   <div>下单时间：2018-11-19 08:56:30</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderlist",
        data(){
            return{
                id:""
            }
        },
        mounted() {
            console.log(1)
            // let that = this;
            // that.id =  that.$route.params.id;
            // //请求数据
            // that.$post(apiUrl+'/page/supplier/order/findPage',{"supplierId":that.id })
            //     .then((response) => {
            //         console.log(response)
            //     })
        }
    }
</script>

<style scoped lang="scss">
  .orderlist{
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
.address{
    width: 100%;
    height: auto;
    background: #fff;
    color: #333333;
    font-size: 0.8rem;
    position: relative;
    padding-bottom: .3rem;
    .address_title{
        padding-left: 1.28rem;
        padding-right: 1.28rem;
        line-height: 1.6rem;
    }
    span{
        font-weight: bold;
    }
    .heder_bg{
        width: 100%;
        height: 0.26rem;
        position: absolute;
        bottom:.5rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
  .center{
      width: 18.4rem;
      height: auto;
      margin: 0 auto;
      margin-bottom: 0.74rem;
      margin-top: 0.74rem;
      .eac_cen{
          width: 100%;
          height: 100%;
          border-radius: 0.3rem;
          background: #fff;
          .cen_title{
              width: 16.3rem;
              display: flex;
              padding:  0.64rem   1.06rem  0.26rem 1.06rem ;
              justify-content: space-between;
              border-bottom: 0.05rem dotted #b5b5b5;
              .name{
                  color: #333333;
                  font-size:0.8rem;
                  font-weight:bold;
              }
          }
          .cen_list{
              display: flex;
              flex-wrap: wrap;
              padding: 0.64rem 1.06rem 0.74rem 1.06rem;
              div{
                  margin-top: 0.74rem;
                  padding: 0.26rem 0.37rem 0.26rem 0.37rem;
                  color: #333333;
                  font-size: 0.64rem;
                  border: 0.05rem solid #ECEBEB;
                  margin-right: 0.74rem;
              }
          }
          .cen_lists{
              color: #666666;
              font-size: 0.69rem;
              line-height: 1.8rem;
              margin-left: 2.34rem;
          }
      }
      .price_lsit{
          margin-top: .5rem;
          color: #666666;
          font-size: 0.69rem;
          margin-left: 11.84rem;
          line-height: 1.4rem;
      }
      .cen_price{
          font-size: 0.74rem;
          color: #333333;
      }
  }

</style>