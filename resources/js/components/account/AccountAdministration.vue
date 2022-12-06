<template>
  <div>
    <ShieldExclamationIcon
      class="ml-auto mr-auto mt-6 mb-5 h-14 w-14 text-red-500"
    />
    <h3 class="mb-5 text-center text-lg text-red-500">Delete Account</h3>
    <p class="mb-3 text-center text-red-600">
      <span class="fa fa-exclamation-triangle fa-fw mr-3" aria-hidden="true" />
      <strong>Deleting</strong> your account is
      <u><strong>permanent</strong></u> and <u><strong>cannot</strong></u> be
      undone.
      <span class="fa fa-exclamation-triangle fa-fw ml-3" aria-hidden="true" />
    </p>
    <div
      class="mb-4 content-center rounded p-4 text-center"
      :class="readyToDelete ? 'font-bold text-red-500' : 'text-yellow-600'"
    >
      <AppSwitch
        :enabled="readyToDelete"
        :class="loading ? 'disabled' : ''"
        :disabled="loading"
        @click="readyToDelete = !readyToDelete"
      />
      <h3
        style="vertical-align: 4px"
        class="ml-3 inline-block cursor-pointer"
        @click="readyToDelete = !readyToDelete"
      >
        {{ readyToDelete ? 'Ready To Delete' : 'Not Ready To Delete' }}
      </h3>
    </div>
    <div class="mb-7 text-center">
      <AppButton
        danger
        text="Delete My Account"
        :disabled="!readyToDelete || loading"
        @click="showDeleteModal = true"
      />
    </div>
    <AppDeleteModal
      :show="showDeleteModal"
      @cancel="showDeleteModal = false"
      @confirm="confirm()"
    />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import AppDeleteModal from '@components/common/AppDeleteModal.vue';
import { ShieldExclamationIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'AccountAdministration',
  components: {
    AppDeleteModal,
    ShieldExclamationIcon,
  },
  props: {},
  data() {
    return {
      showDeleteModal: false,
      readyToDelete: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
      deleteAccount: 'auth/deleteAccount',
    }),
    confirm() {
      const self = this;
      self.loading = true;
      self
        .deleteAccount(this.user)
        .then((response) => {
          self.popToast({
            message: 'Account deleted successfully. We will miss you!',
            timer: 50000,
            icon: 'success',
          });
          self.loading = false;
          self.showDeleteModal = false;
        })
        .catch((err) => {
          self.popToast({
            message: 'Error deleteding account',
            timer: 10000,
            icon: 'error',
          });
          self.loading = false;
          self.showDeleteModal = false;
        });
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
