<template>
  <div class="login">
    <div class="login__log"><img src="http://www.dell-lee.com/imgs/vue3/near.png" alt=""></div>
    <div class="login__box">
      <input class="login__box__input" type="text" placeholder="请输入手机号" v-model="data.moible">
    </div>
    <div class="login__box">
      <input class="login__box__input" type="password" placeholder="请输入密码" v-model="data.password">
    </div>
    <div class="login__submit" @click="handelLogin">登录</div>
    <div class="register">点击注册</div>
  </div>
</template>
<script>
import { defineComponent,reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const router = useRouter();
    const data = reactive({
      moible:'',
      password:''
    })
    const handelLogin = ()=> {
      axios.post('https://www.fastmock.site/mock/01ff76cf40fe3125f06a4bb089b8041a/jd/login',{
        moible:data.moible,
        password:data.password,
      }).then(() => {
        alert('登录成功')
      }).catch(err => {
         alert(err)
      })
      localStorage.loginFlag = true
      router.push({name:'Home'})
    }
    return {
      handelLogin,
      data
    }
  },
})
</script>

<style lang="scss">
@import '@/assets/style/viriables.scss'; 
.login{
  padding: 1rem .2rem;
  text-align: center;
  &__log{
    box-sizing: border-box;
    width: .68rem;
    height: .68rem;
    margin: .2rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__box{
    width: 100%;
    height: .38rem;
    background: #f1f1f1;
    margin-bottom: 0.1rem;
    border-radius: .05rem;
    border: 2px solid rgb(214, 214, 214);
    &__input {
      height: .38rem;
      width: 100%;
      border: none;
      outline: none;
      padding-left: .2rem;
      box-sizing: border-box;
      color: $content-colofont;
    }
  }
  &__submit{
    color: #fff;
    font-size: .16rem;
    background: deepskyblue;
    text-align: center;
    height: .48rem;
    line-height: .48rem;
    width: 100%;
    cursor: pointer;
  }
  .register{
    margin-top: 0.1rem;
    cursor: pointer;
  }
}
</style>