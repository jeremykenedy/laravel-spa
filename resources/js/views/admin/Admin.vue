<template>
  <div id="admin" class="bg-white p-3 dark:bg-slate-800 dark:text-gray-200">
    <div v-if="roles" class="float-right mb-6 text-center">
      <RolesBadges :roles="roles" />
    </div>
    <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex list-none p-0">
        <li class="flex items-center">
          <router-link
            v-if="authenticated && roles && (roles.admin || roles.superAdmin)"
            v-slot="{ isActive }"
            :to="{ name: 'admin' }"
            class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <span
              :class="[
                isActive &&
                  'cursor-default text-gray-800 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-500',
              ]"
            >
              Admin
            </span>
          </router-link>
        </li>
      </ol>
    </nav>

    <div class="mb-6 items-center justify-between lg:flex">
      <p class="mb-2 text-2xl font-semibold lg:mb-0">
        {{ greeting }}, {{ user.name }}!
      </p>
      <!--
      <button
        class="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white shadow hover:bg-blue-600 focus:outline-none"
      >
        View Logs
      </button>
      -->
    </div>

    <div class="-mx-3 mb-20 flex flex-wrap">
      <div
        v-if="authenticated && roles && roles.superAdmin"
        class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/4"
      >
        <router-link :to="{ name: 'users' }">
          <div
            class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700"
          >
            <span
              class="fas fa-user fa-fw fa-3x text-gray-700 dark:text-gray-300"
            />
            <div>
              <p
                class="text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                <span
                  v-if="loading"
                  class="fas fa-circle-notch fa-spin fa-xs"
                />
                <span v-if="!loading">
                  {{ users.length }}
                </span>
              </p>
              <p class="text-gray-600 dark:text-gray-400">Registered Users</p>
            </div>
          </div>
        </router-link>
      </div>

      <div
        v-if="authenticated && roles && roles.superAdmin"
        class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/4"
      >
        <router-link :to="{ name: 'roles' }">
          <div
            class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700"
          >
            <span
              class="fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300"
            />
            <div>
              <p
                class="text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                <span
                  v-if="loading"
                  class="fas fa-circle-notch fa-spin fa-xs"
                />
                <span v-if="!loading">
                  {{ rolesData.length }}
                </span>
              </p>
              <p class="text-gray-600 dark:text-gray-400">Roles</p>
            </div>
          </div>
        </router-link>
      </div>

      <div
        v-if="authenticated && roles && roles.superAdmin"
        class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/4"
      >
        <router-link :to="{ name: 'permissions' }">
          <div
            class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700"
          >
            <span
              class="fas fa-shield-alt fa-fw fa-3x text-gray-700 dark:text-gray-300"
            />
            <div>
              <p
                class="text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                <span
                  v-if="loading"
                  class="fas fa-circle-notch fa-spin fa-xs"
                />
                <span v-if="!loading">
                  {{ permissionsData.length }}
                </span>
              </p>
              <p class="text-gray-600 dark:text-gray-400">Permissions</p>
            </div>
          </div>
        </router-link>
      </div>

      <div
        v-if="authenticated && roles && roles.superAdmin"
        class="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/4"
      >
        <router-link :to="{ name: 'app-settings' }">
          <div
            class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-gray-600 hover:bg-gray-100 dark:border-slate-900 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-700"
          >
            <span
              class="fas fa-lock fa-fw fa-3x text-gray-700 dark:text-gray-300"
            />
            <div>
              <p
                class="text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                <span
                  v-if="loading"
                  class="fas fa-circle-notch fa-spin fa-xs"
                />
                <span
                  v-if="!loading"
                  class="fa-brands fa-square-facebook fa-fw"
                  :class="
                    checkSettingEnabled('enableFbLogin')
                      ? 'text-blue-600 dark:text-blue-600'
                      : 'text-gray-300 dark:text-gray-800'
                  "
                >
                </span>
                <span
                  v-if="!loading"
                  class="fa-brands fa-twitter fa-fw"
                  :class="
                    checkSettingEnabled('enableTwitterLogin')
                      ? 'text-blue-300 dark:text-blue-300'
                      : 'text-gray-300 dark:text-gray-800'
                  "
                >
                </span>
                <span
                  v-if="!loading"
                  class="fa-brands fa-google fa-fw"
                  :class="
                    checkSettingEnabled('enableGoogleLogin')
                      ? 'text-green-300 dark:text-green-300'
                      : 'text-gray-300 dark:text-gray-800'
                  "
                >
                </span>
              </p>
              <p class="text-gray-600 dark:text-gray-400">Logins Enabled</p>
            </div>
          </div>
        </router-link>
      </div>

      <!--
      <div class="w-full sm:w-1/2 px-3 xl:w-1/3">
        <div
          class="mb-6 flex w-full items-center rounded-lg border bg-white p-6 text-blue-400 xl:mb-0"
        >
          <svg
            class="mr-4 hidden h-16 w-16 fill-current lg:block"
            viewBox="0 0 20 20"
          >
            <path
              d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
            ></path>
          </svg>

          <div class="text-gray-700">
            <p class="text-3xl font-semibold">177</p>
            <p>Product Reviews</p>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 px-3 xl:w-1/3">
        <div
          class="flex w-full items-center rounded-lg border bg-white p-6 text-blue-400"
        >
          <svg
            class="mr-4 hidden h-16 w-16 fill-current lg:block"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"
            ></path>
          </svg>

          <div class="text-gray-700">
            <p class="text-3xl font-semibold">31</p>
            <p>New Enquiries</p>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 px-3 xl:w-1/3">
        <div
          class="flex w-full items-center rounded-lg border bg-white p-6 text-blue-400"
        >
          <svg
            class="mr-4 hidden h-16 w-16 fill-current lg:block"
            viewBox="0 0 20 20"
          >
            <path
              d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"
            ></path>
          </svg>

          <div class="text-gray-700">
            <p class="text-3xl font-semibold">1,653</p>
            <p>Product Views</p>
          </div>
        </div>
      </div>
       -->
    </div>

    <!--
    <div class="-mx-3 flex flex-wrap">
      <div class="w-full px-3 xl:w-1/3">
        <p class="mb-4 text-xl font-semibold">Recent Sales</p>

        <div class="mb-8 w-full rounded-lg border bg-white p-4 xl:mb-0">
          <canvas id="buyers-chart" width="600" height="400"></canvas>
        </div>
      </div>

      <div class="w-full px-3 xl:w-1/3">
        <p class="mb-4 text-xl font-semibold">Recent Reviews</p>

        <div class="mb-8 w-full rounded-lg border bg-white p-4 xl:mb-0">
          <canvas id="reviews-chart" width="600" height="400"></canvas>
        </div>
      </div>

      <div class="w-full px-3 xl:w-1/3">
        <p class="mb-4 text-xl font-semibold">Recent Transactions</p>
        <div class="w-full rounded-lg border bg-white p-4">
          <div
            class="mb-4 flex w-full items-center justify-between rounded-lg border bg-gray-100 px-4 py-2"
          >
            <div>
              <p class="text-xl font-semibold">Trent Murphy</p>
              <p>Product 1</p>
            </div>
            <span class="text-lg font-semibold text-green-500">$25.00</span>
          </div>

          <div
            class="mb-4 flex w-full items-center justify-between rounded-lg border bg-gray-100 px-4 py-2"
          >
            <div>
              <p class="text-xl font-semibold">Joseph Brent</p>
              <p>Product 34</p>
            </div>
            <span class="text-lg font-semibold text-red-500">$74.99</span>
          </div>

          <div
            class="mb-4 flex w-full items-center justify-between rounded-lg border bg-gray-100 px-4 py-2"
          >
            <div>
              <p class="text-xl font-semibold">Jacob Bator</p>
              <p>Product 23</p>
            </div>
            <span class="text-lg font-semibold text-green-500">$14.95</span>
          </div>

          <div
            class="flex w-full items-center justify-between rounded-lg border bg-gray-100 px-4 py-2"
          >
            <div>
              <p class="text-xl font-semibold">Alex Mason</p>
              <p>Product 66</p>
            </div>
            <span class="text-lg font-semibold text-green-500">$44.99</span>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
