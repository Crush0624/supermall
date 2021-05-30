//对首页数据的请求
import { request } from "./request";
// 首页将面向home.js开发
export function getHomeMultidate() {
  return request({
    url:'/home/multidata'
   })
}
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type, page
    }
  })
}