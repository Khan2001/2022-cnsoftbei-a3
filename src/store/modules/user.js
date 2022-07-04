import { login, logout, getInfo, register, refreshToken } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  setRoles, removeRoles
} from '@/utils/auth'
import { resetRouter } from '@/router'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    resetToken: getRefreshToken(),
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
        const roles = jwt.decode(data.accessToken).authorities[0]
        setRoles(roles)
        commit('SET_ROLES', roles)
        setToken(data.accessToken)
        setRefreshToken(data.refreshToken)
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
      getInfo().then(response => {
        console.log('getInfo response:', JSON.stringify(response))
        const { data } = response

        if (!data) {
          reject('校验失败，请重新登录')
        }

        const { roles, username, avatar, id, date } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

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
        removeRefreshToken()
        resetRouter()
        removeRoles()
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
      removeRefreshToken()
      // removeRoles()
      resolve()
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      // axios.get('',{})
      // 'http://39.99.60.47/token/refreshToken'
      axios.get(process.env.VUE_APP_BASE_API + 'token/refreshToken', {
        params: { refreshToken: getRefreshToken() }}
      )
        .then(response => {
          if (response.data.code === 4003) {
            /* MessageBox.confirm('登录已失效，点击取消留在此界面或再次登录', '确认登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            }) */
            Message.warning('登录已过期')
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
            reject(response.data.message)
          }
          const { data } = response.data
          console.log(data)
          setToken(data.accessToken)
          commit('SET_TOKEN', data.accessToken)
          setRefreshToken(data.refreshToken)
          commit('RESET_STATE')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      /* refreshToken({ refreshToken: getRefreshToken() }).then(response => {
        const { data } = response
        setToken(data.accessToken)
        commit('SET_TOKEN', data.accessToken)
        setRefreshToken(data.refreshToken)
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

