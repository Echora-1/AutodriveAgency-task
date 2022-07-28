<template>
  <div>
    <p class="text-2xl text-gray-900 font-medium mb-6">Заказать звонок</p>
    <form
      class="grid items-end sm:grid-cols-3 gap-x-6 gap-y-5 lg:grid-cols-4 gap-x-5 gap-y-4 auto-rows-min"
      @submit.prevent="submit"
    >
      <base-input
        type="text"
        id="name"
        label="Имя*"
        placeholder="Иван Иванов"
        v-model.trim="form.name.value"
        @blur="form.name.blur"
        :valid="form.name.valid || isNeverSubmit"
        :errors="form.name.errors"
      />
      <base-input
        type="text"
        id="phone"
        label="Телефон*"
        placeholder="+7 (___) ___-__-__"
        v-model="form.phone.value"
        @blur="form.phone.blur"
        :valid="form.phone.valid || isNeverSubmit"
        :errors="form.phone.errors"
        v-maska="'+7 (###) ###-##-##'"
      />
      <base-input
        type="text"
        id="email"
        label="Email*"
        placeholder="you@example.com"
        v-model.trim="form.email.value"
        @blur="form.email.blur"
        :valid="form.email.valid || isNeverSubmit"
        :errors="form.email.errors"
      />
      <base-dropdown
        class="sm:col-span-2 lg:col-span-1"
        :list="cities"
        :default-item="modalRequestCall.city"
        item-key="name"
        label="Город*"
        id="city"
        @selected="(city) => selectedCity(city)"
      />
      <base-button class="w-full lg:col-start-4" secondary type="submit">
        Отправить
      </base-button>
    </form>
  </div>
</template>
<script setup>
import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import BaseDropdown from "../BaseDropdown.vue";
import cities from "../../assets/data/cities.json";
import { useForm } from "../../use/form";
import { required, email, phone } from "../../helpers/validators";
import { useStore } from "vuex";
import { computed, ref, defineEmits } from "vue";

const emit = defineEmits(["submitForm"]);
const store = useStore();
let isNeverSubmit = ref(true);

const form = useForm({
  name: {
    value: "",
    validators: { required },
  },
  phone: {
    value: "",
    validators: { required, phone },
  },
  email: {
    value: "",
    validators: { required, email },
  },
  city_id: {
    value: "",
  },
});

const modalRequestCall = computed(() => store.getters["modals/getRequestCall"]);

function getFormattedForm() {
  let formattedForm = {};
  let formattedPhone = "+";
  Object.keys(form).forEach((key) => {
    if (key !== "valid") {
      formattedForm[key] = form[key].value;
    }
    if (key === "phone") {
      for (let index in form[key].value) {
        if (parseInt(form[key].value[index])) {
          formattedPhone += form[key].value[index];
        }
      }
      formattedForm.phone = formattedPhone;
    }
  });
  return formattedForm;
}

function selectedCity(city) {
  form["city_id"].value = city.id;
}

function submit() {
  isNeverSubmit.value = false;
  let formattedForm = getFormattedForm(form);
  if (form.valid) {
    emit("submitForm", formattedForm);
  }
}
</script>
