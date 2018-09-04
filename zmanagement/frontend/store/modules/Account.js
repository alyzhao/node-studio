import axios from 'axios'

const state = {
  user: null
}

const mutations = {
  SET_USER_INFO (state, user) {
    state.user = user
  }
}

const actions = {
  getUserInfo ({commit}) {
    return new Promise((reslove, reject) => {
      axios.post()
    })
  }
}