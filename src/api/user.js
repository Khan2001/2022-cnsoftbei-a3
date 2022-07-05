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

export function getInfo() {
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

export function updateInfo(data) {
  return request({
    url: '/index/profile',
    method: 'post',
    params: {
      'username': data.username,
      'password': data.password
    }
  })
}

export const updateAvatar = params => request.post('/index/avatar', params)

export const getUserList = (page, params) => request.get(`/admin/userList/${page}`, { params })

export function userStatus(data) {
  return request({
    url: '/admin/userStatusChange',
    method: 'put',
    params: {
      'id': data.id,
      'status': data.status
    }
  })
}

export function userDelete(data) {
  return request({
    url: '/admin/userDelete',
    method: 'delete',
    params: {
      'id': data.id
    }
  })
}

export function register(data) {
  return request({
    url: '/index/register',
    method: 'post',
    params: {
      'username': data.username,
      'password': data.password
    }
  })
}

export const refreshToken = params => request.get('/token/refreshToken', { params })
