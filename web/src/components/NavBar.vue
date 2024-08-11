<template>
<div class="navbar">
  <el-menu
    :default-active="route.fullPath"
    mode="horizontal"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/news">新闻中心</el-menu-item>
    <el-menu-item index="/product">产品与服务</el-menu-item>
    <el-menu-item index="" @click="handleClick">登录</el-menu-item>
  </el-menu>
  <div class="text-right">企业门户官网</div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const handleClick = () => {
  window.location.href = 'http://localhost:8080/#/login';
};
</script>

<style lang="scss" scoped>
.navbar {
  position: static;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  .text-right {
    font-size: 2rem;
    line-height: 2rem;
  }
  .el-menu {
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  }
}
</style>