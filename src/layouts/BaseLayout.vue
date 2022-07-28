<template>
  <base-header />
  <main class="space-x-4 space-y-2">
    <slot> </slot>
  </main>
  <base-modal
    :is-open="modalRequestCall.visible"
    @close="closeModalRequestCall"
  >
    <request-call @submitForm="(form) => submitRequestCall(form)" />
  </base-modal>
  <base-modal :is-open="modalResponse.visible" @close="closeModalResponse">
    <div v-html="responseHtml"></div>
  </base-modal>
</template>
<script setup>
import BaseHeader from "../components/BaseHeader.vue";
import BaseModal from "../components/BaseModal.vue";
import RequestCall from "../components/forms/RequestCall.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { sendFormRequestCall } from "../api";

const store = useStore();
let responseHtml = ref("");

const modalRequestCall = computed(() => store.getters["modals/getRequestCall"]);
const modalResponse = computed(() => store.getters["modals/getResponse"]);

function closeModalRequestCall() {
  store.dispatch("modals/setVisibleRequestCall", false);
}

function closeModalResponse() {
  store.dispatch("modals/setVisibleResponse", false);
}

function openModalResponse() {
  store.dispatch("modals/setVisibleResponse", true);
}

async function submitRequestCall(form) {
  let response = await sendFormRequestCall(form);
  responseHtml.value = response.data;
  openModalResponse();
  if (response.status === 200) {
    closeModalRequestCall();
  }
}
</script>
