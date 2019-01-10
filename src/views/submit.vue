<template>

    <div class="aps" >
        <!--黄色头部-->
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="prePage()" alt="">
            <div class="title">提交成功</div>
        </div>
        <!--内容区-->
        <div class="content">
            <div class="picture">
                <img src="../assets/image/dui.png" alt="">
                <span class="submit">提交成功</span>
            </div>
            <div class="fanHome" @click="getback()">返回首页</div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "aps",
        data() {
            return {

                supplierId: 0
            }
        },
        mounted() {
            let that = this;
            let supplierId = that.$route.params.supplierId;
            this.supplierId = supplierId;
            console.log("submit的supplierid", supplierId)
            // that.supplierId = supplierId;
        },
        methods: {
            //头部返回按钮
            prePage() {
                let that = this;
                let supplierId = that.$route.params.supplierId;
                console.log(supplierId, "提交返回按钮的supplierId");
                this.$router.push({name: "home", params: {id: supplierId}})
            },

            //返回首页
            getback() {
                let that = this;
                let supplierId = that.$route.params.supplierId;
                console.log(supplierId, "提交返回首页的supplierId");
                this.$router.push({name: "home", params: {id: supplierId}})
            }
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
        .content{
            width:100%;
            height:100%;
            background-color: white;
            box-sizing: content-box;
            .picture{
                width:100%;
                margin: 8rem 0 auto;
                img{
                    width:5rem;
                    height:5rem;
                }
                .submit{
                    display: block;
                    font-size: 1.5rem;
                    font-weight: bold;
                    font-family: "PingFangSC-Semibold";
                    margin-top: 0.2rem;
                }
            }
            .fanHome{
                margin: 0 auto;
                margin-top: 3rem;
                width:50%;
                height:3rem;
                line-height: 3rem;
                font-size: 1.3rem;
                font-weight: bold;
                background-color:deepskyblue;
                border-radius: 0.3rem;
                color:white;
            }
        }
    }


</style>