<template>
  <div
    class="w-screen h-screen inset-0 fixed flex z-10 bg-gray-500/75"
    v-if="isOpen"
    @click="close"
  >
    <div
      class="z-20 fixed flex flex-col w-full bg-white rounded-lg shadow-2xl top-2/4 left-2/4 p-6 -translate-y-2/4 -translate-x-2/4 max-w-4xl w-[calc(100vw-20px)] sm:w-[calc(100vw-80px)] lg:w-full"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineEmits } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

onMounted(() => document.addEventListener("keydown", handleKeydown));
onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

function handleKeydown(e) {
  if (props.isOpen && e.key === "Escape") {
    close();
  }
}

function close() {
  emit("close");
}
</script>
