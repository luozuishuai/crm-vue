<template>
  <div class="entity-box">
    <!--    操作-->
    <div class="execute-box">
      <el-button-group>
        <el-button size="mini" type="danger">新建</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </el-button-group>
    </div>
    <!--    查询-->
    <div class="search-box">

    </div>
    <!--    数据表-->
    <div class="table-box">
      <el-table
          stripe
          border
          tooltip-effect="dark"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            align="center"
            label="操作"
        width="180">
          <template>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
    <!--    分页-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>

  </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>