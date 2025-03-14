<script setup lang="ts">
import { useShippingStore } from '../../stores/shipping';
import { computed } from 'vue';
import ShippingQuoteCard from '../molecules/ShippingQuoteCard.vue';
import SendIcon from '../icons/sendIcon.vue';
const store = useShippingStore();

const sortedQuotes = computed(() => {
  return [...store.currentQuotes].sort((a, b) => a.shippingPrice - b.shippingPrice);
});
</script>

<template>
  <div v-if="sortedQuotes.length > 0" class="mt-8 max-w-lg mx-auto">
    <div class="flex">
      <SendIcon class="mr-2" />
      <h3 class="text-xl font-semibold mb-4">Opções de Envio Disponíveis</h3>
    </div>
    <div class="space-y-4">
      <ShippingQuoteCard
        v-for="(quote, index) in sortedQuotes"
        :key="index"
        :carrier="quote.carrier"
        :serviceDescription="quote.serviceDescription"
        :shippingPrice="quote.shippingPrice"
        :deliveryTime="quote.deliveryTime"
        :isBestPrice="index === 0"
      />
    </div>
  </div>
</template>