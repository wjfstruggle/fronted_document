<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <!-- <img
        class="user-avatar"
        :src="avatar + '?imageView2/1/w/40/h/40'"
        alt=""
      /> -->
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Avatar",
  computed: {
    ...mapGetters({
      avatar: "getavatar",
      username: "getname",
    }),
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        case "personalCenter":
          this.personalCenter();
          break;
      }
    },
    personalCenter() {
      this.$router
        .push("/personalCenter/personalCenter")
        .catch((err) => console.log(err));
    },
    logout() {
      this.$baseConfirm("您确定要退出吗?", null, async () => {
        await this.$store.dispatch("LogOut");
        this.$router.push(`/login`).catch((err) => console.log(err));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
