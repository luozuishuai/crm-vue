<template>
  <div class="entity-box">
    <!--    操作-->
    <div class="execute-box">
      <el-button-group>
        <el-button size="small" type="danger" @click="editDialog=true,formData={},action='新增分类'">新建</el-button>
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
          row-key="id"
          :tree-props="{children: 'children'}">
          style="width: 100%">
        <el-table-column
            prop="categoryName"
            label="分类名称">
        </el-table-column>
        <el-table-column
            prop="categoryDesc"
            label="分类描述">
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

<!--        <el-row>-->
<!--          <el-col :span="8">-->
            <el-form-item label="分类名称" >
              <el-input placeholder="请输入分类名称" v-model="formData.categoryName"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="8">-->
            <el-form-item label="分类描述">
              <el-input placeholder="请输入分类描述" v-model="formData.categoryDesc"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="8">-->
        <el-form-item label="所属分类">
        <treeselect
            v-model="formData.parentId"
            :options="categoryLevelList"
            :show-count="true"
            placeholder="选择所属分类"
            :normalizer="normalizer"
        />
        </el-form-item>
<!--          </el-col>-->
<!--        </el-row>-->


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="success" @click="editDialog = false,addOrEdit()" size="small" >确 定</el-button>
      </span>
    </el-dialog>
<!--    确认删除弹框-->
    <el-dialog
        title="温馨提示"
        :visible.sync="delDialog"
        width="30%">
      <span>您确定要删除{{ids}}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false" size="small">取 消</el-button>
        <el-button type="success" @click="delDialog = false,deleteByIds()" size="small" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>