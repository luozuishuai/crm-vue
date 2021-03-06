import supplier from "@/api/supplier";

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
            action:"新增供应商",
            formData: {},
            ids: [],
        }
    },

    created() {
        this.findAll();
    },

    methods: {
        async findAll() {
            let response = await supplier.findAll(this.currentPage, this.pageSize);
            console.log(response);
            this.tableData = response.list;
            this.total = response.total;
        },
        async addOrEdit(){
            // console.log("aaaaaaaa")
            if(this.formData.id){
                //修改
                await supplier.updateEntity(this.formData);
            }else{
                //新增
                await supplier.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage = page;
            this.findAll();
        },
        async findById(id){
            this.action = "编辑供应商";
            this.formData = await supplier.findById(id);
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
                await supplier.deleteByIds(this.ids);
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
