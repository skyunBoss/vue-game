import { USER_SIGNIN,USER_SIGNOUT } from '../types'

const userParse = JSON.parse(localStorage.getItem('user'))
const state = {
  token: userParse ? userParse.token : null,
  user_id: userParse ? userParse.id : null,
  username: userParse ? userParse.username : null
};

const mutations = {
  [USER_SIGNIN](state, user) {   // login
    localStorage.setItem('user',JSON.stringify(user));
    state.token = user.token
    state.user_id = user.id
    state.username = user.username
  },
  [USER_SIGNOUT](state) {   // loginout
    localStorage.removeItem('user')
    state.token = null
    state.user_id = null
    state.username = null
  }
}

export default {
  state,
  mutations
}
