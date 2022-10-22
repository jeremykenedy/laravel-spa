<template>
  <div id="roles" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'admin' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Admin
          </router-link>
        </li>

        <li class="flex items-center">
          <ChevronRightIcon class="ml-2 mr-2 mt-0 h-4 w-4" />
        </li>
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'roles' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              Roles
            </span>
          </router-link>
        </li>
      </ol>
    </nav>
    <!--
    <div>
      {{ dataReady }}
      <hr />
      {{ roles }}
      <hr />
      {{ rolesData }}
    </div>
     -->
  </div>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'Roles',
  components: {
    ChevronRightIcon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      rolesData: null,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.getRoles();
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getRoles() {
      this.dataReady = false;
      await axios
        .get(`/api/roles-complete`)
        .then(({ data }) => {
          this.rolesData = data.roles;
          this.dataReady = true;
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Getting Roles`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
