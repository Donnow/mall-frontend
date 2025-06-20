<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel height="400px" class="banner">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <div class="banner-item" :style="{ backgroundColor: item.color }">
          <div class="banner-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.subtitle }}</p>
            <el-button type="primary" size="large" @click="$router.push('/products')">
              立即购买
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 分类导航 -->
    <div class="category-section">
      <h3>商品分类</h3>
      <div class="category-grid">
        <div 
          v-for="category in categoryList" 
          :key="category.id"
          class="category-item"
          @click="$router.push(`/products?categoryId=${category.id}`)"
        >
          <el-icon size="48"><Box /></el-icon>
          <span>{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="recommend-section">
      <div class="section-header">
        <h3>推荐商品</h3>
        <el-button text @click="$router.push('/products')">
          查看更多 <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
      <div class="product-grid" v-loading="recommendLoading">
        <div 
          v-for="product in recommendProducts" 
          :key="product.id"
          class="product-card"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div class="product-image">
            <img :src="product.mainImage || '/placeholder.jpg'" :alt="product.name" />
          </div>
          <div class="product-info">
            <h4>{{ product.name }}</h4>
            <p class="product-brand">{{ product.brand }}</p>
            <div class="product-price">
              <span class="price">￥{{ product.price }}</span>
              <span class="sales">销量{{ product.salesCount || 0 }}</span>
            </div>
            <el-button 
              type="primary" 
              size="small" 
              @click.stop="addToCart(product)"
              :loading="addingToCart[product.id]"
            >
              加入购物车
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 热销商品 -->
    <div class="hot-section">
      <div class="section-header">
        <h3>热销商品</h3>
        <el-button text @click="$router.push('/products')">
          查看更多 <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
      <div class="product-grid" v-loading="hotLoading">
        <div 
          v-for="product in hotProducts" 
          :key="product.id"
          class="product-card"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div class="product-image">
            <img :src="product.mainImage || '/placeholder.jpg'" :alt="product.name" />
          </div>
          <div class="product-info">
            <h4>{{ product.name }}</h4>
            <p class="product-brand">{{ product.brand }}</p>
            <div class="product-price">
              <span class="price">￥{{ product.price }}</span>
              <span class="sales">销量{{ product.salesCount || 0 }}</span>
            </div>
            <el-button 
              type="primary" 
              size="small" 
              @click.stop="addToCart(product)"
              :loading="addingToCart[product.id]"
            >
              加入购物车
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getRecommendProducts, getHotProducts } from '../api/product'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()

// 轮播图数据
const bannerList = ref([
  {
    id: 1,
    title: '欢迎来到电商Mall',
    subtitle: '优质商品，优惠价格，一站式购物体验',
    color: '#409eff'
  },
  {
    id: 2,
    title: '新品上市',
    subtitle: '最新最热的商品等你来发现',
    color: '#67c23a'
  },
  {
    id: 3,
    title: '限时优惠',
    subtitle: '错过今天，再等一年',
    color: '#e6a23c'
  }
])

// 分类数据（模拟）
const categoryList = ref([
  { id: 1, name: '电子产品' },
  { id: 2, name: '服装鞋帽' },
  { id: 3, name: '家用电器' },
  { id: 4, name: '图书音像' },
  { id: 5, name: '运动户外' },
  { id: 6, name: '美妆护肤' },
  { id: 7, name: '母婴用品' },
  { id: 8, name: '食品饮料' }
])

const recommendProducts = ref([])
const hotProducts = ref([])
const recommendLoading = ref(false)
const hotLoading = ref(false)
const addingToCart = reactive({})

// 获取推荐商品
const fetchRecommendProducts = async () => {
  try {
    recommendLoading.value = true
    const response = await getRecommendProducts(8)
    recommendProducts.value = response.data || []
  } catch (error) {
    console.error('获取推荐商品失败:', error)
    ElMessage.error('获取推荐商品失败')
  } finally {
    recommendLoading.value = false
  }
}

// 获取热销商品
const fetchHotProducts = async () => {
  try {
    hotLoading.value = true
    const response = await getHotProducts(8)
    hotProducts.value = response.data || []
  } catch (error) {
    console.error('获取热销商品失败:', error)
    ElMessage.error('获取热销商品失败')
  } finally {
    hotLoading.value = false
  }
}

// 添加到购物车
const addToCart = async (product) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    addingToCart[product.id] = true
    await cartStore.addCartItem({
      productId: product.id,
      quantity: 1
    })
    ElMessage.success('已添加到购物车')
  } catch (error) {
    console.error('添加到购物车失败:', error)
    ElMessage.error('添加到购物车失败')
  } finally {
    addingToCart[product.id] = false
  }
}

onMounted(() => {
  fetchRecommendProducts()
  fetchHotProducts()
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.banner {
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
}

.banner-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.banner-content {
  text-align: center;
  color: white;
}

.banner-content h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.banner-content p {
  font-size: 18px;
  margin-bottom: 24px;
}

.category-section {
  margin-bottom: 40px;
}

.category-section h3 {
  margin-bottom: 20px;
  font-size: 24px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-item:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.category-item span {
  margin-top: 8px;
  font-weight: 500;
}

.recommend-section,
.hot-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 24px;
  margin: 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.product-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-brand {
  margin: 0 0 12px 0;
  color: #909399;
  font-size: 14px;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
}

.sales {
  color: #909399;
  font-size: 12px;
}
</style>