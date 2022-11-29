import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// this.$store.state.count 
export default new Vuex.Store({
  state: {
    count: 1,
    index: 5,
    vuextiem: 0,
    registe: "点击登录",
    my: "点击成为会员",
    gift: [],
    registeimg: "http://127.0.0.1:3000/static/imgs/4_1.jpg",
    vxmemoney: 0,
    vxorder: [],
    vxdowmvideo:[]
  },
  getters: {
    peace(state) {
      let { count, index } = state
      return count * index
    }
  },
  mutations: {
    // 我的页面会员
    setmy(state, value) {
      state.my = value
    },
    // 登录
    setregiste(state, value) {
      state.registe = value
    },
    // 时间
    settiem(state, value) {
      state.vuextiem = value
    },
    // 加入gite数组
    setgift(state, vlue) {
      for (let i = 0; i < state.gift.length; i++) {
        if (vlue == state.gift[i]) {
          return
        }
      }
      state.gift.push(vlue)
    },
    cartsetgift(state, vlue) {
      state.gift.forEach((item, index) => {
        if (vlue == item) {
          state.gift.splice(index, 1)
        }
      })
    },
    setmoney(state, vlue) {
      let index = state.vxmemoney + (vlue - 0)
      state.vxmemoney = index
    },
    // 购物后今个
    mycart(state, vlue) {
      let inedx = state.vxmemoney - (vlue - 0)
      state.vxmemoney = inedx
    },
    setvxorder(state, value) {
      state.vxorder.push(value)
    },
    vxdowmvideo(state,value){
      for(let i=0;i<state.vxdowmvideo.length;i++){
        if(state.vxdowmvideo[i]==value){
          return
        }
      }
      state.vxdowmvideo.push(value)
    }

  },
  actions: {
  },
  modules: {
  }
})
