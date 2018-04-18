// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import App from './App'
import axios from 'axios';
import store from './store/store'
import Rigest from './components/Rigest.vue'
import Login from './components/Login.vue'
import ForgetPassword from './components/ForgetPassword.vue'
import Home from './components/Home.vue'
import MyInfo from './components/MyInfo.vue'
import OnlineClass from './components/OnlineClass.vue'
import TaskGround from './components/TaskGround.vue'
import VideoPlayer from './components/VideoPlayer.vue'

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueRouter)
// Vue.use(VueResource)


const router = new VueRouter({
	routes:[
	  {path:'/',component:Home},
    {path:'/rig',component:Rigest},
    {path:'/login',component:Login},
    {path:'/forgetPassword',component:ForgetPassword},
    {path:'/home',component:Home},
    {path:'/task_ground',component:TaskGround},
    {path:'/online_class',component:OnlineClass},
    {path:'/my_info',component:MyInfo},
    {path:'/video_player',
      component:VideoPlayer,
      // children:[
      //   {path:'',component:Home},
      //   {path:':id',component:video_list}
      // ]

    }

	],
	mode:'history'
})
/* eslint-disable no-new */
// new Vue({
// 	router,
//   store,
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
