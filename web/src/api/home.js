import request from "../utils/request";
//获取首页图片
export const getHomeImg = () => {
  return request.get('/webapi/news/imgList');
}
