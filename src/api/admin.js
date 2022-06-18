/* 平台数据接口统一管理*/
import request from '@/utils/request'
export const userData = params => request.get('/admin/userData', { params })
export const articleData = params => request.get('/admin/articleData', { params })
