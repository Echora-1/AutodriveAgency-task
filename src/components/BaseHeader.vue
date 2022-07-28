<template>
  <header class="container py-5 px-2">
    <div class="flex flex-wrap gap-5">
      <base-button
        v-for="(btn, index) in requestButtons"
        :key="index"
        @click="openModalRequestCall(btn.city)"
        class="w-full sm:w-auto"
        :primary="btn.primary"
        >{{ btn.text }}</base-button
      >
    </div>
  </header>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import cities from "../assets/data/cities.json";

const store = useStore();

const rawRequestButtons = [
  {
    text: "Заказать в Москву",
    city: "Москва",
  },
  {
    text: "Заказать в Санкт-Петербург",
    city: "Санкт-Петербург",
    primary: true,
  },
];

function getCity(cityName) {
  return cities.find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
}

const requestButtons = computed(() => {
  return rawRequestButtons.map((btn) => {
    return {
      ...btn,
      city: getCity(btn.city),
    };
  });
});

function openModalRequestCall(city) {
  store.dispatch("modals/setCityRequestCall", city);
  store.dispatch("modals/setVisibleRequestCall", true);
}
</script>
