import request from '@/utils/request'

export const editorInfo = params => request.get('/index/editor', params)
export const getArticleList = (page, params) => request.get(`/editor/articleData/${page}`, { params })
export const getArticleContent = params => request.get('/editor/articleContent', params)
export const articleDelete = params => request.delete('/editor/articleDelete', params)
export const uploadArticle = params => request.post('/editor/uploadArticle', params)
