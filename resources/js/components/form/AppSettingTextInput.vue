<template>
  <div>
    <label class="m:w-3/12 mb-1 inline-flex w-10/12" :for="setting.key">{{ setting.name }}:</label>
    <input
      :id="setting.key"
      type="text"
      :name="setting.key"
      :placeholder="setting.name"
      :disabled="disabled || loading"
      class="w-100 mb-3 w-full border-transparent text-slate-800 shadow-sm outline-0 focus:outline-0 active:outline-0 rounded dark:bg-gray-900 dark:text-gray-100 border-0"
      :value="setting.val"
      @blur="updateSetting($event.target.value)"
      @keyup.enter="$event.target.blur()"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppSettingTextInput',
  props: {
    setting: { type: Object, required: true },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    updateSetting(val) {
      const { setting } = this;
      this.$emit('updateSetting', { val, setting });
    },
  },
};
</script>
