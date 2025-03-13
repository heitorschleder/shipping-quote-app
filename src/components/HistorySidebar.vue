<script setup lang="ts">
import { useShippingStore } from '../stores/shipping';

const store = useShippingStore();

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};
</script>

<template>
  <div class="w-80 bg-gray-50 p-4 border-l border-gray-200 h-auto overflow-y-auto">
    <h3 class="text-lg font-semibold mb-4">Histórico</h3>
    
    <div v-if="store.history.length === 0" class="text-gray-500">
      Sem histórico
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="item in store.history"
        :key="item.id"
        class="bg-white p-4 rounded-lg shadow-sm"
      >
        <div class="text-sm text-gray-600">{{ formatDate(item.timestamp) }}</div>
        
        <div class="mt-2">
          <div class="flex justify-between text-sm">
            <span>De: {{ item.form.sellerCEP }}</span>
            <span>Para: {{ item.form.recipientCEP }}</span>
          </div>
          
          <div class="mt-2 text-sm">
            <div>Peso: {{ item.form.items && item.form.items.length > 0 ? item.form.items[0].weight : 'N/A' }}kg</div>
            <div>Melhor preço: {{ formatPrice(Math.min(...item.results.map(r => r.shippingPrice))) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>