<template>
  <div class="relative mb-1 flex items-center">
    <div class="my-1 mr-3 w-full cursor-pointer sm:flex sm:items-center" @click="updateSetting()">
      <span class="mr-3" :class="loading ? 'default disabled cursor-pointer' : 'cursor-pointer'">
        <AppSwitch
          :enabled="setting.val && setting.val == 1 ? true : false"
          :enable-tooltip="true"
          tooltip-on="Enable"
          tooltip-off="Disable"
        />
        <span
          v-if="loading"
          class="fa-solid fa-fw fa-1x fa-circle-notch fa-spin absolute float-left mr-4 text-slate-600"
          style="left: -1.4em; top: 1.2em"
        />
      </span>
      <span> {{ setting.name }} {{ setting.val == '1' ? 'Enabled' : 'Disabled' }} </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppSettingToggle',
  props: {
    setting: { type: Object, required: true },
    loading: { type: Boolean, default: false },
  },
  methods: {
    updateSetting() {
      const val = this.setting.val == '1' ? 0 : 1;
      const { setting } = this;
      this.$emit('updateSetting', { val, setting });
    },
  },
};
</script>
