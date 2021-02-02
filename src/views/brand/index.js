import brand from "@/api/brand";

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
            imageUrl:'',
        }
    },

    created() {
        this.findAll();
    },

    methods: {
        async findAll() {
            let response = await brand.findAll(this.currentPage, this.pageSize);
            // console.log(response);
            this.tableData = response.list;
            this.total = response.total;
        },
        async addOrEdit(){
            // console.log("aaaaaaaa")
            if(this.formData.id){
                //修改
                console.log(this.formData);
                await brand.updateEntity(this.formData);
            }else{
                //新增
                console.log(this.formData);
                await brand.addEntity(this.formData);
            }
            this.findAll();
        },
        pageChange(page){
            this.currentPage = page;
            this.findAll();
        },
        async findById(id){
            this.action = "编辑分类";
            this.formData = await brand.findById(id);
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
                await brand.deleteByIds(this.ids);
                this.findAll();
            }
        },
        async delLine(id){
            this.delDialog = true;
            this.$refs.selection.clearSelection();
            this.ids = [];
            this.ids.push(id);
        },
        async avatarUpload(chooseFile) {
            var filedata = new FormData();
            filedata.append("file", chooseFile.file);
            this.imageUrl = await brand.uploadAvatar(filedata);
            this.formData.brandLogo = this.imageUrl;
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

    }
}
