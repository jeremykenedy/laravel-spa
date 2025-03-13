<template>
  <div id="browser_sessions" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold float-left ml-2 mt-2" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'dashboard' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            {{ $t('dashboard') }}
          </router-link>
        </li>
        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link v-slot="{ isActive }" :to="{ name: 'browser_sessions.index' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400">
            <span :class="[
              isActive &&
              'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
            ]">
              {{ $t('browser_sessions') }}
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <div class="mx-auto max-w-screen-lg text-gray-900 clear-both">
      <div class="flex justify-center">
        <div class="flex-1">
          <div class="w-auto rounded border dark:border-gray-600">
            <div class="border-b p-4 font-semibold dark:border-gray-600 dark:text-gray-200">
              {{ $t('browser_sessions') }}
            </div>
            <div class="rounded bg-white p-4 dark:bg-slate-800 dark:text-gray-300">
              <p class="mb-4">
                {{ $t('browser_sessions_note') }}
              </p>
              <ul v-if="sessions && sessions.length > 0" role="list" class="divide-y divide-white/5 mb-4">
                <li v-for="session in sessions" class="py-4">
                  <div class="flex items-center gap-x-3">
                    <ComputerDesktopIcon class="size-6 flex-none rounded text-gray-800" />
                    <h3 class="flex-auto truncate text-sm/6 font-bold text-gray-800 ">
                      {{ session?.device?.platform }} - {{ session?.device?.browser }}
                    </h3>
                    <span class="flex-none text-xs text-gray-500"
                      :class="session?.is_current_device ? 'text-green-500' : 'text-gray-500'">
                      {{ session?.is_current_device ? 'This device' : ('Last active ' + session?.last_active) }}
                    </span>
                  </div>
                  <p class="mt-3 truncate text-sm text-gray-700">{{ $t('ip_address') }}
                    <span class="font-mono text-gray-600">{{ session?.ip_address }}</span>
                  </p>
                </li>
              </ul>
              <div class="mt-5 mb-3">
                <AppButton icon="fa-solid fa-power-off " warning @click="logOutOtherDevices"
                  text="Logout Other Browser Sessions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { ComputerDesktopIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import AppButton from '@components/common/AppButton.vue';
import axios from "axios";
const swal = inject('$swal')
const sessions = ref([])

const logOutOtherDevices = async () => {
  const { value: password } = await swal.fire({
    title: "Are you sure?",
    input: "password",
    inputPlaceholder: "Enter your password to continue",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, log out!",
    confirmButtonColor: "#ef4444",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (password) {
    try {
      await axios.post("/api/logout-other-devices", {
        password: password
      });
      getBrowserSessions();
      swal.fire({
        icon: "success",
        title: "Logged out of other browser sessions.",
      });
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  }
};

const getBrowserSessions = (() => {
  axios.get('/api/browser-sessions').then(({ data }) => {
    sessions.value = data;
  })
})

onMounted(() => {
  getBrowserSessions()
})
</script>

<style scoped></style>
