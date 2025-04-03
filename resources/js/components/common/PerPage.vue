<template>
  <div v-if="items && items.length >= 1" class="inline-block rounded border pl-4">
    <label>Per Page</label>
    <select
      id="perPage"
      v-model="per"
      required
      name="perPage"
      class="utline-0 border-0 bg-transparent text-center text-gray-600 focus:outline-0 active:outline-0 dark:text-gray-100"
      @change="$emit('changed', per)"
    >
      <option value="1" class="focus:outline-none">1</option>
      <option value="5" class="focus:outline-none">5</option>
      <option value="10" class="focus:outline-none">10</option>
      <option value="25" class="focus:outline-none">25</option>
      <option value="50" class="focus:outline-none">50</option>
      <option value="100" class="focus:outline-none">100</option>
      <option value="1000" class="focus:outline-none">1000</option>
      <option value="1000" class="focus:outline-none">10000</option>
      <option value="1000000000000" class="focus:outline-none">All</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'PerPage',
  props: {
    items: { type: Array, required: true },
    perPage: { type: Number, default: 10 },
  },
  data() {
    return {
      per: 10,
      ready: false,
    };
  },
  mounted() {
    this.per = this.perPage;
  },
};
</script>

<style scoped></style>
<style lang="scss" scoped></style>
