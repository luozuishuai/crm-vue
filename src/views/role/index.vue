<template>
  <div class="entity-box">
    <!--    操作-->
    <div class="execute-box">
      <el-button-group>
        <el-button size="small" type="danger" @click="editDialog=true,formData={},action='新增角色',$refs.tree.setCheckedKeys([])">新建</el-button>
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
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="id">
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="角色名称">
        </el-table-column>
        <el-table-column
            prop="roleDesc"
            label="角色描述">
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

        <el-row :gutter="10" style="height: 300px">
          <el-col :span="10">
            <el-form-item label="角色名称：">
              <el-input placeholder="角色名称" v-model="formData.roleName"></el-input>
            </el-form-item>

            <el-form-item label="角色描述：">
              <el-input placeholder="角色描述" v-model="formData.roleDesc"></el-input>
            </el-form-item>
          </el-col>

          <h3>分配权限</h3>
          <el-scrollbar style="height: 100%">
            <el-col :span="14">

              <el-tree
                  default-expand-all
                  :data="allMenuList"
                  ref="tree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps">
              </el-tree>

            </el-col>
          </el-scrollbar>
        </el-row>


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