<template>
  <div class="overflow-x-scroll rounded-lg shadow" style="width: 100%">
    <table class="min-w-full leading-normal" aria-describedby="Users Table">
      <thead>
        <tr
          class="border-b-2 border-gray-300 bg-gray-200 text-gray-600 dark:border-gray-500 dark:bg-slate-900 dark:text-gray-200"
        >
          <th
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Id
          </th>
          <th
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Slug
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Description
          </th>
          <th
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Level
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Updated At
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Updated At
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Users
          </th>
          <th
            class="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          >
            Permissions
          </th>
          <th
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          ></th>
        </tr>
      </thead>
      <tbody v-if="dataReady">
        <template v-for="role in rolesData" :key="role.id">
          <RolesTableRow
            :role="role"
            :data-ready="dataReady"
            :lock-jiggled="lockJiggled"
            @edit-role="editRole"
            @delete-role="deleteRole"
          />
        </template>
      </tbody>
      <tbody v-if="!dataReady">
        <tr
          class="bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-gray-100"
        >
          <td colspan="10" class="pt-10 pb-10 text-center">
            <span class="fa fa-circle-notch fa-spin fa-5x text-gray-400" />
          </td>
        </tr>
      </tbody>
      <tfoot class="w-full text-center">
        <tr>
          <td colspan="10">
            <div
              v-if="dataReady && rolesData && rolesData.length >= 1"
              class="xs:flex-row xs:justify-between flex flex-col items-center px-3 py-3 dark:bg-slate-700"
            >
              <Pagination
                :pagination="pagination"
                :offset="4"
                @paginate="getRoles"
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import Pagination from '@components/Pagination.vue';
import RolesTableRow from '@components/admin/RolesTableRow.vue';

export default {
  name: 'RolesTable',
  components: {
    Pagination,
    RolesTableRow,
  },
  props: {
    dataReady: { type: Boolean, default: false },
    lockJiggled: { type: Boolean, default: false },
    rolesData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    pagination: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      offset: 4,
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
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    getRoles(data) {
      this.$emit('getRoles', data);
    },
    deleteRole(value) {
      this.$emit('deleteRole', value);
    },
    editRole(value) {
      this.$emit('editRole', value);
    },
  },
};
</script>
