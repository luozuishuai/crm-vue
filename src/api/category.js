import axios from "../utils/baseAxios";

let category = {

    /**
     * getTreeData
     */
    getTreeData(currentPage,pageSize){
        return axios.get(`category/getTreeData?currentPage=${currentPage}&pageSize=${pageSize}`);
    },
    /**
     * findAll()
     */
    findAll(currentPage,pageSize){
        return axios.get(`category?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`category/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`category`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`category`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`category/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`category/${id}`);
    },







}

export default category;