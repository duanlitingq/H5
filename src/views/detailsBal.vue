<template>
    <div class="home" >
        <!--黄色头部-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="prePage()" alt="">
            <div class="title">余额明细</div>
        </div>

        <!--请求数据为空的时候，显示这个div-->
        <div class="text" v-bind:style="{paddingTop:padd,background:'#eee',textAlign:'center'}">{{innerHTML}}</div>

        <div class="header-content">
            <ul class="list"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <!--v-for="(item,index) in list" :key="index"-->
                <li class="lis" @click="orderDetail(item.id,item.inOrOut)" v-for="(item,index) in list" :key="item.id">
                    <span class="lis-left lispan">{{item.inOrOutName}}</span>
                    <span class="lis-right lispan">{{item.changeMoney}}</span>
                    <span class="time-lis lis-right lispan ">{{item.createTime}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import { InfiniteScroll  } from 'mint-ui';

    export default {
        name: "detailsBal",
        data(){
            return{
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
                let id = that.$route.params.id
                console.log(id,'当前打印')
                let supplierId = that.$route.params.supplierId;
                let pageSize = this.pageSize;
                // this.supplierId = supplierId;
                console.log("mounted申请提现的supplierid", supplierId)
                that.supplierId = supplierId;
                that.id = id;

                //请求数据
                that.$fetch(apiUrl+'/page/supplier/wallet/findSupplierWalletLog',{
                    "id":id,
                    "payStatus":2,
                    "pageNum":pageNum,
                    "pageSize":pageSize
                })
                    .then((response) => {
                        console.log(response,'余额明细mounted的response请求')
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


            prePage() {
                let that = this;

                let supplierId = that.$route.params.supplierId;

                console.log(supplierId, "methods申请提现的supplierId");
                this.$router.push({name: "home", params: {id: supplierId}})
            },

            orderDetail(id,inOrOut) {
                if(inOrOut == 2){
                    let that = this;
                    let supplierId = that.$route.params.supplierId;

                    this.$router.push({name: 'record', query: {id:id,supplierId:supplierId,preRouter:"detailsBal"}})
                }else {
                    console.log('这是点击打印')
                }
            },


            goto (path){
                this.$router.push(path)
            },
        },
        component: {
        InfiniteScroll
        }

    }
</script>

<style scoped>
    li{
        list-style: none;
    }
    .home{
        width: 100%;
        height: 100%;
        background-color: #ECEBEB;
        position: fixed;
        overflow: auto;
        text-align: center ;
    }
    .heder {
        color: #222222;
        font-size: 1.03rem;
        font-weight: bold;
        width: 100%;
        height: 2.34rem;
        line-height: 2.34rem;
        background: #FFD100;
        display: flex;
        position: fixed;
    }
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
    .header-content{
        width: 90%;
        height: 100%;
        margin: 0 auto;
        margin-top: 3.5rem;
        /*background: pink;*/
        /*margin-top: 3.5rem;*/
    }
    .lis{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        background: #fff;
        margin-top: 1rem;
        display: flex;
        text-align: center;
        align-content: center;
        justify-content: center;
    }
    .lis-left{
        flex: 1;
        float: left;
        /*margin-right: 1rem;*/
    }
    .lis-right{
        float: right;
        margin-left: 4rem;
    }
    /*.lispan{*/
    /*width: 32%;*/
    /*height: 50%;*/

    /*}*/
    .time-lis{
        width: 44%;
        margin-left: 2rem;
    }
    span{
        font-size:0.7rem;
    }

</style>