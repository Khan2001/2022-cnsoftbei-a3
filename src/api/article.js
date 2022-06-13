import request from '@/utils/request'

export const getArticleList = (page, params) => request.get(`/admin/articleList/${page}`, { params })
export const getArticleContent = params => request.get('/admin/articleContent', params)
export const articleStatusChange = params => request.post('/admin/articleStatusChange', params)
export const articleTypeChange = params => request.post('/admin/articleTypeChange', params)
export const articleDelete = params => request.delete('/admin/articleDelete', params)
