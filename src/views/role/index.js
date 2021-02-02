import role from "@/api/role";

export default {
    name: "index",
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total:0,
            editDialog:false,
            delDialog:false,
            action:"新增角色",
            formData: {},
            ids: [],
            allMenuList:[],
            defaultProps: {
                children: 'children',
                label: 'menuName'
            }
        }
    },

    created() {
        this.findAll();
        this.getAllMenuTreeData();
    },

    methods: {
        async findAll() {
            let response = await role.findAll(this.currentPage, this.pageSize);
            this.tableData = response.list;
            this.total = response.total;
        },
        async getAllMenuTreeData(){
            this.allMenuList = await role.getAllMenuTreeData();
            console.log(this.allMenuList);
        },
        async addOrEdit(){
            //保存勾选中的权限
            this.formData.menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());

            if(this.formData.id){
                //修改
                await role.updateEntity(this.formData);
            }else{
                //新增
                await role.addEntity(this.formData);
            }
            //清空权限勾选状态
            this.$refs.tree.setCheckedKeys([]);
            this.findAll();
        },
        pageChange(page){
            this.currentPage = page;
            this.findAll();
        },
        async findById(id){
            this.action = "编辑角色";
            this.formData = await role.findById(id);
            this.$refs.tree.setCheckedKeys(this.formData.menuIds);
        },
        selectionChangeListener(selection){
            // console.log(selection);
            this.ids = [];
            selection.forEach(item=> this.ids.push(item.id));
            // console.log(this.ids);
        },
        async deleteByIds(){
            if(this.ids.length == 0){
                //选中的条目数为0
                this.$notify.error({
                    title: '错误',
                    message: '请先勾选要删除的记录'
                });
            }else{
                await role.deleteByIds(this.ids);
                this.findAll();
            }
        },
        async delLine(id){
            this.delDialog = true;
            this.$refs.selection.clearSelection();
            this.ids = [];
            this.ids.push(id);
        }

    }
}
