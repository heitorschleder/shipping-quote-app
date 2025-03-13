<script setup lang="ts">
import { ref } from 'vue';
import { useShippingStore } from '../stores/shipping';
import type { ShippingQuoteForm } from '../types/shipping';
import { formatPostalCode } from '../utils/formatPostalCode';

const store = useShippingStore();

const form = ref<ShippingQuoteForm>({
  sellerCEP: '',
  recipientCEP: '',
  invoiceValue: 0,
  items: [{
    height: 0,
    length: 0,
    quantity: 1,
    weight: 0,
    width: 0,
    sku: '',
    category: ''
  }],
  recipientCountry: 'BR'
});

const handleSubmit = async () => {
  await store.calculateShipping(form.value);
};
</script>
<template>
  <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Simule seu Frete</h2>

    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">CEP de Origem</label>
          <input type="text" v-model="form.sellerCEP" @input="e => {
            const value = (e.target as HTMLInputElement).value;
            form.sellerCEP = formatPostalCode(value);
          }" maxlength="9" placeholder="00000-000"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">CEP de Destino</label>
          <div class="flex items-center mt-1">
            <input type="text" v-model="form.recipientCEP" @input="e => {
              const value = (e.target as HTMLInputElement).value;
              form.recipientCEP = formatPostalCode(value);
            }" maxlength="9" placeholder="00000-000"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-20" />
            <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank"
              class="text-blue-500 text-[11px] hover:underline absolute right-3">
              Não sei o CEP
            </a>
          </div>
        </div>
      </div>

      <!-- Info prod -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input placeholder="0" type="number" v-model="form.items[0].weight" min="0" step="0.1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div> 
          <label class="block text-sm font-medium text-gray-700">Valor (R$)</label> 
          <input type="number" v-model="form.invoiceValue" min="0" step="0.01"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Comprimento (cm)</label>
          <input type="number" v-model="form.items[0].length" min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Largura (cm)</label>
          <input type="number" v-model="form.items[0].width" min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Altura (cm)</label>
          <input type="number" v-model="form.items[0].height" min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <button type="submit" :disabled="store.isLoading"
      class="mt-6 w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
      {{ store.isLoading ? 'Calculando...' : 'Calcular' }}
    </button>

    <p v-if="store.error" class="mt-4 text-red-600">{{ store.error }}</p>
  </form>
</template>