<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
          class="login-form"
        >
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到 {{ title }}！</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              auto-complete="on"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-password" @click="handlePassword">
              <svg-icon
                :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("用户名密码不能小于5位"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      title: this.$baseTitle,
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
      redirect: undefined,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then((data) => {
              this.loading = false;
              if (data) {
                this.$router.push("/").catch((err) => console.log(err));
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message.error("error submit!!"); //登录失败提示错误
          return false;
        }
      });
    },
    handlePassword() {
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/styles/variables.scss";

.login-container {
  height: 100vh;
  background: url("~@/assets/login_images/background.jpg") center center fixed
    no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgba(14, 18, 26, 1);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 60px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 14px;
    left: 15px;
    z-index: $base-z-index;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 58px;
        color: $base-font-color;
        background: #f6f4fc;
        border: 0;
        caret-color: $base-font-color;
      }
    }
  }
}
</style>


