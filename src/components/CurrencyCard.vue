<template>
  <div class="card">
    <input
      type="number"
      :value="checkValue()"
    />
    <div v-if="USA">USD</div>
    <div v-if="!USA" class="card__combobox">
      <span @click="open = !open">{{ storeCurrency.selectedCurrency }}</span>
      <div
        :class="['card__list-wrapper', { 'card__list-wrapper--open': open }]"
      >
        <ul>
          <li
            v-for="(flag, key) in storeCurrency.currencyFlags"
            :key="flag"
            @click="storeCurrency.setNewCurrency(key)"
          >
            {{ key }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useCurrencyStore } from "../stores/currencyCalculator";

const storeCurrency = useCurrencyStore();
const open = ref(false);

const props = defineProps({
  USA: {
    type: Boolean,
    required: false,
  },
});

const checkValue = () => {
  return props.USA ? storeCurrency.baseValue : storeCurrency.targetValue
};
</script>

<style scoped lang="scss">
.card {
  &__list-wrapper {
    font-weight: 500;
    overflow: scroll;
    height: 0;
    transition: height 0.5s;
    &--open {
      height: 300px;
      transition: height 0.5s;
    }
  }
}
</style>
