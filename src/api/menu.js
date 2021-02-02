import axios from "../utils/baseAxios";

let menu = {
    /**
     * findAllSetPage()
     */
    findAll(currentPage,pageSize){
        return axios.get(`menu/getTreeData?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`menu/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`menu`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`menu`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`menu/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`menu/${id}`);
    },







}

export default menu;