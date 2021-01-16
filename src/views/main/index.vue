<template>
  <div class="main-box">
    <el-container>
      <el-aside width="200px">
        <div class="title-wrapper">
          <img src="../../assets/leijun.jpg" alt="">
          <span>后台管理系统</span>
        </div>
        <el-scrollbar class="scrollbar">
<!--          侧边菜单栏-->
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo">

<!--          不能展开的-->
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <!--          能展开的-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品相关</span>
            </template>

            <!--          不能展开的-->
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">品牌管理</span>
            </el-menu-item>

            <!--          不能展开的-->
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类管理</span>
            </el-menu-item>

            <!--          不能展开的-->
            <el-menu-item index="2-3">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>

          </el-submenu>

          <!--          不能展开的-->
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">运营商管理</span>
          </el-menu-item>

        </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>内衣买小了不结婚了</el-header>
        <el-main>
          <div class="main-body">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less" src="./index.less">
</style>