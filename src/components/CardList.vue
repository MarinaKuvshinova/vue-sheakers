<script setup>
// import { inject } from 'vue'

import Card from './Card.vue'

defineProps({
  items: Array
})

// const onClickAdd = () => {}

// const addToFavorite = inject('addToFavorite')

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <!-- :onClickFavorite="() => addToFavorite(item)" -->

    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :title="item.title"
      id-added
      :imagesUrl="item.imagesUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :is-added="item.isAdded"
    />
  </div>
</template>
