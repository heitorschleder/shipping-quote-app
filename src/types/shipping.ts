export interface ShippingQuoteForm {
  sellerCEP: string;
  recipientCEP: string;
  invoiceValue: number;
  items: ShippingItem[];
  recipientCountry: string;
}

export interface ShippingItem {
  height: number;
  length: number;
  quantity: number;
  weight: number;
  width: number;
  sku: string;
  category?: string | null;
}

export interface ShippingService {
  Carrier: string;
  CarrierCode: string;
  DeliveryTime: string;
  Msg: string;
  ServiceCode: string;
  ServiceDescription: string;
  ShippingPrice: string;
  OriginalDeliveryTime: string;
  OriginalShippingPrice: string;
  Error: boolean;
}

export interface ShippingQuoteResult {
  carrier: string;
  serviceDescription: string;
  shippingPrice: number;
  deliveryTime: number;
}

export interface ShippingHistoryItem {
  id: string;
  timestamp: number;
  form: ShippingQuoteForm;
  results: ShippingQuoteResult[];
}