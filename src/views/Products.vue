<template>
  <div class="products-page">
    <div class="products-header">
      <input
        v-model="searchKeyword"
        @keyup.enter="searchProducts"
        placeholder="搜索商品"
        class="search-input"
      />
      <button @click="searchProducts" class="search-btn">搜索</button>
    </div>
    <div class="products-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="goDetail(product.id)"
      >
        <img :src="product.mainImage" :alt="product.name" class="product-img" />
        <div class="product-info">
          <div class="product-title">{{ product.name }}</div>
          <div class="product-price">￥{{ product.price }}</div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="total > pageSize">
      <button :disabled="pageNum === 1" @click="changePage(pageNum - 1)">上一页</button>
      <span>第 {{ pageNum }} / {{ totalPages }} 页</span>
      <button :disabled="pageNum === totalPages" @click="changePage(pageNum + 1)">下一页</button>
    </div>
    <div v-if="products.length === 0" class="empty-tip">暂无商品</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getProductList } from '../api/product'
import { useRouter } from 'vue-router'

const products = ref([])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(12)
const searchKeyword = ref('')
const router = useRouter()

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const fetchProducts = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    keyword: searchKeyword.value.trim()
  }
  const res = await getProductList(params)
  if (res && res.code === 0) {
    products.value = res.data.list || []
    total.value = res.data.total || 0
  }
}

const searchProducts = () => {
  pageNum.value = 1
  fetchProducts()
}

const changePage = (num) => {
  pageNum.value = num
  fetchProducts()
}

const goDetail = (id) => {
  router.push({ name: 'ProductDetail', params: { id } })
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.products-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.search-btn {
  margin-left: 8px;
  padding: 8px 20px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.product-card {
  width: 220px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.product-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  background: #fafafa;
}
.product-info {
  padding: 12px;
  width: 100%;
}
.product-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-price {
  color: #e4393c;
  font-size: 18px;
  font-weight: bold;
}
.pagination {
  margin: 24px 0;
  text-align: center;
}
.pagination button {
  margin: 0 8px;
  padding: 6px 16px;
  border: none;
  background: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button:disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
.empty-tip {
  text-align: center;
  color: #888;
  margin-top: 40px;
  font-size: 18px;
}
</style>