import request from '@/utils/request'
export const getNews = (params) => {
  console.log(params)
  if(params!==undefined){
    return request.get(`/webapi/news/list/${params.id}`)
  }
  return request.get(`/webapi/news/list`)
}
//搜索新闻
export const searchNews = (params) => {
  return request.get(`/webapi/news/search?keyword=${params.keyword}`)
}
export const getTopnews = (num) => {
  return request.get(`/webapi/news/toplist?num=${num}`)
}