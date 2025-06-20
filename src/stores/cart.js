import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCartList, addToCart, updateCartQuantity, removeFromCart, batchSelectCart } from '../api/cart'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const cartCount = ref(0)
  const checkedAmount = ref(0)
  const totalAmount = ref(0)
  const allChecked = ref(false)

  // 获取购物车列表
  const fetchCartList = async () => {
    try {
      const response = await getCartList()
      if (response.code === 200) {
        cartItems.value = response.data.cartItems || []
        cartCount.value = response.data.totalCount || 0
        checkedAmount.value = response.data.checkedAmount || 0
        totalAmount.value = response.data.totalAmount || 0
        allChecked.value = response.data.allChecked || false
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 添加到购物车
  const addCartItem = async (productData) => {
    try {
      const response = await addToCart(productData)
      if (response.code === 200) {
        await fetchCartList() // 重新获取购物车列表
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 更新购物车商品数量
  const updateQuantity = async (cartId, quantity) => {
    try {
      const response = await updateCartQuantity({ cartId, quantity })
      if (response.code === 200) {
        await fetchCartList()
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 更新选中状态
  const updateChecked = async (cartId, checked) => {
    try {
      const response = await updateCartQuantity({ cartId, checked })
      if (response.code === 200) {
        await fetchCartList()
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 批量选择
  const batchSelect = async (checked, cartIds = null) => {
    try {
      const response = await batchSelectCart({ checked, cartIds })
      if (response.code === 200) {
        await fetchCartList()
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 删除购物车商品
  const removeCartItem = async (cartId) => {
    try {
      const response = await removeFromCart(cartId)
      if (response.code === 200) {
        await fetchCartList()
        return response
      }
      throw new Error(response.message)
    } catch (error) {
      throw error
    }
  }

  // 清空状态
  const clearCart = () => {
    cartItems.value = []
    cartCount.value = 0
    checkedAmount.value = 0
    totalAmount.value = 0
    allChecked.value = false
  }

  return {
    cartItems,
    cartCount,
    checkedAmount,
    totalAmount,
    allChecked,
    fetchCartList,
    addCartItem,
    updateQuantity,
    updateChecked,
    batchSelect,
    removeCartItem,
    clearCart
  }
})