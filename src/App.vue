<template>
  <div class="wrapper">
    <div class="widget">
      <CurrencyCardVue USA label="From" />
      <CurrencyCardVue label="To" />
    </div>
    <div class="messages">
      <p>
      <span>1.00 USD</span>
      equals to
      <span>
        {{ storeCurrency.selectedCurrency }}
        </span>
      </p>
      <p>Mid-market exchange rate at {{ storeCurrency.lastUpdateAt }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as api from "./utils/api";
import { useCurrencyStore } from "../src/stores/currencyCalculator";

import CurrencyCardVue from "./components/CurrencyCard.vue";

const storeCurrency = useCurrencyStore();

setInterval(() => {
  renewData();
}, 60000 * 30);

const renewData = async () => {
  const ratesData = await api.latestExangeRates();
  storeCurrency.currencyRates = ratesData;
};

onMounted(async () => {
  const currencyData = await api.currencies();
  storeCurrency.currencyFlags = currencyData;

  await renewData();

  storeCurrency.targetValue = storeCurrency.currencyRates.rates["GBP"];
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');
.wrapper{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4a4a4a;
  background: #f7f7f7;
  .widget{
    display: flex;
  }
  .messages{
    font-size: 16px;
    span{
      font-weight: 700;
    }
  }
}

</style>
