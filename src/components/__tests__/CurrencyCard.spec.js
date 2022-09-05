import { beforeEach, describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import CurrencyCard from "../CurrencyCard.vue";

// Pinia store config
const global = {
  plugins: [
    createTestingPinia({
      createSpy: vi.fn,
    }),
  ],
};

describe("CurrencyCard", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const initWrapper = (usaBoolean) => {
    const wrapper = mount(CurrencyCard, {
      props: { label: "", USA: usaBoolean },
      global,
    });
    return wrapper;
  };

  it("Renders the component", async () => {
    const wrapper = initWrapper(false);
    expect(wrapper).not.toBeUndefined;
  });

  it("Will not render the select if USA property is true", async () => {
    const wrapper = initWrapper(true);
    expect(wrapper.html()).not.toContain(".card__combobox");
  });

  it("Will open the select when clicked", async () => {
    const wrapper = initWrapper(false);
    const selectTrigger = wrapper.find(".card__symbol");
    const selectWrapper = wrapper.find(".card__list-wrapper");

    await selectTrigger.trigger("click");

    expect(selectWrapper.classes()).toContain("card__list-wrapper--open");
  });
});
