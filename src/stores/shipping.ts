import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { ShippingQuoteForm, ShippingQuoteResult, ShippingHistoryItem, ShippingService } from '../types/shipping';

export const useShippingStore = defineStore('shipping', () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentQuotes = ref<ShippingQuoteResult[]>([]);
  const history = ref<ShippingHistoryItem[]>([]);

  const calculateShipping = async (form: ShippingQuoteForm) => {
    isLoading.value = true;
    error.value = null;

    const requestBody = {
      SellerCEP: form.sellerCEP,
      RecipientCEP: form.recipientCEP,
      ShipmentInvoiceValue: form.invoiceValue,
      ShippingServiceCode: null,
      ShippingItemArray: form.items.map(item => ({
        Height: item.height,
        Length: item.length,
        Quantity: item.quantity,
        Weight: item.weight,
        Width: item.width,
        SKU: item.sku,
        Category: item.category || null
      })),
      RecipientCountry: form.recipientCountry
    };

    try {
      const token = import.meta.env.VITE_TOKEN_CODE;
      const api = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${api}/shipping/quote`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      if (!response.data || !Array.isArray(response.data.ShippingServicesArray)) {
        throw new Error('Invalid response format from API.');
      }

      const quotes: ShippingQuoteResult[] = response.data.ShippingServicesArray.map((service: ShippingService) => ({
        carrier: service.Carrier,
        serviceDescription: service.ServiceDescription,
        shippingPrice: parseFloat(service.ShippingPrice),
        deliveryTime: parseInt(service.DeliveryTime)
      }));

      currentQuotes.value = quotes;

      if (quotes.length > 0) {
        const bestQuote = quotes.reduce((prev, curr) => (curr.shippingPrice < prev.shippingPrice ? curr : prev));

        const historyItem: ShippingHistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          form,
          results: [bestQuote]
        };

        history.value.unshift(historyItem);
        localStorage.setItem('shippingHistory', JSON.stringify(history.value));
      }
    } catch (e: any) {
      error.value = `Error: ${e.message || 'Failed to calculate shipping. Please try again.'}`;
    } finally {
      isLoading.value = false;
    }
  };

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('shippingHistory');
    if (savedHistory) {
      history.value = JSON.parse(savedHistory);
    }
  };

  loadHistory();

  return {
    isLoading,
    error,
    currentQuotes,
    history,
    calculateShipping
  };
});