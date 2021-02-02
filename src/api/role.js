import axios from "../utils/baseAxios";

let role = {
    /**
     * findAll()
     */
    findAll(currentPage,pageSize){
        return axios.get(`role?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * getAllMenuTreeData
     */
    getAllMenuTreeData(){
        return axios.get(`menu/getAllMenuTreeData`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`role/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`role`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`role`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`role/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`role/${id}`);
    },







}

export default role;