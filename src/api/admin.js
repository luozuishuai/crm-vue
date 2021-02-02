import axios from "../utils/baseAxios";

let admin = {
    /**
     * findAll()
     */
    findAll(currentPage,pageSize){
        return axios.get(`admin?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`admin/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`admin`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`admin`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`admin/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`admin/${id}`);
    },

    /**
     * upload
     */
    uploadAvatar(formData) {
        return axios.post(`common/upload`,formData,{headers:{"content-Type":"multipart/form-data"}});
    },

    /**
     * getAllRole
     */
    getAllRole(){
        return axios.get(`role/getAll`);
    },
    getAdminRoles(id){
        return axios.get(`admin/${id}/roles`);
    },
    delAdminRole(adminId,roleId){
        return axios.delete(`admin/${adminId}/role/${roleId}`);
    }

}

export default admin;