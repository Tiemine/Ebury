import { defineStore } from "pinia";

export const useCurrencyStore = defineStore({
  id: "currencyCalculator",
  state: () => ({
    currencyRates: {},
    currencyFlags: {},
    selectedCurrency: "GBP",
    baseValue: 1,
    targetValue: 0,
  }),
  getters: {
    lastUpdateAt: (state) => {
      let time = new Date(state.currencyRates.timestamp * 1000);
      let hour = String(time.getUTCHours()).padStart(2, "0");
      let minutes = String(time.getUTCMinutes()).padStart(2, "0");

      return `${hour}:${minutes} UTC`;
    },
  },
  actions: {
    setNewCurrency(currency) {
      this.selectedCurrency = currency;
      this.targetValue = this.currencyRates.rates[currency];
    },
    targetCurrency(value) {
      this.targetValue =
        value * this.currencyRates.rates[this.selectedCurrency];
      return this.targetValue.toFixed(2);
    },
    baseCurrency(value) {
      this.baseValue = value / this.currencyRates.rates[this.selectedCurrency]
      return this.baseValue.toFixed(2);
    },
  },
});
