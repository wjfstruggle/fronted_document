<template>
  <div class="upload-container">
    <el-divider content-position="left">上传图片</el-divider>
    <upload-img
      ref="vabUpload"
      url="/upload"
      name="file"
      :limit="50"
      :size="2"
    ></upload-img>
    <el-button type="primary" @click="handleShow({ key: 'value' })">
      上传图片
    </el-button>
  </div>
</template>

<script>
import UploadImg from "./components/uploadImg";

export default {
  name: "Upload",
  components: {
    UploadImg,
  },
  data() {
    return {};
  },
  methods: {
    handleShow(data) {
      this.$refs["vabUpload"].handleShow(data);
    },
  },
};
</script>

