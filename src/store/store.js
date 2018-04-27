import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
  token: null,
  left_nav:[
    {name:'首页',path:'home'},
    {name:'任务广场',path:'task_ground'},
    {name:'在线课堂',path:'online_class'}

  ],
  show:'home',
  clientheight:0,
  clientwidth:0,
  classifications:[
    {name:"种植业",path:'plant'},
    {name:"水产养殖业",path:'aquaculture'},
    {name:"农资业",path:'agri_industry'},
    {name:"农副加工业",path:'agri_and_sideline_industries'},
    {name:'畜牧业',path:'animal'}
  ],
  userInfo:{},
  status:false,
  userName:'',
  videoId:1
}

const mutations={
  CHANGE_HW(state,obj){
    state.clientwidth = obj.w;
    state.clientheight = obj.h;
  },
  CHANGE_SHOW(state,type){
    state.show=type
  },
  CHANGE_USERNAME(state,userName){
    state.userName = userName
  },
  CHANGR_USERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  CHANGE_VIDEOID(state,id){
    state.videoId = id
  }

}

const actions={
  change_hw({commit},obj){
    commit('CHANGE_HW',obj)
  },
  changeShow({commit},type){
  commit('CHANGE_SHOW',type)
},
  changeUserName({commit},userName){
    commit('CHANGE_USERNAME',userName)
  },
  changeUserInfo({commit},userInfo){
    commit('CHANGR_USERINFO',userInfo)
  },
  changeVideoId({commit},id){
    commit('CHANGE_VIDEOID',id)
  }

}

const getters={
  getLeft_nav:function (state) {
    return state.left_nav
  },
  getShow:function (state) {
    return state.show
  },
  getClassifications:function (state) {
    return state.classifications
  },
  getUserInfo:function (state) {
    return state.userInfo
  },
  getVideoId(state){
    return state.videoId
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
