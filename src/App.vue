<template>
  <!--  <div id="app">-->
  <!--    <div id="nav">-->
  <!--      <router-link to="/">Home</router-link> |-->
  <!--      <router-link to="/about">About</router-link>-->
  <!--    </div>-->
  <!--    <router-view/>-->
  <!--  </div>-->
  <div class="box">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,body,.box {
  height: 100%;
  width: 100%;
}

.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
