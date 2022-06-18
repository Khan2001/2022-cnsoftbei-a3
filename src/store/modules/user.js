import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    resetToken: getRefreshToken(),
    newUsers: [],
    totalUsers: [],
    newArticles: [],
    totalArticles: [],
    username: '',
    avatar: '',
    roles: [],
    id: '',
    date: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NEWUSERS: (state, newUsers) => {
    state.newUsers = newUsers
  },
  SET_TOTALUSERS: (state, totalUsers) => {
    state.totalUsers = totalUsers
  },
  SET_NEWARTICLES: (state, newArticles) => {
    state.newArticles = newArticles
  },
  SET_TOTALARTICLES: (state, totalArticles) => {
    state.totalArticles = totalArticles
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_DATE: (state, date) => {
    state.date = date
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      /* console.log('action before login userInfo:', JSON.stringify(userInfo))*/
      login({ username: username.trim(), password: password }).then(response => {
        /* console.log('login response:', JSON.stringify(response))*/
        const { data } = response
        if (response.code === 2007) {
          resolve(response)
          return
        }
        commit('SET_TOKEN', data.accessToken)
        // dispatch('dashboard/getDashboardData', {}, { root: true })
        setToken(data.accessToken)
        setRefreshToken(data.resetToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 模拟接口获取到的token每次都不一样
      getInfo(state.token).then(response => {
        console.log('getInfo response:', JSON.stringify(response))
        const { data } = response

        if (!data) {
          reject('校验失败，请重新登录')
        }

        const { newUsers, totalUsers, newArticles, totalArticles, roles, username, avatar, id, date } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_NEWUSERS', newUsers)
        commit('SET_TOTALUSERS', totalUsers)
        commit('SET_NEWARTICLES', newArticles)
        commit('SET_TOTALARTICLES', totalArticles)
        commit('SET_ROLES', roles)
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', id)
        commit('SET_DATE', date)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
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

