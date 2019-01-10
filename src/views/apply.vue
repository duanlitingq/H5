<template>
    <div class="apply">
        <div class="heder">
            <img src="../assets/image/fanhui.png" class="heder_img"  @click="prePage()" alt="">
            <div class="title">申请提现</div>
        </div>
        <!--内容-->
        <div class="cen">
             <div class="each_price">
                 <span class="list_name">提现金额:</span>
                 <span class="ipt_s">
                      <input type="text"
                             v-model="money"
                             placeholder="请输入提现金额">
                 </span>
                 <!--<div class="pric_icn">￥{{amountOfMoney}}</div>-->
             </div>
             <div>
                 <span  class="list_name">收款银行:</span>
                 <span class="ipt_s">

                     <select 
                             name="" v-model="bank" >
                         <option value="">请选择银行</option>
                         <option :value="item" v-for="item in bankList">{{item}}</option>
                     </select>
                 </span>
             </div>
            <div>
                <span  class="list_name">开户行:</span>
                <span class="ipt_s">
                     <input type="text"
                            v-model="branch_bank"
                            placeholder="请输入开户行"
                            >
                 </span>
            </div>
             <div>
                 <span  class="list_name">银行卡号:</span>
                     <span class="ipt_s">
                         <!--<div class="pric_icn">{{bankCard}}</div>-->
                         <input type="text"
                                v-model="card"
                                maxlength="19"
                                placeholder="请输入卡号">
                     </span>
             </div>
             <div>
                 <span  class="list_name">收款人:</span>
                     <span class="ipt_s">
                         <!--<div class="pric_icn">{{receiveName}}</div>-->
                         <input type="text" v-model="Payee" placeholder="请输入姓名">
                     </span>
             </div>
             <div>
                 <span  class="list_name">手机号:</span>
                     <span class="ipt_s">
                          <!--<div class="pric_icn">{{phone}}</div>-->
                         <input type="text"
                                v-model="phone"
                                placeholder="银行卡预留手机号"
                                maxlength="11"
                                onkeyup="this.value=this.value.replace(/\D/g,'')"
                                onafterpaste="this.value=this.value.replace(/\D/g,'')">
                     </span>
             </div>
        </div>
        <div class="btn_div">
            <!--<button class="btn" :disabled="isDisable" @click="goto('/submit')">提交申请</button>-->
            <button class="btn" :disabled="isDisable" @click="intSmint()">提交申请</button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "apply",
        data(){
            return{
                // amountOfMoney:"",//提现金额
                // bankName:"",//银行名称
                // bankCard:"",//银行卡
                // receiveName:"",//收款人姓名
                // pening:"",//开户行
                money:"",//提现金额
                bank:"",//收款银行
                card :"",//银行卡号
                Payee:"",//收款人
                phone:"",//手机号
                isDisable:false,//按钮状态
                supplierId: 0,
                branch_bank:"",//开户行
                bankList: [
                    '中国中央银行','中国人民银行','中国银行','工商银行','农业银行','建设银行','交通银行',
                    '招商银行','中信银行','民生银行','上海浦发银行','渤海银行',
                    '交通银行','光大银行','中国邮政储蓄银行','天津银行',
                    '上海银行','北京英航',
                    '南京银行','中信银行',
                    '华夏银行'
                ],
                id: 0,
                totalMoney:"",//判断不能大于当前余额
                moneid:0
            }
        },
        mounted(){
            let that = this;
            let supplierId = that.$route.params.supplierId;
            this.supplierId = supplierId;
            console.log("mounted申请提现的supplierid", supplierId)

            let id = that.$route.params.id;
            this.id = id;
            console.log('mounted申请提现的id',id)



            //请求home页余额的数据在当前页做判断
            let moneid = that.$route.params.id;
            console.log(moneid, '00000')
            that.moneid = moneid;
            that.$fetch(apiUrl + '/page/supplier/manage/getSupplier', {
                "supplierId": moneid
            })
                .then((response) => {
                    console.log(response,"---判断金额请求")
                    that.totalMoney = response.data[1].totalMoney;
                })

        },
        methods:{

            //返回
            prePage(router) {
                let supplierId = this.supplierId;
                console.log(supplierId, "methods申请提现的supplierId");
                this.$router.push({name: "home", params: {id: supplierId}})
            },

            //提交
            intSmint(){
                let that = this;
                 let ver =/^[1-9]{1}(\d{15}|\d{16}|\d{18})$/;
                let  reg=/^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;
                if(that.money == "" || that.bank == "" || that.card == "" || that.Payee == "" || that.phone == "" ||that.branch_bank == ""){
                    Toast({
                        message: '请输入完整信息',
                        position: 'center',
                        duration: 1500 //持续时间
                    });
                    return false;
                }
                if(that.money .indexOf('.') != -1){
                    if(that.money > this.totalMoney){
                        Toast({
                            message: '不能大于当前余额',
                            position: 'center',
                            duration: 1500
                        });
                        return false;
                    }
                }



                if(!ver.test(that.card)) {
                    Toast({
                        message: '银行卡格式不对',
                        position: 'center',
                        duration: 1500
                    });
                    return false;
                }

                console.log(this.totalMoney,"---点击判断的值")

                if(!reg.test(that.phone)){
                    Toast({
                        message: '手机格式不正确',
                        position: 'center',
                        duration: 1500
                    });
                    return false;
                }
                that.isDisable = true;//按钮禁用
                Toast({
                    message: '提交成功',
                    position: 'center',
                    duration: 1500
                });

                //跳转路由
                let supplierId = that.supplierId;
                console.log(supplierId,'这是supplierId')
                that.$router.push({name: "submit", params: {supplierId: this.$route.params.id}})

                //请求提交申请数据
                that.$fetch(apiUrl+'/page/supplier/wallet/doAdd',{
                    "amountOfMoney":this.money,
                    "bankName":this.bank,
                    "bankCard":this.card,
                    "receiveName":this.Payee,
                    "phone":this.phone,
                    "branchBankName":this.branch_bank,
                    "supplierId":this.supplierId

                })
                console.log(this.money,'提交money')





            },



            lsj(){
                let supplierId = that.$route.params.id;
                this.supplierId = supplierId;
                console.log("supplierid", supplierId)
                that.supplierId = supplierId;
                //请求数据
                that.$fetch(apiUrl + '/page/supplier/wallet/doAdd', {
                    "supplierId": supplierId,
                    "orderStatus": 1,
                    "payStatus": 2
                })
                    .then((response) => {
                        console.log(response, "申请提现")

                        if (response.success) {
                            if (response.data[1].size > 0) {
                                that.list = response.data[1].list;
                            } else {
                                //跳转详情页面
                            }
                        } else {
                            console.log("1111")
                        }
                    })

                console.log(this.amountOfMoney)
            },







            // breakPage(router){
            //     let supplierId = this.supplierId;
            //     console.log(supplierId,"-----------");
            //     this.$router.push({name:router, params: {id: supplierId}})
            // },




        },


    }
