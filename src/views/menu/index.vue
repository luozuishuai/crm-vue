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
          row-key="id"
          ref="selection"
          @selection-change="selectionChangeListener"
          :tree-props="{children: 'children'}"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="75">
        </el-table-column>
        <el-table-column
            prop="id"
            label="id">
        </el-table-column>
        <el-table-column
            prop="menuName"
            label="权限名称">
        </el-table-column>
        <el-table-column
            prop="menuIcon"
            label="权限图标"
            width="180">
          <template v-slot="obj">
            <i :class="obj.row.menuIcon"></i>
          </template>
        </el-table-column>
        <el-table-column
            prop="menuType"
            label="权限类型">
          <template v-slot="obj">
            <el-tag type="danger" v-if="obj.row.menuType == 'F'">目录</el-tag>
            <el-tag type="success" v-if="obj.row.menuType == 'M'">菜单</el-tag>
            <el-tag type="warning" v-if="obj.row.menuType == 'B'">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="permsSign"
            label="权限标识">
        </el-table-column>
        <el-table-column
            prop="routerPath"
            label="路由地址"
            show-overflow-tooltip>
        </el-table-column>


        <el-table-column
            align="center"
            label="操作"
            width="180">
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


        <el-form-item label="父亲id：">
          <treeselect
              v-model="formData.parentId"
              :options="menuLevelList"
              :show-count="true"
              placeholder="选择所属分类"
              :normalizer="normalizer"
          />
        </el-form-item>


        <el-form-item label="菜单分类：">
          <el-radio-group v-model="formData.menuType">
            <el-radio label="F">目录</el-radio>
            <el-radio label="M">菜单</el-radio>
            <el-radio label="B">按钮</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="菜单图标：" v-if="formData.menuType != 'B'">
          <el-input placeholder="输入一个菜单图标" v-model="formData.menuIcon"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称：">
              <el-input placeholder="菜单名称" v-model="formData.menuName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜单排序：">
              <el-input placeholder="数字越小越靠前" v-model="formData.sorted"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formData.menuType=='B'">
          <el-col :span="12">
            <el-form-item label="请求路径：">
              <el-input placeholder="请求路径" v-model="formData.requestUrl"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="请求方式：">
              <el-input placeholder="请求方式" v-model="formData.requestMethod"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12" v-if="formData.menuType != 'B'">
            <el-form-item label="路由地址：">
              <el-input placeholder="路由地址" v-model="formData.routerPath"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="formData.menuType != 'F'">
            <el-form-item label="菜单标识：">
              <el-input placeholder="菜单标识" v-model="formData.permsSign"></el-input>
            </el-form-item>

          </el-col>
        </el-row>


        <el-form-item label="组件地址：" v-if="formData.menuType=='M'">
          <el-input placeholder="组件地址" v-model="formData.componentPath"></el-input>
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