// import Chart from 'chart.js';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import RolesBadges from '@components/roles/RolesBadges.vue';

export default {
  name: 'Admin',
  components: {
    ChevronRightIcon,
    RolesBadges,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      dataReady: false,
      loading: false,
      users: [],
      rolesData: [],
      permissionsData: [],
      authSettings: [],
      // buyersData: {
      //   type: 'line',
      //   data: {
      //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //     datasets: [
      //       {
      //         backgroundColor: 'rgba(99,179,237,0.4)',
      //         strokeColor: '#63b3ed',
      //         pointColor: '#fff',
      //         pointStrokeColor: '#63b3ed',
      //         data: [203, 156, 99, 251, 305, 247, 256],
      //       },
      //       {
      //         backgroundColor: 'rgba(198,198,198,0.4)',
      //         strokeColor: '#f7fafc',
      //         pointColor: '#fff',
      //         pointStrokeColor: '#f7fafc',
      //         data: [86, 97, 144, 114, 94, 108, 156],
      //       },
      //     ],
      //   },
      //   options: {
      //     legend: {
      //       display: false,
      //     },
      //     scales: {
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //           ticks: {
      //             display: false,
      //           },
      //         },
      //       ],
      //       xAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // },
      // reviewsData: {
      //   type: 'bar',
      //   data: {
      //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //     datasets: [
      //       {
      //         backgroundColor: 'rgba(99,179,237,0.4)',
      //         strokeColor: '#63b3ed',
      //         pointColor: '#fff',
      //         pointStrokeColor: '#63b3ed',
      //         data: [203, 156, 99, 251, 305, 247, 256],
      //       },
      //     ],
      //   },
      //   options: {
      //     legend: {
      //       display: false,
      //     },
      //     scales: {
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //           ticks: {
      //             display: false,
      //           },
      //         },
      //       ],
      //       xAxes: [
      //         {
      //           gridLines: {
      //             display: false,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // },
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      roles: 'auth/roles',
    }),
    greeting() {
      const date = new Date();
      const currentTime = date.getHours();
      let greeting;
      if (currentTime >= 0 && currentTime <= 12) {
        greeting = 'Good Morning';
      } else if (currentTime > 12 && currentTime <= 18) {
        greeting = 'Good Afternoon';
      } else {
        greeting = 'Good Evening';
      }
      return greeting;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getDashboardData();
    // new Chart(document.getElementById('buyers-chart'), this.buyersData);
    // new Chart(document.getElementById('reviews-chart'), this.reviewsData);
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getDashboardData() {
      this.loading = true;
      await axios
        .get(`/api/dashboard/data`)
        .then(({ data }) => {
          this.users = data.users;
          this.rolesData = data.roles;
          this.authSettings = data.authSettings;
          this.permissionsData = data.permissions;
          this.dataReady = true;
          this.loading = false;
        })
        .catch(({ response }) => {
          this.popToast({
            message: `Error Getting Users`,
            timer: 5000,
            icon: 'error',
          });
          this.dataReady = true;
        });
      this.dataReady = true;
    },
    checkSettingEnabled(key = null) {
      let found = false;
      let enabled = false;
      if (key) {
        found = this.authSettings.find((obj) => obj.key == key);
        if (found && found.val == 1) {
          enabled = true;
        }
      }
      return enabled;
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
