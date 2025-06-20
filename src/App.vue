<template>
  <div id="app">
    <!-- 头部导航 -->
    <el-header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo" @click="$router.push('/')">
          <el-icon><Shop /></el-icon>
          <span>电商Mall</span>
        </div>

        <!-- 搜索框 -->
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索商品..."
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </div>

        <!-- 用户操作区 -->
        <div class="user-actions">
          <!-- 购物车 -->
          <div class="cart-wrapper" @click="$router.push('/cart')">
            <el-badge :value="cartStore.cartCount" class="cart-badge">
              <el-icon size="24"><ShoppingCart /></el-icon>
            </el-badge>
          </div>

          <!-- 用户菜单 -->
          <div class="user-menu">
            <template v-if="userStore.isLoggedIn">
              <el-dropdown>
                <span class="user-info">
                  <el-avatar :size="32" :src="userStore.userInfo.avatar">
                    <el-icon><User /></el-icon>
                  </el-avatar>
                  <span class="username">{{ userStore.userInfo.nickname || userStore.userInfo.username }}</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="$router.push('/profile')">
                      <el-icon><User /></el-icon>个人中心
                    </el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/orders')">
                      <el-icon><List /></el-icon>我的订单
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">
                      <el-icon><SwitchButton /></el-icon>退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button @click="$router.push('/login')">登录</el-button>
              <el-button type="primary" @click="$router.push('/register')">注册</el-button>
            </template>
          </div>
        </div>
      </div>

      <!-- 导航菜单 -->
      <el-menu
        mode="horizontal"
        :default-active="$route.path"
        class="nav-menu"
        router
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/products">商品</el-menu-item>
        <el-menu-item index="/cart">购物车</el-menu-item>
        <el-menu-item index="/orders" v-if="userStore.isLoggedIn">订单</el-menu-item>
      </el-menu>
    </el-header>

    <!-- 主要内容区 -->
    <el-main class="main-content">
      <router-view />
    </el-main>

    <!-- 底部 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 电商Mall. All rights reserved.</p>
        <p>基于Vue3 + Element Plus + Spring Boot构建</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const searchKeyword = ref('')

// 搜索商品
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: '/products',
      query: { keyword: searchKeyword.value.trim() }
    })
  }
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
  cartStore.clearCart()
  ElMessage.success('退出登录成功')
  router.push('/')
}

// 页面加载时获取用户信息和购物车数量
onMounted(async () => {
  if (userStore.isLoggedIn) {
    try {
      await userStore.fetchUserInfo()
      await cartStore.fetchCartList()
    } catch (error) {
      console.error('初始化数据失败:', error)
    }
  }
})
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0;
  height: auto;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
}

.logo span {
  margin-left: 8px;
}

.search-box {
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart-wrapper {
  cursor: pointer;
  color: #409eff;
}

.cart-badge {
  line-height: 1;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
}

.nav-menu {
  border-top: 1px solid #e4e7ed;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  min-height: calc(100vh - 200px);
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background: #f5f5f5;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e4e7ed;
}

.footer-content p {
  margin: 5px 0;
  color: #666;
}
</style>
