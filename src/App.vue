<template>
  <CurrencyCardVue USA />
  <CurrencyCardVue />
</template>

<script setup>
import { onMounted } from "vue";
import * as api from "./utils/api";
import { useCurrencyStore } from "../src/stores/currencyCalculator";

import CurrencyCardVue from "./components/CurrencyCard.vue";

const storeCurrency = useCurrencyStore();

onMounted(async () => {
  const currencyData = await api.currencies();
  storeCurrency.currencyFlags = currencyData;

  const ratesData = await api.latestExangeRates();
  storeCurrency.currencyRates = ratesData;

  storeCurrency.targetValue = ratesData.rates["EUR"];
});
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
