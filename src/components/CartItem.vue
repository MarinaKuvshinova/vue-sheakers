<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imagesUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex items-center gap-4 border border-slate-100 p-4 rounded-xl">
    <img :src="imagesUrl" alt="" class="w-16 h-16" />
    <div class="flex flex-auto flex-col justify-between">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }}грн.</b>
        <img
          class="opacity-40 hover:opacity-100 transition cursor-pointer"
          src="/close.svg"
          alt="close"
          @click="emit('onClickRemove')"
        />
      </div>
    </div>
  </div>
</template>
