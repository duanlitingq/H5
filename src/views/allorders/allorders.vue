<template>
    <!--全部订单-->
    <div class="appall">

        <div class="heder">
            <img src="../../assets/image/fanhui.png" class="heder_img" @click="prePage()">
            <div class="title">全部订单</div>
        </div>

        <div class="tab">
            <div class="tab-item"  >
                <!--&lt;!&ndash;&lt;!&ndash;supplierId:  ,payStatus:2,orderStatus:1&ndash;&gt;&ndash;&gt;-->
                <router-link :to="'/allorders/neworder/'+supplierId" require>新订单</router-link>
            </div>
            <div class="tab-item">
                <!--&lt;!&ndash;&lt;!&ndash;supplierId:  ,payStatus:2,orderStatus:2&ndash;&gt;&ndash;&gt;-->
                <router-link :to="'/allorders/good/'+supplierId" require>待发货</router-link>
            </div>
            <div class="tab-item">
                <!--&lt;!&ndash;&lt;!&ndash;supplierId:  ,payStatus:2,orderStatus:3&ndash;&gt;&ndash;&gt;-->
                <router-link :to="'/allorders/delivery/'+this.$route.params.supplierId" require>已完成</router-link>
            </div>
            <div class="tab-item">
                <!--&lt;!&ndash;&lt;!&ndash;supplierId:  ,payStatus:2,orderStatus:6&ndash;&gt;&ndash;&gt;-->
                <router-link :to="'/allorders/reject/'+this.$route.params.supplierId" require>已驳回</router-link>
            </div>

            <div class="tab-item">
                <!--&lt;!&ndash;&lt;!&ndash;supplierId:  ,payStatus:2,orderStatus:6&ndash;&gt;&ndash;&gt;-->
                <router-link :to="'/allorders/reject/'+6" require></router-link>
            </div>
        </div>

        <keep-alive>
            <router-view/>
        </keep-alive>

    </div>
</template>

<script>
    export default {
        name: "allorders",
        data() {
            return {
                suppId: "",
                supplierId:0,
                id: 0,
            orderId:0
            }
        },

        mounted() {
            let that = this;
            //请求数据
            let supplierId = that.$route.params.supplierId;
            console.log('全部订单页的supplierId', supplierId)
            that.supplierId = supplierId;
            console.log('suppId', that.supplierId)
            // that.$fetch(apiUrl + '/page/supplier/order/findPage', {
            //     "supplierId": supplierId,
            //     "orderStatus": 2,
            //     "newOrder": 2
            // })
            //     .then((response) => {
            //         console.log(response, "全部订单请求的res")
            //         // this.list = response.data[1].list;
            //     })
        },

        methods: {
            prePage(){
                let supplierId = this.supplierId;
                console.log(supplierId, "-----10------");
                this.$router.push({name: "home", params: {id: supplierId}})
            }
        },




    }
</script>

<style scoped lang="scss">
    .appall {
        width: 100%;
        height: 100%;
        /*background: #ECEBEB;*/
        /*background: pink;*/
        /*position: fixed;*/
        /*top: 0;*/

    }
    .heder {
        color: #222222;
        font-size: 1.03rem;
        font-weight: bold;
        height: 2.34rem;
        width: 100%;
        line-height: 2.34rem;
        background: #FFD100;
        position: fixed;
        text-align: center;
        z-index: 100;
        /*overflow: hidden;*/

        .title {
            display: inline-block;


            /*margin: 0 auto;*/
        }

        .heder_img {
            width: 0.65rem;
            height: 1rem;
            left: 1.33rem;
            top: 0.65rem;
            position: absolute;

        }
    }

    .tab{
        width: 100%;
        /*height: 10%;*/
        height:2rem;
        line-height: 2rem;
        background: #fff;
        border-bottom: 1px solid black;
        text-align: center;
        position: fixed;
        top: 2.3rem;
        z-index: 100;
        padding: 0 2rem;
        box-sizing: content-box;
        /*margin-bottom: 5rem;*/
        margin: 0 auto;
        .tab-item{
            float: left;
            width:20% ;
            height: 100%;
            a{
                display: block;
                position: relative;
                text-decoration: none;
                font-size:0.7rem ;
                font-weight: bold;
                color:#333;
                /*background: red;*/
                &.router-link-active{
                    /*background: red;*/
                    /*color: green;*/
                   font-size: 15px;
                    font-weight: bold;

                }
            }
        }

    }
















    /*.tab {*/
    /*padding-top: 1.5rem;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*!*height: 200px;*!*/
    /*!*background: aqua;*!*/
    /*position: fixed;*/
    /*top: 2rem;*/

    /*.tab-item {*/
    /*width: 25%;*/
    /*!*height: 100px;*!*/
    /*float: left;*/
    /*text-align: center;*/
    /*!*&:nth-child(even){*!*/
    /*!*background: yellow;*!*/
    /*!*}*!*/
    /*a {*/
    /*!*display: block;*!*/
    /*position: relative;*/
    /*out-line: none;*/
    /*text-decoration: none !important;*/

    /*color: black;*/

    /*&.router-link-active {*/
    /*color: #FFD100;*/
    /*!* &:after{*/
    /*content: '';*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*bottom: 1px;*/
    /*width: 35px;*/
    /*height: 2px;*/
    /*transform: translateX(-50%);*/
    /*background: #FFD100;*/
    /*}*!*/


    /*}*/
    /*}*/
    /*}*/
    /*}*/


</style>

