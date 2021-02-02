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
                :default-active="$route.path"
                router
                class="el-menu-vertical-demo">

              <menu-item v-for="(item,index) in menuList" :key="index" :item="item"/>

            </el-menu>
          </el-scrollbar>

      </el-aside>
      <el-container>
        <el-header>欢迎登陆后台管理系统</el-header>
        <el-main>
          <div class="main-body">
            <el-scrollbar style="height: 100%">
            <router-view/>
            </el-scrollbar>
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