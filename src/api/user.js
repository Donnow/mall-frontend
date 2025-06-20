import request from './request'

// 用户注册
export const register = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 用户登录
export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}

// 修改密码
export const changePassword = (oldPassword, newPassword) => {
  return request({
    url: '/user/changePassword',
    method: 'post',
    params: {
      oldPassword,
      newPassword
    }
  })
}

// 检查用户名是否存在
export const checkUsername = (username) => {
  return request({
    url: '/user/checkUsername',
    method: 'get',
    params: { username }
  })
}

// 检查手机号是否存在
export const checkPhone = (phone) => {
  return request({
    url: '/user/checkPhone',
    method: 'get',
    params: { phone }
  })
}

// 检查邮箱是否存在
export const checkEmail = (email) => {
  return request({
    url: '/user/checkEmail',
    method: 'get',
    params: { email }
  })
}