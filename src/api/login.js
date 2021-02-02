import axios from "../utils/baseAxios";

let login = {

    // 获取验证码
    getCode(uuid){
        return axios.get('common/getCode?uuid=' + uuid);
    },

    // 发送登录请求
    doLogin(dataForm){
        return axios.post("common/login",dataForm);
    },

    // 获取用户信息
    getAdminInfo(){
        return axios.get("admin/getAdminInfo");
    }

}

export default login;