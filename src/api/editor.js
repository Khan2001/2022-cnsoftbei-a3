import request from '@/utils/request'

export const editorInfo = params => request.get('/index/editor', params)
export const getArticleList = (page, params) => request.get(`/editor/articleData/${page}`, { params })
export const getArticleContent = params => request.get('/editor/articleContent', { params })
// export const articleDelete = params => request.delete('/editor/articleDelete', params)

export function articleDelete(data) {
  return request({
    url: '/editor/articleDelete',
    method: 'delete',
    params: {
      'id': data.id
    }
  })
}

export function uploadArticle(data) {
  return request({
    url: '/editor/uploadArticle',
    method: 'post',
    params: {
      'title': data.title,
      'content': data.content,
      'typeId': data.typeId,
      'status': data.status,
      'id': data.id
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  })
}

export function uploadArticleFile(params) {
  return request({
    url: '/editor/uploadArticleFile',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
  })
}
