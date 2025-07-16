import { ref } from 'vue'
import { mockData } from '../mock/mock_data.js'

export function useNavigation() {
  const categories = ref([])
  const title = ref('')
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // 开发环境模拟网络延迟
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // 默认使用本地mock数据
      categories.value = mockData.categories
      title.value = mockData.title

      // 动态设置页面标题
      document.title = title.value


    } catch (err) {
      error.value = err.message
      console.error('Error fetching categories:', err)
      // 兜底：始终返回 mock 数据
      categories.value = mockData.categories
      title.value = mockData.title
      document.title = title.value
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    title,
    loading,
    error,
    fetchCategories
  }
}
