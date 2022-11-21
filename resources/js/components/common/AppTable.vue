<template>
  <div>
    <h1>AppTable</h1>
    <code>
      {{ data }}
    </code>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppTable',
  components: {},
  props: {
    data: { type: Array, default: null },
  },
  setup() {
    return {};
  },
  data() {
    return {
      //
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
