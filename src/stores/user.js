import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, register, getUserInfo } from '../api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({})
  const isLoggedIn = ref(!!token.value)

  // 登录
  const loginUser = async (credentials) => {
    try {
      const response = await login(credentials)
      if (response.code === 200) {
        token.value = response.data.token
        userInfo.value = response.data.userInfo
        isLoggedIn.value = true
        localStorage.setItem('token', token.value)
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 注册
  const registerUser = async (userData) => {
    try {
      const response = await register(userData)
      if (response.code === 200) {
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo()
      if (response.code === 200) {
        userInfo.value = response.data
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = {}
    isLoggedIn.value = false
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    loginUser,
    registerUser,
    fetchUserInfo,
    logout
  }
})