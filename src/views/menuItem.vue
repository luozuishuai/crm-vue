<template>
  <div class="box">

    <el-menu-item :index="item.routerPath"
                  v-if="item.children == null || item.children.length==0">
      <i :class="item.menuIcon"></i>
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
    <!--          能展开的-->
    <el-submenu :index="item.routerPath" v-if="item.children != null && item.children.length>0">
      <template slot="title">
        <i :class="item.menuIcon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </template>

      <menu-item v-for="(item1,index1) in item.children" :key="index1" :item="item1"/>
    </el-submenu>

  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: ['item'],
}
</script>

<style scoped>

</style>