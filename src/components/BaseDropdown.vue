<template>
  <div class="relative">
    <label :for="props.id" class="text-base text-gray-700 font-medium">
      {{ label }}
    </label>
    <div
      :class="[
        'relative border border-gray-300 rounded-md shadow-sm  transition duration-300 cursor-pointer',
        { 'border-gray-700': focused },
      ]"
    >
      <input
        type="text"
        :id="id"
        class="w-full bg-arrow bg-no-repeat bg-[center_right_8px] cursor-pointer text-base truncate text-gray-900 px-3 py-2 pr-6 rounded-md border-none outline-none placeholder:text-gray-500"
        :placeholder="$attrs.placeholder"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
        :value="selectedItem[itemKey]"
        readonly
      />
    </div>
    <div
      ref="baseDropdown"
      v-if="isDropdownOpen"
      class="w-full bg-white overflow-y-auto absolute mt-1 z-1 border border-gray-300 rounded-md"
    >
      <ul>
        <li
          tabindex="0"
          class="text-base text-gray-900 truncate p-2 cursor-pointer hover:bg-neutral-400/50"
          v-for="item in list"
          :key="item.id"
          @click="onItemClick(item)"
          @keyup.enter="onItemClick(item)"
        >
          {{ item[itemKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, watch, defineEmits, onMounted } from "vue";

const props = defineProps({
  defaultItem: {
    type: Object,
  },

  id: {
    type: String,
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  list: {
    type: Array,
    required: true,
  },

  itemKey: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["selected"]);
const baseDropdown = ref(null);
let focused = ref(false);
let isDropdownOpen = ref(false);
let selectedItem = ref({
  [props.itemKey]: "",
});

onMounted(() => {
  if (props.defaultItem) {
    selectedItem.value = props.defaultItem;
    emit("selected", selectedItem.value);
  }
});

function inputHandler() {
  isDropdownOpen.value = true;
}

function focusHandler() {
  focused.value = true;
  isDropdownOpen.value = true;
}

function blurHandler() {
  focused.value = false;
}

function hideDropdown() {
  isDropdownOpen.value = false;
}

function onItemClick(item) {
  selectedItem.value = item;
  isDropdownOpen.value = false;
}

watch(selectedItem, () => emit("selected", selectedItem.value));
onClickOutside(baseDropdown, () => hideDropdown());
</script>
