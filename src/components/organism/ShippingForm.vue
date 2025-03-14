<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useShippingStore } from '../../stores/shipping';
import type { ShippingQuoteForm } from '../../types/shipping';
import { formatPostalCode } from '../../utils/formatPostalCode';
import LoadingIcon from '../icons/loadingIcon.vue';
import TruckIcon from '../icons/truckIcon.vue';
import BaseInput from '../atoms/BaseInput.vue';

const cepSearch = "https://buscacepinter.correios.com.br/app/endereco/index.php";
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

const errors = ref<{ [key: string]: string }>({});

const validateForm = () => {
  errors.value = {};
  if (!form.value.sellerCEP) errors.value.sellerCEP = 'Informe o CEP de origem';
  if (!form.value.recipientCEP) errors.value.recipientCEP = 'Informe o CEP de destino';
  if (form.value.invoiceValue <= 0 || isNaN(form.value.invoiceValue)) errors.value.invoiceValue = 'Informe um valor válido (ex: 0.01)';
  if (form.value.items[0].weight <= 0 || isNaN(form.value.items[0].weight)) errors.value.weight = 'Informe um peso válido (ex: 0.001)';
  if (form.value.items[0].width <= 0) errors.value.width = 'Informe a largura';
  if (form.value.items[0].height <= 0) errors.value.height = 'Informe a altura';
  if (form.value.items[0].length <= 0) errors.value.length = 'Informe o comprimento';
};

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

watch(form, validateForm, { deep: true });

const handleSubmit = async () => {
  validateForm();
  if (!isFormValid.value) return;
  await store.calculateShipping(form.value);
};

const handleSellerCEPInput = (e: InputEvent) => {
  form.value.sellerCEP = formatPostalCode((e.target as HTMLInputElement).value);
};

</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-xl lg:max-w-7xl mx-auto p-4 lg:p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center">
      <h2 class="text-2xl lg:text-3xl font-bold mb-4">Simule seu Frete</h2>
      <TruckIcon class="mb-[10px]"/>
    </div>

    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput v-model="form.sellerCEP" label="CEP de Origem" placeholder="00000-000" :error="errors.sellerCEP"
          @input="handleSellerCEPInput" />

        <div class="relative">
          <label class="block text-sm lg:text-base font-medium text-gray-700">CEP de Destino</label>
          <input type="text" v-model="form.recipientCEP"
            @input="e => form.recipientCEP = formatPostalCode((e.target as HTMLInputElement).value)" maxlength="9"
            placeholder="00000-000"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 lg:text-lg lg:p-3" />
          <a :href="cepSearch" target="_blank"
            class="text-blue-500 mt-1 text-[12px] font-bold hover:underline absolute right-3 top-1/2 transform -translate-y-1/2">
            Não sei o CEP
          </a>
          <p v-if="errors.recipientCEP" class="text-red-600 text-sm">{{ errors.recipientCEP }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm lg:text-base font-medium text-gray-700">Peso (kg)</label>
          <input type="number" maxlength="7" v-model="form.items[0].weight"label="Peso (kg)" step="0.001" placeholder="0.000"
          :error="errors.weight"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 lg:text-lg lg:p-3" />
        </div>
        <div>
          <label class="block text-sm lg:text-base font-medium text-gray-700">Valor (R$)</label>
          <input  v-model="form.invoiceValue" maxlength="7" label="Valor (R$)" type="number" step="0.01" placeholder="0.00"
          :error="errors.invoiceValue" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 lg:text-lg lg:p-3" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <BaseInput v-model="form.items[0].width" label="Largura (cm)" type="number" placeholder="0"
          :error="errors.width" maxlength="5" />
        <BaseInput v-model="form.items[0].height" maxlength="6" label="Altura (cm)" type="number" placeholder="0"
          :error="errors.height" />
      </div>

      <BaseInput v-model="form.items[0].length" maxlength="6" label="Comprimento (cm)" type="number" placeholder="0"
        :error="errors.length" class="md:col-span-3" />
    </div>

    <div class="flex justify-end mt-4">
      <button type="submit" :disabled="Object.keys(errors).length > 0"
        class="w-40 bg-blue-900 text-white py-2 px-4 lg:py-2 lg:px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2 lg:text-lg">
        <LoadingIcon v-if="store.isLoading" />
        {{ store.isLoading ? 'Calculando...' : 'Calcular' }}
      </button>
    </div>
    
    <p v-if="store.error" class="mt-4 text-red-600 lg:text-lg">{{ store.error }}</p>
  </form>
</template>