</script>

<style scoped lang="scss">
   
    .apply{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
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
    .cen{
        margin-top: 2.34rem;
        font-size: 0.96rem;
        color: #666666;
        .each_price{
            position: relative;
            .pric_icn{
                position: absolute;
                width: 0.64rem;
                height: 0.74rem;
                top: 0.22rem;
                left:7.8rem;
            }
        }
        div{
            margin-bottom: 1.3rem;

            .list_name{
                margin-left: 2.82rem;
            }
            .ipt_s{
                width: 9.7rem;
                height: 1.6rem;
                border: 0.05rem solid #AAAAAA;
                border-radius: .3rem;
                display: inline-block;
                float: right;

                margin-right: 2.61rem;
                select{
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    /*border: solid 1px #ccc;*/
                    background: url("../assets/image/jietou.png") no-repeat scroll right center transparent;
                }
            }
            select{
                border: none;
                width: 8.7rem;
                height: 1.44rem;
                float: right;
                border-radius: .3rem;
                outline:none;
                margin-top: .09rem;
                background: white;
                option{
                    height: 10px;
                    background:#fff;
                    outline:none;
                }
            }
            input{
                border: none;
                width: 9.5rem;
                height: 1.44rem;
                float: right;
                border-radius: .3rem;
                outline:none;
                margin-top: .09rem;
            }
        }

    }
    .btn_div{
        width: 100%;
        text-align: center;
        .btn{
            width: 9.12rem;
            height: 2.34rem;
            line-height: 2.34rem;
            text-align: center;
            background: #00A0E9;
            color: #FFFFFF;
            font-size: 0.96rem;
            border-radius: .3rem;
            margin-top: 2.88rem;
            outline:none;
            border: none;
        }
    }

</style>