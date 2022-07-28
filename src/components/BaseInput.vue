<template>
  <div class="w-full">
    <label :for="id" class="text-base text-gray-700 font-medium">
      {{ label }}
    </label>
    <div
      :class="[
        'relative border border-gray-300 rounded-md shadow-sm  transition duration-300',
        { 'border-gray-700': focused },
      ]"
    >
      <input
        :id="id"
        class="w-full text-base text-gray-900 border-none px-3 py-2 rounded-md outline-none placeholder:text-gray-500"
        v-bind="$attrs"
        :value="modelValue"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
      />
      <p
        :class="['text-[13px] text-red-500 absolute -bottom-6 left-0']"
        v-show="!valid"
      >
        {{ errorText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  id: {
    type: String,
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  valid: {
    type: Boolean,
    default: true,
  },

  errors: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(["update:modelValue"]);
const focused = ref(false);

const errorText = computed(() => {
  return Object.keys(props.errors)
    .map((key) => {
      if (props.errors[key].value) {
        return props.errors[key].errorText;
      }
      return "";
    })
    .filter((text) => text !== "")[0];
});

function inputHandler(event) {
  emit("update:modelValue", event.target.value);
}

function focusHandler() {
  focused.value = true;
}

function blurHandler() {
  focused.value = false;
}
</script>
