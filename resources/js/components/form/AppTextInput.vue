<template>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-3/12">
      <label
        v-if="$slots.label || label"
        :for="inputId"
        class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        :class="labelClass"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>
    </div>
    <div class="md:w-9/12">
      <input
        :id="inputId"
        :name="inputId"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full rounded border px-4 bg-white p-2 focus:outline-none dark:bg-slate-900 sm:mt-0"
        :class="
          inputClass + ' ' + (error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600')
        "
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        v-bind="$attrs"
        @input="updateValue"
      />
      <div v-if="error" class="text-red-500 -mt-0.1 text-xs absolute">
        {{ error }}
      </div>
      <slot name="message" />
    </div>
  </div>
</template>

<script setup>
import { useAttrs, computed, nextTick } from 'vue';

const props = defineProps({
  id: { type: String },
  modelValue: String,
  label: { type: String, default: null },
  placeholder: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  labelClass: { type: String, default: null },
  inputClass: { type: String, default: null },
  error: { type: String, default: null },
  autocomplete: { type: String, default: null },
  autofocus: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);
const attrs = useAttrs();

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
