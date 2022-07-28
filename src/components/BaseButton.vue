<template>
  <button
    :class="[
      'inline-flex justify-center py-2 px-4 shadow-sm text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600',
      { 'bg-teal-600 hover:bg-teal-700': props.primary },
      { 'bg-green-600 hover:bg-green-700': props.secondary },
    ]"
  >
    <slot> </slot>
  </button>
</template>

<script setup>
const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
});
</script>
