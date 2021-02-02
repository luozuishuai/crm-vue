import menuItem from "@/views/menuItem";

export default {
    name: "index",
    components: {menuItem},
    created() {
        this.menuList = JSON.parse(localStorage.getItem("menu"));
    },
    data() {
        return {
            menuList : [],

        }
    }
}


