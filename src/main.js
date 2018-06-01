// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import E from 'wangeditor'
import 'element-ui/lib/theme-chalk/index.css';
import Rigest from './components/Rigest.vue'
import Login from './components/Login.vue'
import ForgetPassword from './components/ForgetPassword.vue'
import Home from './components/Home.vue'
import MyInfo from './components/MyInfo.vue'
import OnlineClass from './components/OnlineClass.vue'
import TaskGround from './components/TaskGround.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import UpLoadVideo from './components/UpLoadVideo.vue'
import QuestionDetail from './components/QuestionDetail'

import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);
// Vue.use(VueResource)
axios.defaults.baseURL = "http://118.24.116.137:8001/";

const router = new VueRouter({
	routes:[
	  {path:'/',
      component:Home,
      meta:{
        keepAlive:false
      }
    },
    {path:'/rig',
      component:Rigest,
      meta:{
        keepAlive:true
      }
    },
    {path:'/login',
      component:Login,
      meta:{
        keepAlive:false
      }
    },
    {path:'/forgetPassword',
      component:ForgetPassword,
      meta:{
        keepAlive:false
      }
    },
    {path:'/home',
      component:Home,
      meta:{
        keepAlive:true
      }
    },
    {path:'/task_ground',
      component:TaskGround,
      meta:{
        keepAlive:true
      }
    },
    {path:'/online_class',
      component:OnlineClass,
      meta:{
        keepAlive:true
      }
      },
    {path:'/my_info',
      component:MyInfo,
      meta:{
        keepAlive:true
      }},
    {path:'/video_player',
      component:VideoPlayer,
      meta:{
        keepAlive:false
      }

    },
    {path:'/question_detail',
      component:QuestionDetail,
      meta:{
        keepAlive:false
      }
    }

	],
	mode:'history'
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios



//axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.timeout = 6000;
// 添加请求拦截器
axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token');
  if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = 'JWT ' + token;

  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 这里写清除token的代码
//           store.state.token = null;
//           sessionStorage.clear();
//           router.replace({
//             path: '/',
//             query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//           })
//       }
//     }
//     return Promise.reject(error.response.data)
//   });


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
