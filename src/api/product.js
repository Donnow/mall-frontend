import request from './request'

// 获取商品列表
export const getProductList = (params) => {
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}

// 获取商品详情
export const getProductDetail = (id) => {
  return request({
    url: `/product/${id}`,
    method: 'get'
  })
}

// 搜索商品
export const searchProducts = (params) => {
  return request({
    url: '/product/search',
    method: 'get',
    params
  })
}

// 根据分类获取商品
export const getProductsByCategory = (categoryId, params) => {
  return request({
    url: `/product/category/${categoryId}`,
    method: 'get',
    params
  })
}

// 获取推荐商品
export const getRecommendProducts = (limit = 10) => {
  return request({
    url: '/product/recommend',
    method: 'get',
    params: { limit }
  })
}

// 获取热销商品
export const getHotProducts = (limit = 10) => {
  return request({
    url: '/product/hot',
    method: 'get',
    params: { limit }
  })
}

// 获取相关商品
export const getRelatedProducts = (id, limit = 6) => {
  return request({
    url: `/product/${id}/related`,
    method: 'get',
    params: { limit }
  })
}