import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Settings from "../pages/Settings.vue"
import Map from "../pages/Map.vue"

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/', name:'Home', component: Home},
        {path:'/SignUp', name: 'SignUp', component: SignUp},
        {path:'/SignIn', name: 'SignIn', component: SignIn},
        {path:'/Settings', name: 'Settings', component: Settings},
        {path:'/Map', name: 'Map', component: Map},
 
    ],
});
export default router

