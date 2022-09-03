<template>
  <div class="card">
    <div class="card__label">{{ label }}</div>
    <div v-if="USA" class="card__symbol">USD</div>
    <div class="currency-flag currency-flag-usd"></div>
    <div v-if="!USA" class="card__combobox">
      <span class="card__symbol" @click="open = !open">{{
        storeCurrency.selectedCurrency
      }}</span>
      <div
        :class="['card__list-wrapper', { 'card__list-wrapper--open': open }]"
      >
        <input type="text" />
        <ul>
          <li
            v-for="(flag, key) in storeCurrency.currencyFlags"
            :key="flag"
            @click="handleSelect(key)"
          >
            {{ key }}
          </li>
        </ul>
      </div>
    </div>
    <input
      type="number"
      class="card__input"
      :value="checkValue()"
      :autofocus="!USA"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCurrencyStore } from "../stores/currencyCalculator";

const storeCurrency = useCurrencyStore();
const open = ref(false);

const props = defineProps({
  USA: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
});

const checkValue = () =>
  props.USA ? storeCurrency.baseValue : storeCurrency.targetValue;

const handleSelect = (key) => {
  storeCurrency.setNewCurrency(key);
  open.value = !open.value;
};

const handleInput = (evt) => {
  const inputValue = evt.target.value;
  if (props.USA) storeCurrency.targetCurrency(inputValue);
  else storeCurrency.baseCurrency(inputValue);
};
</script>

<style scoped lang="scss">
.card {
  margin: 24px 32px;
  width: 250px;
  &__list-wrapper {
    width: 100%;
    font-weight: 500;
    overflow: scroll;
    overflow-x: hidden;
    height: 0;
    transition: height 0.5s;
    &--open {
      height: 300px;
      transition: height 0.5s;
    }
    &::-webkit-scrollbar {
      width:10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #e7e7e7;
    }
    &::-webkit-scrollbar-thumb {
      background: #949494;
      border-radius: 25px;
    }
  }
  &__combobox {
    position: relative;
  }
  &__symbol {
    font-size: 16px;
    color: #4a4a4a;
    font-weight: 500;
    width: 100%;
    display: block;
    border-bottom: 1px solid #c5c5c5;
  }
  span {
    cursor: pointer;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: calc(50% - 6px);
      right: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #c5c5c5;
    }
  }
  &__list-wrapper {
    position: absolute;
    z-index: 1;
    background: #fff;
    -webkit-box-shadow: 7px 10px 19px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 7px 10px 19px 0px rgba(0, 0, 0, 0.2);
    ul {
      margin-top: 24px;
      list-style-type: none;
      padding: 0;
      li {
        padding: 10px;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
  &__input {
    margin-top: 36px;
    font-family: "Montserrat", sans-serif;
    color: #4a4a4a;
    width: 100%;
    font-size: 80px;
    font-weight: 300;
    text-align: center;
    background: transparent;
    outline: transparent;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    border: 0;
    -moz-appearance: textfield;
  }
}
</style>
