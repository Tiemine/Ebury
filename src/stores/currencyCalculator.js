import { defineStore } from "pinia";

export const useCurrencyStore = defineStore({
  id: "currencyCalculator",
  state: () => ({
    currencyRates: {},
    currencyFlags: {},
    selectedCurrency: "EUR",
    baseValue: 1,
    targetValue: 0,
  }),
  actions: {
    setNewCurrency(currency) {
      this.selectedCurrency = currency;
      this.targetValue = this.currencyRates.rates[currency];
    },
  },
});
