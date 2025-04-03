<template>
  <div>
    <!-- Roles Status  -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserForm',
  components: {},
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {},
  watch: {
    currentUser(val) {
      this.$emit('updatedUser', val);
    },
  },
  created() {},
  mounted() {
    this.currentUser = this.user;
  },
  beforeUnmount() {},
  updated() {},
  methods: {
    handleNameChange(event) {
      this.$emit('nameChanged', event.target.value);
    },
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
