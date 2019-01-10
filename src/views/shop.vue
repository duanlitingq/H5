<template>
    <div class="shop">

        <div class="heder">
            <div class="title">选择店铺</div>
        </div>

        <div class="shop-list">

            <div class="shop-li"  v-for="(shoplis ,index) in shoplist" :key="index" @click="ue_shop(shoplis)">
                <img src="../assets/image/dplog.png" alt="">
                <div class="shop-text">{{shoplis.name}}</div>
                <!--店铺编号11-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shop",
        data(){
            return{
                   shoplist:""//店铺数据
            }

        },
//created
        mounted () {
            let that =this;
            let token = localStorage.getItem('token')
            let dataObj = {token,pageSize:10,pageNum:1}

            //请求店铺数据
            that.$fetch(apiUrl+'/page/supplier/manage/findPage', dataObj)
                .then((response) => {
                    console.log(response)
                    that.shoplist = response.data[1].list
                    // console.log( that.shoplist)
                })
        },
        methods:{
            //点击店铺跳转
            ue_shop(item){
                let that =this;
                let id = item.id
                that.$router.push({
                    path: `/home/${id}`,
                })
            },
                // goto (path){
                //     this.$router.push(path)
                // },

        }
    }
</script>

<style scoped lang="scss">
.shop{
        width: 100%;
        height: 100%;
        /*background-color: red;*/
        position: fixed;
        overflow: auto;
        text-align: center;
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
    margin-bottom: 4.8rem;
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
  .shop-list{
      width: 99%;
      height: 17rem;
      /*border: 1px solid black;*/
      .shop-li{
          width: 14rem;
          height: 2.9rem;
         background: #1AA1E6;
          margin: 0 auto;
          margin-bottom: 3rem;
          text-align: center;
          color: white;
          border-radius: 5px;
          img{
              /*margin: 1.1rem 1rem 0 0;*/
              display: inline-block;
              position: relative;
              top:0.8rem;
              left:2rem;
          }
          .shop-text{
              width: 10rem;
              height: 2.5rem;
              display: inline-block;
              position: relative;
              top:0.5rem;
          }
      }
  }

.shop_name{
    width: 12.21rem;
    height: 2.34rem;
    line-height: 1.3rem;
    background: #00a0e9;
    border-radius: 0.3rem;
    margin: 0 auto;
    margin-top: 0.9rem;
    display: flex;
    align-items: center;
    margin-bottom: 2.93rem;
    img{
        width: 1.33rem;
        height: 1.22rem;
        margin-left: 0.37rem;
    }
    div{
        display: inline-block;
        color: #fff;
        font-size: 1.01rem;
        width: 10.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 0.33rem;
    }


}
</style>