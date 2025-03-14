<script setup lang="ts">
defineProps<{
  carrier: string;
  serviceDescription: string;
  shippingPrice: number;
  deliveryTime: number;
  isBestPrice?: boolean;
}>();

import { formatPrice } from '../../utils/formatPrice';
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md border border-gray-200" :class="{ 'border-green-500': isBestPrice }">
    <div class="flex justify-between items-start">
      <div>
        <h4 class="font-medium text-lg">{{ carrier }}</h4>
        <p class="text-gray-600">{{ serviceDescription }}</p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-blue-600">{{ formatPrice(shippingPrice) }}</p>
        <p class="text-gray-600">{{ deliveryTime }} dias úteis</p>
      </div>
    </div>

    <div v-if="isBestPrice" class="mt-2">
      <span class="text-green-600 text-sm font-medium">Melhor Preço</span>
    </div>
  </div>
</template>