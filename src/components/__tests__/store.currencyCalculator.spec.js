import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCurrencyStore } from "../../stores/currencyCalculator";

import apiCurrencyRatesMock from "./api-response.json";

describe("Pinia: Currency Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const initStore = () => {
    const store = useCurrencyStore();
    store.currencyRates = apiCurrencyRatesMock;
    return store;
  };

  const getRandomCurencySymbol = (store) => {
    const ratesKeys = Object.keys(store.currencyRates.rates);
    const random = Math.floor(Math.random() * ratesKeys.length);
    const symbol = ratesKeys[random];
    return symbol;
  }

  describe("getters", () => {
    it("lastUpdateAt", () => {
      const store = initStore();
      expect(store.lastUpdateAt).toEqual("03:00 UTC");
    });

    it("equivalentCurrency", () => {
      const store = initStore();
      const defaultCurrency = parseFloat(store.equivalentCurrency);
      expect(defaultCurrency.toFixed(2) == defaultCurrency).toBeTruthy();

      store.currencyRates = {};
      expect(store.equivalentCurrency).toBeUndefined();
    });
  });

  describe("actions", () => {
    it("setNewCurrency", () => {
      const store = initStore();
      const target = getRandomCurencySymbol(store);

      store.setNewCurrency(target);
      expect(store.selectedCurrency).toEqual(target);

      const targetValueValid =
        store.targetValue == store.currencyRates.rates[target];
      expect(targetValueValid).toBeTruthy();
    });

    it("targetCurrency", () => {
      const store = initStore();
      const target = getRandomCurencySymbol(store);
      store.setNewCurrency(target);

      const randomValue = Math.random();
      const targetCurrency_ = (
        randomValue * store.currencyRates.rates[target]
      ).toFixed(2);
      expect(store.targetCurrency(randomValue)).toEqual(targetCurrency_);
    });

    it("baseCurrency", () => {
      const store = initStore();
      const target = getRandomCurencySymbol(store);
      store.setNewCurrency(target);

      const randomValue = Math.random();
      const baseCurrency_ = (
        randomValue / store.currencyRates.rates[target]
      ).toFixed(2);
      expect(store.baseCurrency(randomValue)).toEqual(baseCurrency_);
    });
  });
});
