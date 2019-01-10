<template>
    <div class="login">
           <div class="logo">
               <img src="../assets/image/logo.png" alt="">
           </div>
        <div class="list_ipt">
            <input type="text"  v-model="loginForm.username" placeholder="请输入账号">
            <img class="list_img" src="../assets/image/name.png" alt="">
        </div>
        <div  class="list_ipt">
            <input type="password" v-model="loginForm.password" placeholder="请输入密码">
            <img class="list_imgs" src="../assets/image/password.png" alt="">
        </div>
        <div class="list_btn">
            <button  @click="login()" v-bind:disabled="isDisable">确认登录</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Toast } from 'mint-ui';
    export default {
        name: 'login',
        components: {

        },
        data(){
            return{
                isDisable:false,//按钮禁用状态
                loginForm: {
                    username: '',//用户名
                    password: '',//密码
                }
            }
        },
        mounted(){

        },
        methods:{



            login () {
                // alert('111')
                let that = this;
                if (that.loginForm.username === '' || that.loginForm.password === '') {
                    Toast({
                        message: '账号或密码不能为空',
                        position: 'center',
                        duration: 1500
                    });
                    return false;
                } else {
                    // alert('222')
                    // that.isDisable = true;//按钮禁用
                    // alert('000')
                    this.$post(apiUrl+'/page/supplier/userLogin/login',{"userName":that.loginForm.username,"password":that.loginForm.password})
                        .then((response) => {
                            console.log(response)
                            // alert('333')
                            if(response.success == false){
                                Toast({
                                    message: response.message,
                                    position: 'center',
                                    duration: 1500
                                });
                                return false;
                            }
                            // alert('444')
                            if(response.success == true){
                                Toast({
                                    message:'登录成功',
                                    position: 'center',
                                    duration: 1500
                                });
                                setTimeout(function () {
                                    // alert('555')
                                    let toke = response.data[2];
                                    console.log(toke)
                                    localStorage.setItem('token',toke);
                                    that.$router.push('/shop');
                                },1000)
                            }
                        })
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .logo{
        width: 6.9rem;
        height: 6.6rem;
        margin: 0 auto;
        margin-top: 6.1rem;
        margin-bottom: 2.45rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .list_ipt{
        width: 12.2rem;
        height: 2.3rem;
        border-radius: .3rem;
        border: 0.05rem solid  #CCCCCC;
        margin:  0 auto;
        margin-bottom: 1.6rem;
        position: relative;
        .list_img{
            position: absolute;
            width: 1.12rem;
            height:1.17rem;
            top: 0.58rem;
            left: 0.42rem;
        }
        .list_imgs{
            position: absolute;
            width: 0.85rem;
            height:1.17rem;
            top: 0.58rem;
            left: 0.53rem;
        }
        input{
            width: 9rem;
            height: 2.1rem;
            margin-top: 0.1rem;
            border: none;
            outline:none;
            margin-left: 2rem;
        }
        input::-webkit-input-placeholder {
             color: #999999;
             font-size: 0.64rem;
                 }
    }
    .list_btn{
        width: 12.2rem;
        height: 2.3rem;
        margin: 0 auto;
        margin-top: 2.4rem;
        button{
            outline:none;
            line-height: 2.3rem;
            text-align: center;
            font-size: 0.85rem;
            color: #fff;
            border:none;
            background: #00a0e9;
            width: 100%;
            height: 100%;
            border-radius: .3rem;
        }
    }
</style>
