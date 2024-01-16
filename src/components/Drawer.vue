<script setup>
import { computed } from 'vue'
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean
})
const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>

  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Корзина пустая"
        description="Добавьте хоть что нибуть"
        imageUrl="/package-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 my-7">
        <div class="flex gap-2">
          <span>Итoго:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} грн</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} грн</b>
        </div>
        <button
          :disabled="cartButtonDisabled"
          @click="() => emit('createOrder')"
          class="bg-lime-500 mt-4 disabled:bg-slate-300 cursor-pointer text-white hover:bg-lime-600 active:bg-lime-700 transition w-full rounded-xl py-3"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
