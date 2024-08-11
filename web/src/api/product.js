import request from "../utils/request";
//获取首页图片
export const getProductImg = () => {
  return request.get('/webapi/product/imgList');
}
