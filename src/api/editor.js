import request from '@/utils/request'

export const editorInfo = params => request.get('/index/editor', params)
export const getArticleList = (page, params) => request.get(`/editor/articleData/${page}`, { params })
export const getArticleContent = params => request.get('/editor/articleContent', { params })
export const articleDelete = params => request.delete('/editor/articleDelete', params)
export function uploadArticle(params) {
  return request({
    url: '/editor/uploadArticle',
    methods: 'post',
    data: params,
    headers: { 'Content-Type': false }})
}
export function uploadArticleFile(params) {
  return request({
    url: '/editor/uploadArticle',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }})
}
