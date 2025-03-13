<script setup lang="ts">
import ShippingForm from './components/ShippingForm.vue';
import QuoteResults from './components/QuoteResults.vue';
import HistorySidebar from './components/HistorySidebar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-900 shadow">
      <div class="flex items-center max-w-7xl mx-auto py-6 px-4">
        <img src="https://frenet-customer-logo.s3.sa-east-1.amazonaws.com/marketing/logo-10anos.svg" alt="logo">
        <h1 class="text-3xl font-bold text-yellow-50 ml-10">Calculadora de Frete</h1>
      </div>
    </header>

    <main class="flex">
      <div class="flex-1 py-6">
        <ShippingForm />
        <QuoteResults />
      </div>
      <HistorySidebar />
    </main>
  </div>
</template>