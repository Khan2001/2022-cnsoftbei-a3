import request from '@/utils/request'

export function login(data) {
  console.log('login data:' + JSON.stringify(data))
  return request({
    url: '/server/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  console.log('getInfo token:', token)
  if (token === 'admin-token') {
    return request({
      url: '/index/admin',
      method: 'get',
      params: { token }
    })
  }
  if (token === 'editor-token') {
    return request({
      url: '/index/editor',
      method: 'get',
      params: { token }
    })
  }
}

export function logout() {
  return request({
    url: '/server/logout',
    method: 'post'
  })
}
