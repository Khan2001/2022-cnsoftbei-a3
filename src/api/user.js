import request from '@/utils/request'
import store from '@/store'
import { getRoles } from '@/utils/auth'
const roles = getRoles()
export function login(data) {
  return request({
    url: '/server/login',
    method: 'post',
    // data: data
    params: {
      'username': data.username,
      'password': data.password
    }
  })
}

// export function getInfo(token) {
//   console.log('getInfo token:', token)
//   // 这里的if不能用token作为条件
//   if (token === 'admin-token') {
//     return request({
//       url: '/index/admin',
//       method: 'get',
//       params: { token }
//       // url: '/index/admin/dashboard',
//       // method: 'get',
//       // params: { token }
//     })
//   }
//   if (token === 'editor-token') {
//     return request({
//       url: '/index/editor',
//       method: 'get',
//       params: { token }
//     })
//   }
// }

export function getInfo() {
  console.log(roles, '2222')
  if (store.getters.roles === 'ROLE_admin' || roles === 'ROLE_admin') {
    return request({
      url: '/index/admin',
      method: 'get'
    })
  } else {
    return request({
      url: '/index/editor',
      method: 'get'
    })
  }
}

export function logout() {
  return request({
    url: '/server/logout',
    method: 'post'
  })
}

/* 更简洁的封装方法*/
export const updateInfo = params => request.post('/index/profile', params)
export const updateAvatar = params => request.post('/index/avatar', params)
export const getUserList = (page, params) => request.get(`/admin/userList/${page}`, { params })
export const userStatus = params => request.put('/admin/userStatusChange', params)
export const userDelete = params => request.delete('/admin/userDelete', params)
export const register = params => request.post('/index/register', params)
export const refreshToken = params => request.get('/token/refreshToken', { params })
