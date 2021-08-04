<template>
  <div class="validate">
    <el-form
      :model="fieldForm"
      status-icon
      :rules="rules"
      ref="fieldForm"
      label-width="100px"
      class="demo-fieldForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          class="m-input"
          placeholder="请输入6到20个字符的用户名"
          v-model="fieldForm.name"
        ></el-input>
        <el-input style="position: fixed; bottom: -9999px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          class="m-input"
          :type="passwordType"
          @focus="passwordType = 'password'"
          v-model="fieldForm.pwd"
          autocomplete="new-password"
          placeholder="请输入6到20个字符的密码"
        ></el-input>
        <span class="is-show-pwd pa" @click="showPassword">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item label="金额" prop="money">
        <el-input
          type="money"
          class="m-input"
          placeholder="请输入0～999999999.99范围的金额"
          v-model="fieldForm.money"
        ></el-input>
      </el-form-item>
      <el-form-item label="文字超出" prop="text">
        <el-input
          type="textarea"
          v-model="fieldForm.text"
          class="m-input"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="有效url" prop="url">
        <el-input
          class="m-input"
          placeholder="请输入url"
          v-model="fieldForm.url"
        ></el-input>
      </el-form-item>
      <el-form-item label="小写字母" prop="lowercase">
        <el-input
          class="m-input"
          placeholder="请输入小写字母"
          v-model="fieldForm.lowercase"
        ></el-input>
      </el-form-item>
      <el-form-item label="大写字母" prop="uppercase">
        <el-input
          class="m-input"
          placeholder="请输入大写字母"
          v-model="fieldForm.uppercase"
        ></el-input>
      </el-form-item>
      <el-form-item label="字母" prop="letter">
        <el-input
          class="m-input"
          placeholder="请输入字母"
          v-model="fieldForm.letter"
        ></el-input>
      </el-form-item>
      <el-form-item label="正整数" prop="integer">
        <el-input
          class="m-input"
          placeholder="请输入正整数"
          v-model="fieldForm.integer"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input
          class="m-input"
          placeholder="请输入邮箱"
          v-model="fieldForm.mail"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          class="m-input"
          placeholder="请输入手机号"
          v-model="fieldForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="固话" prop="telphone">
        <el-input
          class="m-input"
          placeholder="请输入固话"
          v-model="fieldForm.telphone"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCardNumber">
        <el-input
          class="m-input"
          placeholder="请输入身份证号码"
          v-model="fieldForm.idCardNumber"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from "@/utils/modules/validate";

export default {
  name: "Validate",
  data() {
    let validateUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("url不能为空"));
      }
      let result = validate.validURL(value);
      if (!result) {
        callback(new Error("非有效url"));
      } else {
        callback();
      }
    };
    let validateLowerCase = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      let result = validate.validLowerCase(value);
      if (!result) {
        callback(new Error("非小写字母"));
      } else {
        callback();
      }
    };
    let validateUpperCase = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      let result = validate.validUpperCase(value);
      if (!result) {
        callback(new Error("非大写字母"));
      } else {
        callback();
      }
    };
    let validateIfNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      let result = validate.validIfNum(value);
      if (!result) {
        callback(new Error("非正整数"));
      } else {
        callback();
      }
    };
    let validateAlphabets = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      let result = validate.validAlphabets(value);
      if (!result) {
        callback(new Error("非字母"));
      } else {
        callback();
      }
    };
    return {
      fieldForm: {
        name: "",
        pwd: "",
        money: "",
        text: "",
        url: "",
        lowercase: "",
        uppercase: "",
        integer: "",
        letter: "",
        mail: "",
        phone: "",
        telphone: "",
        idCardNumber: "",
      },
      rules: {
        name: [{ validator: validate.validateName, trigger: "blur" }],
        pwd: [{ validator: validate.validatePassword, trigger: "blur" }],
        money: [{ validator: validate.validateNumber, trigger: "blur" }],
        text: [{ validator: validate.validateText, trigger: "blur" }],
        url: [{ validator: validateUrl, trigger: "blur" }],
        lowercase: [
          {
            validator: validateLowerCase,
            trigger: "blur",
          },
        ],
        uppercase: [
          {
            validator: validateUpperCase,
            trigger: "blur",
          },
        ],
        integer: [{ validator: validateIfNum, trigger: "blur" }],
        letter: [
          {
            validator: validateAlphabets,
            trigger: "blur",
          },
        ],
        mail: [{ validator: validate.validateEmail, trigger: "blur" }],
        phone: [{ validator: validate.validatePhone, trigger: "blur" }],
        telphone: [
          {
            validator: validate.validateTelephone,
            trigger: "blur",
          },
        ],
        idCardNumber: [
          {
            validator: validate.validateIdCardNumber,
            trigger: "blur",
          },
        ],
      },
      passwordType: "text",
    };
  },
  methods: {
    showPassword() {
      this.passwordType === "password"
        ? (this.passwordType = "text")
        : (this.passwordType = "password");
    },
  },
};
</script>

<style lang="scss" scoped>
.validate {
  .m-input {
    // margin: 20px 20px;
    width: 600px;
  }
}
</style>

<style lang="scss">
@import "@/styles/theme.scss";

.el-textarea__inner:focus {
  @include border_color();
}

.el-button.is-plain:focus,
.el-button.is-plain:hover {
  @include border_color();
  @include hover_color();
}
</style>