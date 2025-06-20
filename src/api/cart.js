import request from './request'

// 获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}

// 添加到购物车
export const addToCart = (data) => {
  return request({
    url: '/cart/add',
    method: 'post',
    data
  })
}

// 更新购物车商品数量
export const updateCartQuantity = (data) => {
  return request({
    url: '/cart/quantity',
    method: 'put',
    data
  })
}

// 更新购物车商品选中状态
export const updateCartChecked = (data) => {
  return request({
    url: '/cart/checked',
    method: 'put',
    data
  })
}

// 批量选择购物车商品
export const batchSelectCart = (data) => {
  return request({
    url: '/cart/batchSelect',
    method: 'put',
    data
  })
}

// 删除购物车商品
export const removeFromCart = (cartId) => {
  return request({
    url: `/cart/remove/${cartId}`,
    method: 'delete'
  })
}

// 批量删除购物车商品
export const batchRemoveFromCart = (cartIds) => {
  return request({
    url: '/cart/batchRemove',
    method: 'delete',
    params: { cartIds }
  })
}

// 清空购物车
export const clearCart = () => {
  return request({
    url: '/cart/clear',
    method: 'delete'
  })
}

// 获取购物车商品数量
export const getCartCount = () => {
  return request({
    url: '/cart/count',
    method: 'get'
  })
}

// 获取选中的购物车商品
export const getCheckedCartItems = () => {
  return request({
    url: '/cart/checked',
    method: 'get'
  })
}