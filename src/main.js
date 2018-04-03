// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
// import router from './router'
import Rigest from './components/Rigest.vue'
import Login from './components/Login'
import Message from './components/Message'
import ForgetPassword from './components/ForgetPassword'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	routes:[
	  {path:'/',component:Login},
    {path:'/rig',component:Rigest},
    {path:'/message',component:Message} ,
    {path:'/login',component:Login},
    {path:'/forgetPassword',component:ForgetPassword}
	],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
	router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
