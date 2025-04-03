<template>
  <span v-tippy="enableTooltip ? (enabled ? tooltipOff : tooltipOn) : null" class="mt-1 inline-block">
    <Switch
      :class="enabled ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-400 dark:bg-gray-600'"
      class="relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-4 bg-white dark:bg-slate-800' : 'translate-x-0 bg-white dark:bg-slate-800'"
        class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </span>
</template>

<script lang="ts">
import { Switch } from '@headlessui/vue';

export default {
  name: 'AppSwitch',
  components: {
    Switch, // eslint-disable-line
  },
  props: {
    enabled: { type: Boolean, default: false },
    enableTooltip: { type: Boolean, default: false },
    tooltipOn: { type: String, default: 'Enable' },
    tooltipOff: { type: String, default: 'Disable' },
  },
};
</script>
