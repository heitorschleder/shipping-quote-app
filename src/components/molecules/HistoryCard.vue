<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formateDate';
import { ShippingHistoryItem } from '../../types/shipping';

const props = defineProps<{ item: ShippingHistoryItem | undefined }>();

const formattedDate = computed(() => {
    return props.item ? formatDate(props.item.timestamp) : 'N/A'; 
});

const formattedPrice = computed(() => {
    if (props.item && props.item.results.length > 0) {
        return formatPrice(Math.min(...props.item.results.map((r) => r.shippingPrice)));
    }
    return 'N/A';
});
</script>

<template>
    <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="text-sm text-gray-600">{{ formattedDate }}</div>

        <div class="mt-2">
            <div class="flex justify-between text-sm">
                <span>De: {{ props.item?.form.sellerCEP }}</span>
                <span>Para: {{ props.item?.form.recipientCEP }}</span>
            </div>

            <div class="mt-2 text-sm">
                <div>Peso: {{ props.item?.form.items && props.item.form.items.length > 0 ? props.item.form.items[0].weight : 'N/A' }}kg
                </div>
                <div>Melhor preço: {{ formattedPrice }}</div>
            </div>
        </div>
    </div>
</template>