<template>
  <div class="entity-box">
    <!--    操作-->
    <div class="execute-box">
      <el-button-group>
        <el-button size="small" type="danger" @click="editDialog=true,formData={},imageUrl='',adminRoles=[],action='新增员工',getRoleList()">新建</el-button>
        <el-button size="small" type="danger" @click="delDialog=true">删除</el-button>
        <a class="el-button el-button--danger el-button--small" style="text-decoration:none;" href="http://localhost:9090/admin/excelExport">导出</a>
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

        <el-table-column type="expand">
          <template slot-scope="props">

            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="员工id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="员工账户">
                <span>{{ props.row.adminAccount }}</span>
              </el-form-item>
              <el-form-item label="员工昵称">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="员工邮箱">
                <span>{{ props.row.adminEmail }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.adminPhone }}</span>
              </el-form-item>
              <el-form-item label="员工性别">
                <el-tag v-if="props.row.adminSex=='0'">男</el-tag>
                <el-tag v-if="props.row.adminSex=='1'" type="danger">女</el-tag>
                <el-tag v-if="props.row.adminSex=='2'" type="info">未知</el-tag>
              </el-form-item>
              <el-form-item label="员工头像">
                <el-avatar shape="square" size="medium" style="vertical-align: middle"
                           :src="props.row.adminAvatar"></el-avatar>
              </el-form-item>
              <el-form-item label="员工状态">
                <el-switch
                    v-model="props.row.adminStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="用户名">
                <span>{{ props.row.adminName }}</span>
              </el-form-item>

              <el-form-item label="银行账户">
                <span>{{ props.row.adminCode }}</span>
              </el-form-item>

              <el-form-item label="员工地址">
                <span>{{ props.row.adminAddress }}</span>
              </el-form-item>

              <el-form-item label="员工工资">
                <span>{{ props.row.adminSalary }}</span>
              </el-form-item>

              <el-form-item label="所在部门">
                <span>{{ props.row.adminDept }}</span>
              </el-form-item>
              <el-form-item label="在职状态">
                <span v-if="props.row.delFlag == 0">正常</span>
                <span v-if="props.row.delFlag == 1">离职</span>
              </el-form-item>

            </el-form>

          </template>
        </el-table-column>


        <el-table-column type="selection" width="55"/>
        <el-table-column prop="id" label="id" width="55"/>
        <el-table-column prop="adminName" label="用户名" show-overflow-tooltip/>
        <el-table-column prop="adminAccount" label="员工账户"/>
        <el-table-column prop="adminSalary" label="员工工资" show-overflow-tooltip/>
        <el-table-column label="员工头像">
          <template v-slot="obj">
            <el-avatar shape="square" size="medium" style="vertical-align: middle"
                       :src="obj.row.adminAvatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="adminStatus" label="员工状态">
          <template v-slot="obj">
            <el-switch
                v-model="obj.row.adminStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="adminPhone" label="联系电话"/>
        <el-table-column align="center" label="操作" width="180">
          <template v-slot="id">
            <el-button size="mini" type="primary" @click="editDialog = true,findById(id.row.id),getAdminRoles(id.row.id),getRoleList();">编辑</el-button>
            <el-button size="mini" type="danger" @click="delLine(id.row.id)">删除</el-button>
          </template>
        </el-table-column>


        <!--        <el-table-column prop="nickName" label="员工昵称"/>-->
        <!--        <el-table-column prop="adminEmail" label="员工邮箱"/>-->

        <!--        <el-table-column label="员工性别">-->
        <!--          <template v-slot="obj">-->
        <!--            <el-tag v-if="obj.row.adminSex=='0'">男</el-tag>-->
        <!--            <el-tag v-if="obj.row.adminSex=='1'" type="danger">女</el-tag>-->
        <!--            <el-tag v-if="obj.row.adminSex=='2'" type="info">未知</el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->


        <!--        <el-table-column prop="adminCode" label="银行账户" show-overflow-tooltip/>-->
        <!--        <el-table-column prop="adminAddress" label="员工地址" show-overflow-tooltip/>-->

        <!--        <el-table-column prop="adminDept" label="所在部门" show-overflow-tooltip/>-->
        <!--        <el-table-column prop="delFlag" label="在职状态" show-overflow-tooltip/>-->


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
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px" size="small">

        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="adminAccount" label="用户名：">
                  <el-input placeholder="用户名格式4-8位" v-model="formData.adminAccount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="nickName" label="昵称：">
                  <el-input placeholder="昵称格式4-8位" v-model="formData.nickName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item prop="adminPhone" label="手机号：">
                  <el-input placeholder="11位手机号码" v-model="formData.adminPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="adminEmail" label="邮箱：">
                  <el-input placeholder="邮箱地址" v-model="formData.adminEmail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-col :span="16">
                <el-form-item label="头像：">
                  <el-upload
                      class="avatar-uploader"
                      action=""
                      :http-request="avatarUpload"
                      accept="image/*"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
<!--                    formData.adminAvatar-->
                  </el-upload>
                </el-form-item>
              </el-col>

          </el-tab-pane>
          <el-tab-pane label="个人信息" name="second">
            <el-row>
              <el-col :span="12">
            <el-form-item label="账号状态：">
              <el-switch
                  v-model="formData.adminStatus"
                  :active-value="true"
                  :inactive-value="false"
                  active-text="可用"
                  inactive-text="不可用">
              </el-switch>
            </el-form-item>
              </el-col>
            <el-col :span="12">
              <el-form-item label="是否在职：">
                <el-switch
                    v-model="formData.delFlag"
                    :active-value="true"
                    :inactive-value="false"
                    active-text="在职"
                    inactive-text="离职">
                </el-switch>
              </el-form-item>
            </el-col>
            </el-row>

            <el-form-item label="员工姓名：">
              <el-input placeholder="姓名" v-model="formData.adminName"></el-input>
            </el-form-item>



            <el-form-item label="性别：">
              <el-radio-group v-model="formData.adminSex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
                <el-radio :label="2">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="adminCode" label="身份证号：">
              <el-input placeholder="身份证号" v-model="formData.adminCode"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="联系方式" name="third">
            <el-form-item prop="adminAddress" label="住址：">
              <el-input placeholder="住址" v-model="formData.adminAddress"></el-input>
            </el-form-item>
            <el-form-item prop="adminSalary" label="工资：">
              <el-input placeholder="工资" v-model="formData.adminSalary"></el-input>
            </el-form-item>
            <el-form-item prop="adminDept" label="所在部门：">
              <el-input placeholder="所在部门" v-model="formData.adminDept"></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="角色信息" name="fourth">
            <el-form-item label="已有角色">
                <el-tag
                    v-for="tag in adminRoles" style="margin: 0px 8px 0px 0px"
                    :key="tag.id"
                    closable
                    type=''
                    @close="deleteAdminRole(tag.id)">
                  {{tag.roleName}}
                </el-tag>
            </el-form-item>
            <el-form-item label="添加角色">
              <el-select v-model="formData.roleIds" multiple placeholder="请选择">
                <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="footer-box">
              <el-button @click="editDialog = false" size="small">取 消</el-button>
              <el-button type="success" @click="submitForm('form')" size="small">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-form>

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

<style lang="less">
@import "./index";
</style>