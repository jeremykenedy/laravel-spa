<template>
  <nav class="mb-6 text-sm font-semibold float-left ml-2 mt-2" aria-label="Breadcrumb">
    <ol class="inline-flex list-none p-0">
      <slot />
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AdminBreadcrumbContainer',
};
</script>
