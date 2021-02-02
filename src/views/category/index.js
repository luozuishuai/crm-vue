import category from "@/api/category";
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
            total:0,
            currentPage:1,
            pageSize:5,
            editDialog:false,
            delDialog:false,
            action:"新增分类",
            formData: {},
            ids: [],
            options: [],
            categoryLevelList:[
                {
                    id:0,
                    categoryName:"主分类",
                    children:[]
                }

            ],
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.categoryName,
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
            let response = await category.getTreeData(this.currentPage,this.pageSize);
            this.tableData = response.list;
            this.total = response.total;
            this.categoryLevelList[0].children = this.tableData;
        },

        async addOrEdit(){
            // console.log("aaaaaaaa")
            if(this.formData.id){
                //修改
                await category.updateEntity(this.formData);
            }else{
                //新增
                await category.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage = page;
            this.findAll();
        },
        async findById(id){
            this.action = "编辑分类";
            this.formData = await category.findById(id);
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
                })
            }else{
                await category.deleteByIds(this.ids);
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
