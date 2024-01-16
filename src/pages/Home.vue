<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'

const items = ref([]) // {value:[]}

const { cart, addToCart, removeFromCart } = inject('cart')

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy,
    searchQuery: filters.searchQuery
  }
  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }
  // fetch('https://604781a0efa572c1.mokky.dev/items')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })

  try {
    // const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
    // params
    // })
    // console.log(data)
    // items.value = data;
    const itm = [
      {
        id: 1,
        title: 'sdfsdf',
        imagesUrl: 'sneakers/sneakers-1.jpg',
        price: 12312
      },
      {
        id: 2,
        title: 'sdfsdf',
        imagesUrl: 'sneakers/sneakers-2.jpg',
        price: 12312
      }
    ]

    items.value = itm.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    // const { data: favorites } = await axios.get('https://604781a0efa572c1.mokky.dev/favorites')
    // console.log(data)
    // items.value = data;
    const favorites = [
      {
        id: 1,
        parentId: 2
      }
    ]
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    console.log(items.value)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      // const obj = { parentId: item.id }
      // const { data } = await axios.post('https://604781a0efa572c1.mokky.dev/favorites', obj)
      // console.log(data)
      // items.value = data;
      // item.favoriteId = data.id

      item.isFavorite = true
      item.favoriteId = Date().now
    } else {
      // await axios.delete(`https://604781a0efa572c1.mokky.dev/favorites${item.favoriteId}`)

      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }

  // item.isFavorite = !item.isFavorite
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
        name=""
        id=""
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="onClickAddPlus" />
  </div>
</template>
