import admin from "@/api/admin";

export default {
    name: "index",
    data() {
        // 自定义校验器
        var checkNumber = (rule, value, callback) => {
            //isNaN == is not a number 如果返回true 表示不是一个数字
            if(!value){
                callback(new Error('薪资不能为空'));
            }
            if(isNaN(value)){
                callback(new Error("您输入的不是一个数字"));
            }else{
                callback();
            }
        };
        return {
            // 当前页总数据
            tableData: [],
            // 当前页码
            currentPage: 1,
            // 每页显示的条目数
            pageSize: 5,
            total: 0,
            // 编辑弹框的开启状态 默认关闭
            editDialog: false,
            // 删除确认弹框的开启状态 默认关闭
            delDialog: false,
            // 页面展示的表格内容
            formData: {},
            // 多选框选中的id列表
            ids: [],
            // 新建员工弹框左上角title
            action: "新增员工",
            // 新建员工弹框默认标签激活页
            activeName: 'first',
            // 头像图片地址
            imageUrl: '',
            // 所有角色
            roleList:[],
            // 员工已有角色
            adminRoles:[],
            rules: {
                adminAccount: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur'},
                    {pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,8}$/, message: '用户名不符合规则', trigger: 'blur'},
                ],
                nickName: [
                    {required: true, message: '昵称不能为空', trigger: 'change'},
                    {min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur'},
                ],
                adminEmail: [
                    {type: 'email', required: true, message: '请输入邮箱地址', trigger: 'change'}
                ],
                adminPhone: [
                    {required: true, message: '请输入手机号', trigger: 'change'},
                    {
                        pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
                        message: '您输入的手机号有误',
                        trigger: 'blur'
                    },
                ],
                adminCode: [
                    {required: true, message: '请输入身份证号', trigger: 'change'},
                    {
                        pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '您输入的身份证号码有误',
                        trigger: 'blur'
                    },
                ],
                adminAddress: [
                    {required: true, message: '请输入员工住址', trigger: 'change'}
                    // {required: true, message: '请输入员工工资', trigger: 'blur'},
                    // {type: 'double', message: '请输入正确的工资', trigger: 'blur', transform: (value) => Number(value)},
                ],
                adminSalary: [
                    {validator:checkNumber,  trigger: 'blur'},
                ],
                adminDept: [
                    {required: true, message: '员工部门不能为空', trigger: 'blur'}
                ]
            }
        }
    },

    created() {
        this.findAll();

    },

    methods: {
        async findAll() {
            let response = await admin.findAll(this.currentPage, this.pageSize);
            // console.log(response);
            this.tableData = response.list;
            this.total = response.total;
        },
        async addOrEdit() {
            // console.log("aaaaaaaa")
            if (this.formData.id) {
                //修改
                await admin.updateEntity(this.formData);
            } else {
                //新增
                await admin.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page) {
            this.currentPage = page;
            this.findAll();
        },
        async findById(id) {
            this.action = "编辑员工";
            this.formData = await admin.findById(id);
            this.imageUrl = this.formData.adminAvatar;

        },
        selectionChangeListener(selection) {
            // console.log(selection);
            this.ids = [];
            selection.forEach(item => this.ids.push(item.id));
            // console.log(this.ids);
        },
        async deleteByIds() {
            if (this.ids.length == 0) {
                //选中的条目数为0
                this.$notify.error({
                    title: '错误',
                    message: '请先勾选要删除的记录'
                });
            } else {
                await admin.deleteByIds(this.ids);
                this.findAll();
            }
        },
        async delLine(id) {
            this.delDialog = true;
            this.$refs.selection.clearSelection();
            this.ids = [];
            this.ids.push(id);
        },
        async avatarUpload(chooseFile) {
            var filedata = new FormData();
            filedata.append("file", chooseFile.file);
            this.imageUrl = await admin.uploadAvatar(filedata);
            this.formData.adminAvatar = this.imageUrl;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addOrEdit();
                    this.editDialog = false;
                } else {
                    // console.log('error submit!!');
                    this.activeName="first";
                    return false;
                }
            });
        },
        async getRoleList(){
            this.roleList = await admin.getAllRole();
        },
        async getAdminRoles(id){
            this.adminRoles = await admin.getAdminRoles(id);
            //把所有角色信息中该员工已拥有的角色信息删除（不显示已有角色）
            this.adminRoles.forEach(adminRole=>this.roleList.splice(this.roleList.findIndex(role => role.id == adminRole.id),1));
        },
        async deleteAdminRole(roleId){
            await admin.delAdminRole(this.formData.id,roleId);
            this.getRoleList();
            this.getAdminRoles(this.formData.id);
        },
    }
}
