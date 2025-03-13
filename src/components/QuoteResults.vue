<script setup lang="ts">
import { useShippingStore } from '../stores/shipping';
import { computed } from 'vue';

const store = useShippingStore();

const sortedQuotes = computed(() => {
  return [...store.currentQuotes].sort((a, b) => a.shippingPrice - b.shippingPrice);
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};
</script>

<template>
  <div v-if="sortedQuotes.length > 0" class="mt-8 max-w-lg mx-auto">
    <h3 class="text-xl font-semibold mb-4">Opções de Envio Disponíveis</h3>
    
    <div class="space-y-4">
      <div
        v-for="(quote, index) in sortedQuotes"
        :key="index"
        class="p-4 bg-white rounded-lg shadow-md border border-gray-200"
        :class="{ 'border-green-500': index === 0 }"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium text-lg">{{ quote.carrier }}</h4>
            <p class="text-gray-600">{{ quote.serviceDescription }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-blue-600">{{ formatPrice(quote.shippingPrice) }}</p>
            <p class="text-gray-600">{{ quote.deliveryTime }} dias úteis</p>
          </div>
        </div>
        
        <div v-if="index === 0" class="mt-2">
          <span class="text-green-600 text-sm font-medium">Melhor Preço</span>
        </div>
      </div>
    </div>
  </div>
</template>