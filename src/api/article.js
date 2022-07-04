import request from '@/utils/request'

export const getArticleList = (page, params) => request.get(`/admin/articleList/${page}`, { params })
// export const getArticleContent = params => request.get('/admin/articleContent', params)
export function getArticleContent(data) {
  return request({
    url: '/admin/articleContent',
    method: 'get',
    params: {
      'id': data.id
    }
  })
}
// export const articleStatusChange = params => request.post('/admin/articleStatusChange', params)
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
// export const articleTypeChange = params => request.post('/admin/articleTypeChange', params)
export function articleTypeChange(data) {
  return request({
    url: '/admin/articleTypeChange',
    method: 'post',
    params: {
      'id': data.id,
      'typeId': data.typeId
    }
  })
}
// export const articleDelete = params => request.delete('/admin/articleDelete', params)
export function articleDelete(data) {
  return request({
    url: '/admin/articleDelete',
    method: 'delete',
    params: {
      'id': data.id
    }
  })
}
