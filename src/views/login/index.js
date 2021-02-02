import login from "@/api/login";
import Vue from 'vue'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

export default {
    name: "index",
    data() {
        return {
            dataForm: {
                userName: '',
                password: '',
                captcha: '',
                uuid:'',
            },
            dataRule: {
                userName: [
                    {required: true, message: '帐号不能为空', trigger: 'blur'},
                    {min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur'},
                    {pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,8}$/, message: '用户名不符合规则', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},

                ],
                captcha: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            },
            captchaPath: ''
        }
    },
    methods:{
        async getCode(){
            var uuid = this.getUUID();
            this.dataForm.uuid = uuid;
            this.captchaPath = await login.getCode(uuid);
        },
        getUUID(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        async doLogin(){
            let uuid = await login.doLogin(this.dataForm);
            localStorage.setItem("token",uuid);
            this.getAdminInfo();
            this.$router.push('/main/index');
        },
        async getAdminInfo(){
            let response = await login.getAdminInfo()
            localStorage.setItem("menu",JSON.stringify(response.menu));
            localStorage.setItem("admin",JSON.stringify(response.admin));
        },
    },
    created() {
        this.getCode();
    }


}
