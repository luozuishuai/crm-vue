import axios from "../utils/baseAxios";

let brand = {
    /**
     * findAll()
     */
    findAll(currentPage,pageSize){
        return axios.get(`brand?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`brand/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`brand`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`brand`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`brand/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`brand/${id}`);
    },

    /**
     * upload
     */
    uploadAvatar(formData) {
        return axios.post(`common/upload`,formData,{headers:{"content-Type":"multipart/form-data"}});
    },


}

export default brand;