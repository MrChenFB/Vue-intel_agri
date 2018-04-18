import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
  left_nav:[
    {name:'首页',path:'home'},
    {name:'任务广场',path:'task_ground'},
    {name:'在线课堂',path:'online_class'},
    {name:'我的',path:'my_info'},
    {name:'登录',path:'login'}

  ],
  show:'home',
  clientheight:0,
  clientwidth:0,
  classifications:{
    plant:'种植业',
    aquatic:'水产养殖业',
    agriculture:'农资业',
    agri_sidelin:'农副加工',
    pasturage:'畜牧业'
  }

}

const mutations={
  CHANGE_HW(state,obj){
    state.clientwidth = obj.w;
    state.clientheight = obj.h;
  },
  CHANGE_SHOW(state,type){
    state.show=type
  }
}

const actions={
  change_hw({commit},obj){
    commit('CHANGE_HW',obj)
  },
  changeShow({commit},type){
  commit('CHANGE_SHOW',type)
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
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
