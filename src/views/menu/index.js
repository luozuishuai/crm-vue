import menu from "@/api/menu";
// import the component
import Treeselect from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    name: "index",
    components: { Treeselect },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5,
            total:0,
            editDialog:false,
            delDialog:false,
            action:"新增菜单",
            formData: {},
            ids: [],
            options: [],
            menuLevelList:[
                {
                    id:0,
                    menuName:"主菜单",
                    children:[]
                }
            ],
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.menuName,
                    children: node.children,
                }
            },
        }
    },

    created() {
        this.findAll();
    },

    methods: {
        async findAll() {
            let response = await menu.findAll(this.currentPage, this.pageSize);
            this.tableData = response.list;
            this.total = response.total;
            this.menuLevelList[0].children = this.tableData;
        },
        async addOrEdit(){
            if(this.formData.id){
                //修改
                await menu.updateEntity(this.formData);
            }else{
                //新增
                await menu.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage = page;
            this.findAll();
        },
        async findById(id){
            this.action = "编辑菜单";
            this.formData = await menu.findById(id);
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
                await menu.deleteByIds(this.ids);
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
