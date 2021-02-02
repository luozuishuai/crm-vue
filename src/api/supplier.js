import axios from "../utils/baseAxios";

let supplier = {
    /**
     * findAll()
     */
    findAll(currentPage,pageSize){
        return axios.get(`supplier?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    /**
     * findById()
     */
    findById(ids){
        return axios.get(`supplier/${ids}`);
    },

    /**
     * addEntity()
     */
    addEntity(entity){
        return axios.post(`supplier`,entity);
    },

    /**
     * updateEntity()
     */
    updateEntity(entity){
        return axios.put(`supplier`,entity);
    },

    /**
     * deleteByIds()
     */
    deleteByIds(ids){
        return axios.delete(`supplier/${ids}`);
    },

    /**
     * deleteByIds()
     */
    deleteById(id){
        return axios.delete(`supplier/${id}`);
    },







}

export default supplier;