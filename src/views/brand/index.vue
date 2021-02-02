<template>
  <div class="entity-box">
    <!--    操作-->
    <div class="execute-box">
      <el-button-group>
        <el-button size="small" type="danger" @click="editDialog=true,formData={},action='新增供应商'">新建</el-button>
        <el-button size="small" type="danger" @click="delDialog=true">删除</el-button>
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
          ref="selection"
          @selection-change="selectionChangeListener"
          style="width: 100%">

        <el-table-column
            prop="id"
            label="品牌id"
            width="100px"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="brandName"
            label="品牌名称">
        </el-table-column>
        <el-table-column
            prop="brandSite"
            label="品牌官网">
        </el-table-column>
        <el-table-column
            prop="brandDesc"
            label="品牌简介">
        </el-table-column>
        <el-table-column
            label="品牌logo">
          <template slot-scope="props">
            <el-avatar shape="square" size="medium" style="vertical-align: middle"
                       :src="props.row.brandLogo"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="id">
            <el-button size="mini" type="primary" @click="editDialog = true,findById(id.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delLine(id.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--    分页-->
    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="pageChange"
      >
      </el-pagination>
    </div>
    <!--    新建/编辑弹框-->
    <el-dialog
        :title=action
        :visible.sync="editDialog"
        width="40%">
      <el-form ref="form" label-width="100px" size="small">

        <el-form-item label="品牌名称：">
          <el-input placeholder="请输入品牌名称" v-model="formData.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌官网：">
          <el-input placeholder="请输入品牌官网" v-model="formData.brandSite"></el-input>
        </el-form-item>
        <el-form-item label="品牌简介：">
          <el-input placeholder="请输入品牌简介" v-model="formData.brandDesc"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo：">
            <el-upload
                class="avatar-uploader"
                action=""
                :http-request="avatarUpload"
                accept="image/*"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="success" @click="editDialog = false,addOrEdit()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--    确认删除弹框-->
    <el-dialog
        title="温馨提示"
        :visible.sync="delDialog"
        width="30%">
      <span>您确定要删除{{ ids }}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false" size="small">取 消</el-button>
        <el-button type="success" @click="delDialog = false,deleteByIds()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>