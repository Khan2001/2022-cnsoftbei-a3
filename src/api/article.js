import request from '@/utils/request'

export const getArticleList = (page, params) => request.get(`/admin/articleList/${page}`, { params })

export function getArticleContent(data) {
  return request({
    url: '/admin/articleContent',
    method: 'get',
    params: {
      'id': data.id
    }
  })
}

export function articleStatusChange(data) {
  return request({
    url: '/admin/articleStatusChange',
    method: 'put',
    params: {
      'id': data.id,
      'status': data.status
    }
  })
}

export function articleTypeChange(data) {
  return request({
    url: '/admin/articleTypeChange',
    method: 'put',
    params: {
      'id': data.id,
      'typeId': data.typeId
    }
  })
}

export function articleDelete(data) {
  return request({
    url: '/admin/articleDelete',
    method: 'delete',
    params: {
      'id': data.id
    }
  })
}
