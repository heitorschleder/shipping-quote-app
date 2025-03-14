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
      const response = await axios.post('/api/shipping/quote', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'token': import.meta.env.VITE_TOKEN_CODE,
        }
      });

      const data = response.data;

      const quotes: ShippingQuoteResult[] = data.ShippingSevicesArray
        .map((service: ShippingService): ShippingQuoteResult | null => {
          const price = parseFloat(service.ShippingPrice);
          if (isNaN(price)) {
            return null;
          }
          return {
            carrier: service.Carrier,
            serviceDescription: service.ServiceDescription,
            shippingPrice: price,
            deliveryTime: parseInt(service.DeliveryTime)
          };
        })
        .filter((quote: ShippingQuoteResult | null): quote is ShippingQuoteResult => quote !== null);

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
    } catch (e) {
      error.value = 'Error: Failed to calculate shipping. Please try again.';
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

  const clearHistory = () => {
    history.value = [];
    localStorage.removeItem('shippingHistory');
  };

  loadHistory();

  return {
    isLoading,
    error,
    currentQuotes,
    history,
    calculateShipping,
    clearHistory
  };
});