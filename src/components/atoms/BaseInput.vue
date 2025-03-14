<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <div>
    <label class="block text-sm lg:text-base font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type || 'text'"
      v-model="inputValue"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 lg:text-lg lg:p-3"
    />
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>