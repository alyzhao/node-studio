const state = {
  user: null
}

const mutations = {
  SET_USER_INFO (state, user) {
    state.user = user
  }
}

const actions = {
  getUserInfo ({commit}, vue) {
    return new Promise((reslove, reject) => {
      vue.axios.post('/user/').then(res => {
        let user = {
          email: res.data.email,
          role: res.data.role
        }
        commit('SET_USER_INFO', user)
        reslove(user)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}