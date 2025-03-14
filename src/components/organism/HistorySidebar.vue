<script setup lang="ts">
import { ref } from 'vue';
import { useShippingStore } from '../../stores/shipping';
import HistoryIcon from '../icons/historyIcon.vue';
import HistoryCard from '../molecules/HistoryCard.vue';

const store = useShippingStore();
const isHistoryVisible = ref(false);
</script>

<template>
  <button @click="isHistoryVisible = !isHistoryVisible"
    class="md:hidden bg-blue-500 text-white px-4 py-2 rounded-lg fixed bottom-4 right-4 shadow-lg z-[99]">
    {{ isHistoryVisible ? 'Fechar Histórico' : 'Abrir Histórico' }}
  </button>
  <div :class="{'hidden md:block': !isHistoryVisible, 'fixed inset-0 bg-white z-50 p-4 overflow-y-auto': isHistoryVisible}" class="w-80 bg-gray-50 p-4 border-l border-gray-200 h-auto overflow-y-auto md:relative md:z-auto">
    <div class="flex">
      <HistoryIcon class="mb-4 mr-2" />
      <h3 class="text-lg font-semibold mb-4">Histórico</h3> 
    </div>

    <div v-if="store.history.length === 0" class="text-gray-500">
      Sem histórico
    </div>

    <div v-else class="space-y-4 z-10">
      <HistoryCard v-for="item in store.history" :key="item.id" :item="item" />
    </div>
  </div>
</template>