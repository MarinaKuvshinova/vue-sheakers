<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const favorites = ref([])
onMounted(async () => {
  try {
    // const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
    // params
    // })
    // console.log(data)
    // items.value = data;

  } catch (error) {
    console.log(error)
  }
})
</script>

<template>sdf</template>
