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
          {{ storeCurrency.equivalentCurrency }}
          {{ storeCurrency.selectedCurrency }}
        </span>
      </p>
      <p>Mid-market exchange rate at {{ storeCurrency.lastUpdateAt }}</p>
    </div>
    <p class="note">Note: Since the API from Open Exchange does not allow to have more than 1 base currency on its free version I made the first input to always be USD and the other input can receive all the other currencies</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as api from "./utils/api";
import { useCurrencyStore } from "../src/stores/currencyCalculator";

import CurrencyCardVue from "./components/CurrencyCard.vue";

const storeCurrency = useCurrencyStore();

// This forces a new request for the API every 30 minutes and updates the data on the store
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
  overflow: hidden;
  .widget{
    display: flex;
    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }
  .note{
    font-size: 12px;
    margin-top: 80px;
    width: 600px;
    padding: 12px;
  }
  .messages{
    font-size: 16px;
    span{
      font-weight: 700;
    }
  }
}

</style>
