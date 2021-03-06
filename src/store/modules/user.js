import { login,logout,getInfo} from '@/api/user'
import {getToken,setToken,removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const state = {
  // name: '',
  // avatar: '',
  token: getToken(),
  sellerId:'',
  sellerName:'',
  memberId:'',
  storeId:'',
}

const mutations = {
  // SET_NAME: (state, name) => {
  //   state.name = sellerName
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_TOKEN: (state, sellerToken) => {
    state.token = sellerToken
  },
  SET_SHOPID: (state, sellerId) => {
    state.sellerId = sellerId
  },
  SET_SELLERNAME: (state, sellerName) => {
    state.sellerName = sellerName
  },
  SET_MEMBERID: (state, memberId) => {
    state.memberId = memberId
  },
  SET_STOREID: (state, storeId) => {
    state.storeId = storeId
  },
}



const actions = {
//用户登录
  login({ commit }, userInfo) {
   
    return new Promise((resolve, reject) => {
    let obj = {
           sellerName:userInfo.username, memberPasswd: userInfo.password
      }
      login({...obj}).then(response => {
          if(response.code =='200') {

        const data = response.data

        commit('SET_TOKEN', data.sellerToken)
        commit('SET_SHOPID', data.sellerId)
        commit('SET_SELLERNAME', data.sellerName)
        commit('SET_MEMBERID', data.memberId)
        commit('SET_STOREID', data.storeId)

        setToken(data.token)
        resolve()
            this.$message({
              message: res.errorMsg,
              type: 'success',
              duration: 5 * 1000
            })
          }else{
            this.$message({
              message: res.errorMsg,
              type: 'error',
              duration: 5 * 1000
            })
          }

      }).catch(error => {
        reject(error)
      })
    })
  },



  //获取用户信息
  // getInfo({ commit,state }) {

  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const {
  //         data
  //       } = response

  //       if (!data) {
  //         reject('验证失败，请重新登录.')
  //       }

  //       const {
  //         name,
  //         avatar
  //       } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 用户注销
  logout({ commit, state }) 
    {
      return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除令牌
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

