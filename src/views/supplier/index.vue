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
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="id"
            width="55">
        </el-table-column>
        <el-table-column
            prop="supplierName"
            label="运营商名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="supplierContact"
            label="联系人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="supplierPhone"
            label="联系电话"
            width="180">
        </el-table-column>
        <el-table-column
            prop="supplierEmail"
            label="邮箱地址"
            width="180">
        </el-table-column>
        <el-table-column
            prop="supplierAddress"
            label="联系地址"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="supplierBank"
            label="开户银行">
        </el-table-column>
        <el-table-column
            prop="supplierBankCode"
            label="银行账户"
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

        <el-row>
          <el-col :span="8">
            <el-form-item label="运营商名称：" >
              <el-input placeholder="运营商公司名称" v-model="formData.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input placeholder="负责人姓名" v-model="formData.supplierContact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：">
              <el-input placeholder="手机号码" v-model="formData.supplierPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="邮箱：">
              <el-input placeholder="负责人邮箱地址" v-model="formData.supplierEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="地址：">
              <el-input placeholder="公司详细地址" v-model="formData.supplierAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="开户银行：">
          <el-input placeholder="开户银行及支行" v-model="formData.supplierBank"></el-input>
        </el-form-item>

        <el-form-item label="银行账号：">
          <el-input placeholder="完整银行卡号" v-model="formData.supplierBankCode"></el-input>
        </el-form-item>
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