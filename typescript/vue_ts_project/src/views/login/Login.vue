<template>
   <div id="login">
    <LoginHeader>
      <!-- :model数据对象 :rules表单验证规则 ref为了在methods中对指定的表单进行验证 -->
      <el-form
        slot="container"
        :model="ruleForm"
        :rules="rules"
        ref="refid"
        label-position="left"
        label-width="0px"
      >
        <div class="title">
          <h3>账号密码登陆</h3>
        </div>
        <!-- username -->
        <!-- 表单域验证对象的子规则 prop=“规则名称” -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <!--在输入框中内嵌一个icon-->
            <i class="el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <!-- password -->
        <!-- 表单域验证对象的子规则 prop=“规则名称” -->
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码">
            <!--在输入框中内嵌一个icon-->
            <i class="el-icon-view"></i>
          </el-input>
        </el-form-item>
        <!-- Login button -->
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click.native.prevent="handleSubmit"
            :loading="loginLoading"
          >点击登陆</el-button>
        </el-form-item>
        <!-- autoLogin  forgetPassword -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">七天自动登录</el-checkbox>
          <!-- <el-button type="text" class="forgetPassword" @click="$router.push('./password')">忘记密码</el-button> -->
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>
<script lang="ts">
import LoginHeader from './LoginHeader.vue';
import {LoginReq} from "../../api/apis";
import { Component, Provide, Vue} from "vue-property-decorator";
@Component({
  components:{
    LoginHeader
  }
})
export default class login extends Vue {
  // 数据对象
  @Provide() loginLoading:boolean = false
  @Provide() ruleForm:{
    // 装饰器名称
    username:string,
    password:string|number
  } = {
    username:"",
    password:""
  }
  @Provide() rules = {
    username:[{required:true,message:"请输入账号",triggle:'blur'}],
    password:[{required:true,message:"请输入密码",triggle:'blur'}]
  }
  handleSubmit():void {
    (this.$refs["refid"] as any).validate((valid:boolean) => {
      if(valid) {
        this.loginLoading = true;
        (this as any).$axios.post(
          "user/login", this.ruleForm).then((res:any) => {
            this.loginLoading = false;
            // 存储token
            localStorage.setItem("tsToken", res.data.token);
            (this as any).$router.push("/");
          }).catch(() => {
          this.loginLoading = false;
        })
      }
    })
  }
}
</script>